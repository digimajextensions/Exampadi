import { NextRequest, NextResponse } from 'next/server';
import { insforge } from '@/lib/insforge';
import { sendEmail, buildWelcomeEmail } from '@/lib/resend';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.type === 'user.created') {
      const { id, email_addresses, first_name, last_name } = body.data;
      const email = email_addresses?.[0]?.email_address;
      const fullName = [first_name, last_name].filter(Boolean).join(' ');

      if (email) {
        // Create student record
        await insforge.db.execute(
          `INSERT INTO students (clerk_id, email, full_name, plan)
           VALUES ($1, $2, $3, 'free')
           ON CONFLICT (clerk_id) DO NOTHING`,
          [id, email, fullName]
        );

        // Send welcome email
        const { subject, html } = buildWelcomeEmail(fullName || 'Student');
        await sendEmail({ to: email, subject, html });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Clerk webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
