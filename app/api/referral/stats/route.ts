import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { insforge } from '@/lib/insforge';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const students = await insforge.db.query<{ id: string; referral_code: string }>(
      'SELECT id, referral_code FROM students WHERE clerk_id = $1',
      [userId]
    );

    if (students.length === 0) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const { id: studentId, referral_code } = students[0];

    const stats = await insforge.db.query<{ total: number; converted: number; total_earned: number }>(
      `SELECT
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'converted') as converted,
        COALESCE(SUM(payout_amount) FILTER (WHERE payout_status = 'paid'), 0) as total_earned
       FROM referrals
       WHERE referrer_id = $1`,
      [studentId]
    );

    return NextResponse.json({
      referralCode: referral_code,
      ...stats[0],
    });
  } catch (error) {
    console.error('Referral stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
