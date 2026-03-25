import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { insforge } from '@/lib/insforge';
import { sendAirtime, detectNetwork } from '@/lib/vtunaija';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const students = await insforge.db.query<{ id: string; phone: string }>(
      'SELECT id, phone FROM students WHERE clerk_id = $1',
      [userId]
    );

    if (students.length === 0 || !students[0].phone) {
      return NextResponse.json({ error: 'Phone number required for payout' }, { status: 400 });
    }

    const { id: studentId, phone } = students[0];

    // Get pending payouts
    const pendingReferrals = await insforge.db.query<{ id: string; payout_amount: number }>(
      `SELECT id, payout_amount FROM referrals
       WHERE referrer_id = $1 AND status = 'converted' AND payout_status = 'pending'
       AND converted_at < NOW() - INTERVAL '7 days'`,
      [studentId]
    );

    if (pendingReferrals.length === 0) {
      return NextResponse.json({ error: 'No eligible payouts' }, { status: 400 });
    }

    const totalAmount = pendingReferrals.reduce((sum, r) => sum + r.payout_amount, 0);
    const network = detectNetwork(phone);

    const result = await sendAirtime(phone, totalAmount, network);

    if (result.success) {
      const ids = pendingReferrals.map((r) => r.id);
      await insforge.db.execute(
        `UPDATE referrals SET payout_status = 'paid', paid_at = NOW()
         WHERE id = ANY($1::uuid[])`,
        [ids]
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Payout error:', error);
    return NextResponse.json({ error: 'Payout failed' }, { status: 500 });
  }
}
