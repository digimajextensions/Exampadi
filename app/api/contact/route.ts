import { NextRequest, NextResponse } from 'next/server';
import { insforge } from '@/lib/insforge';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { name, email, subject, message } = parsed.data;

    await insforge.db.execute(
      `INSERT INTO contact_submissions (name, email, subject, message)
       VALUES ($1, $2, $3, $4)`,
      [name, email, subject || null, message]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Submission failed' }, { status: 500 });
  }
}
