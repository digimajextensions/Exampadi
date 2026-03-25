import { NextRequest, NextResponse } from 'next/server';
import { insforge } from '@/lib/insforge';
import { sendSMS, buildStudyReminder } from '@/lib/hollatags';

export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get students with SMS reminders enabled (Scholar+ plans)
    const students = await insforge.db.query<{
      full_name: string; phone: string; exam_date: string;
    }>(
      `SELECT full_name, phone, exam_date FROM students
       WHERE plan IN ('scholar', 'scholar_pro') AND phone IS NOT NULL
       AND sms_reminders = true AND subscription_status = 'active'`
    );

    let sent = 0;
    for (const student of students) {
      if (!student.phone) continue;

      const examDate = student.exam_date ? new Date(student.exam_date) : null;
      const daysToExam = examDate
        ? Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
        : 30;

      const message = buildStudyReminder(student.full_name, 'your focus topic', daysToExam);
      await sendSMS({ to: student.phone, message });
      sent++;
    }

    return NextResponse.json({ sent });
  } catch (error) {
    console.error('SMS reminder error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
