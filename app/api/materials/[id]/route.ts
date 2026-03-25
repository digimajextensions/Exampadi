import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { insforge } from '@/lib/insforge';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify ownership
    const materials = await insforge.db.query<{ id: string; file_url: string }>(
      `SELECT m.id, m.file_url FROM materials m
       JOIN students s ON m.student_id = s.id
       WHERE m.id = $1 AND s.clerk_id = $2`,
      [params.id, userId]
    );

    if (materials.length === 0) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    // Delete chunks
    await insforge.db.execute('DELETE FROM material_chunks WHERE material_id = $1', [params.id]);

    // Delete material record
    await insforge.db.execute('DELETE FROM materials WHERE id = $1', [params.id]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete material error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
