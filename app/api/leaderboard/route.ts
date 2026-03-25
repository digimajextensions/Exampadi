import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { insforge } from '@/lib/insforge';

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const scope = req.nextUrl.searchParams.get('scope') || 'school';

    // Get current student for school/dept filtering
    const students = await insforge.db.query<{ school: string; department: string }>(
      'SELECT school, department FROM students WHERE clerk_id = $1',
      [userId]
    );

    if (students.length === 0) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const { school, department } = students[0];

    let query = 'SELECT full_name, school, total_xp, current_streak FROM students';
    const params: unknown[] = [];

    if (scope === 'school') {
      query += ' WHERE school = $1';
      params.push(school);
    } else if (scope === 'department') {
      query += ' WHERE school = $1 AND department = $2';
      params.push(school, department);
    }

    query += ' ORDER BY total_xp DESC LIMIT 50';

    const leaderboard = await insforge.db.query(query, params);

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}
