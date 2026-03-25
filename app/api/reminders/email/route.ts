import { NextRequest, NextResponse } from 'next/server';
import { insforge } from '@/lib/insforge';
import { sendEmail, buildDailyReminderEmail } from '@/lib/resend';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const students = await insforge.db.query<{
      full_name: string; email: string; exam_date: string;
    }>(
      `SELECT full_name, email, exam_date FROM students
       WHERE plan != 'free' AND email_reminders = true
       AND subscription_status = 'active'`
    );

    let sent = 0;
    for (const student of students) {
      const examDate = student.exam_date ? new Date(student.exam_date) : null;
      const daysToExam = examDate
        ? Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : 30;

      const { subject, html } = buildDailyReminderEmail(student.full_name, 'your focus topic', daysToExam);
      await sendEmail({ to: student.email, subject, html });
      sent++;
    }

    return NextResponse.json({ sent });
  } catch (error) {
    console.error('Email reminder error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
