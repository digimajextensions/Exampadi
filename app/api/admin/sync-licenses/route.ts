import { NextRequest, NextResponse } from 'next/server';
import { insforge } from '@/lib/insforge';
import fs from 'fs';
import path from 'path';

interface LicenseKeyConfig {
  key: string;
  student_email?: string;
  notes?: string;
}

interface LicenseFileSchema {
  description: string;
  keys: LicenseKeyConfig[];
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_SECRET_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const filePath = path.join(process.cwd(), 'config', 'license-keys.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const licenseConfig: LicenseFileSchema = JSON.parse(fileContent);
    const configKeys: LicenseKeyConfig[] = licenseConfig.keys || [];
    let granted = 0;
    let revoked = 0;

    // Get all existing license keys from DB
    const existingKeys = await insforge.db.query<{ license_key: string; status: string }>(
      'SELECT license_key, status FROM license_keys'
    );
    const existingKeySet = new Set(existingKeys.map((k) => k.license_key));
    const configKeySet = new Set(configKeys.map((k) => k.key));

    // Grant new keys
    for (const keyConfig of configKeys) {
      if (!existingKeySet.has(keyConfig.key)) {
        await insforge.db.execute(
          `INSERT INTO license_keys (license_key, notes) VALUES ($1, $2)`,
          [keyConfig.key, keyConfig.notes || null]
        );

        // Match to student by email
        if (keyConfig.student_email) {
          await insforge.db.execute(
            `UPDATE students SET has_lifetime_access = true, lifetime_license_key = $1
             WHERE email = $2`,
            [keyConfig.key, keyConfig.student_email]
          );
          await insforge.db.execute(
            `UPDATE license_keys SET student_id = (SELECT id FROM students WHERE email = $1), status = 'active'
             WHERE license_key = $2`,
            [keyConfig.student_email, keyConfig.key]
          );
        }
        granted++;
      }
    }

    // Revoke removed keys
    for (const existing of existingKeys) {
      if (!configKeySet.has(existing.license_key) && existing.status === 'active') {
        await insforge.db.execute(
          `UPDATE license_keys SET status = 'revoked', revoked_at = NOW() WHERE license_key = $1`,
          [existing.license_key]
        );
        await insforge.db.execute(
          `UPDATE students SET has_lifetime_access = false, lifetime_license_key = NULL
           WHERE lifetime_license_key = $1`,
          [existing.license_key]
        );
        revoked++;
      }
    }

    return NextResponse.json({ granted, revoked });
  } catch (error) {
    console.error('License sync error:', error);
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 });
  }
}
