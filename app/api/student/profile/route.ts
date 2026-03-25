import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { insforge } from '@/lib/insforge';
import { generateReferralCode } from '@/lib/utils';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { school, schoolType, department, level, goal, studyHours, examDate, phone } = body;
    const referralCode = generateReferralCode();

    await insforge.db.execute(
      `UPDATE students SET
        school = $1, school_type = $2, department = $3, level = $4,
        study_goal = $5, daily_hours = $6, exam_date = $7, phone = $8,
        referral_code = $9, onboarding_complete = true
       WHERE clerk_id = $10`,
      [school, schoolType, department, level, goal, studyHours, examDate, phone, referralCode, userId]
    );

    return NextResponse.json({ success: true, referralCode });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { fullName, phone } = body;

    await insforge.db.execute(
      'UPDATE students SET full_name = $1, phone = $2 WHERE clerk_id = $3',
      [fullName, phone, userId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
