import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { insforge } from '@/lib/insforge';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.name.endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only PDF files are supported' }, { status: 400 });
    }

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size must be under 20MB' }, { status: 400 });
    }

    // Get student record
    const students = await insforge.db.query<{ id: string }>(
      'SELECT id FROM students WHERE clerk_id = $1',
      [userId]
    );

    if (students.length === 0) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const studentId = students[0].id;
    const filePath = `materials/${studentId}/${Date.now()}_${file.name}`;

    // Upload to InsForge S3
    const buffer = Buffer.from(await file.arrayBuffer());
    const { url } = await insforge.storage.upload({
      bucket: 'exampadi-materials',
      path: filePath,
      file: buffer,
      contentType: 'application/pdf',
    });

    // Create material record
    const materials = await insforge.db.query<{ id: string }>(
      `INSERT INTO materials (student_id, file_name, file_url, file_size, status)
       VALUES ($1, $2, $3, $4, 'processing')
       RETURNING id`,
      [studentId, file.name, url, file.size]
    );

    const materialId = materials[0].id;

    // TODO: Trigger async PDF processing pipeline
    // 1. Extract text from PDF
    // 2. Chunk text (500 tokens, 50 overlap)
    // 3. Generate embeddings
    // 4. Store in material_chunks with pgvector

    return NextResponse.json({ id: materialId, url, status: 'processing' });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
