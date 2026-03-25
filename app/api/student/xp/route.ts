import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { insforge } from '@/lib/insforge';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { amount, reason } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Invalid XP amount' }, { status: 400 });
    }

    // Update total XP
    await insforge.db.execute(
      'UPDATE students SET total_xp = total_xp + $1 WHERE clerk_id = $2',
      [amount, userId]
    );

    // Log XP event
    const students = await insforge.db.query<{ id: string }>(
      'SELECT id FROM students WHERE clerk_id = $1',
      [userId]
    );

    if (students.length > 0) {
      await insforge.db.execute(
        'INSERT INTO xp_ledger (student_id, amount, reason) VALUES ($1, $2, $3)',
        [students[0].id, amount, reason]
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('XP award error:', error);
    return NextResponse.json({ error: 'XP award failed' }, { status: 500 });
  }
}
