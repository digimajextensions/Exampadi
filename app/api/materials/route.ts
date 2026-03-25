import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { insforge } from '@/lib/insforge';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const materials = await insforge.db.query(
      `SELECT m.id, m.file_name, m.file_size, m.status, m.created_at
       FROM materials m
       JOIN students s ON m.student_id = s.id
       WHERE s.clerk_id = $1
       ORDER BY m.created_at DESC`,
      [userId]
    );

    return NextResponse.json({ materials });
  } catch (error) {
    console.error('Materials fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch materials' }, { status: 500 });
  }
}
