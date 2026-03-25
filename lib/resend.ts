import { Resend } from 'resend';

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');
  }
  return _resend;
}
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'study@exampadi.ng';

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const data = await getResend().emails.send({
      from: `ExamPadi <${FROM_EMAIL}>`,
      to,
      subject,
      html,
    });
    return { success: true, id: data.data?.id };
  } catch (error) {
    console.error('Resend email error:', error);
    return { success: false, error };
  }
}

export function buildWelcomeEmail(name: string): { subject: string; html: string } {
  const firstName = name.split(' ')[0];
  return {
    subject: `Welcome to ExamPadi, ${firstName}!`,
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="font-family: 'Syne', sans-serif; color: #1DB954; font-size: 28px;">ExamPadi</h1>
        </div>
        <h2 style="color: #111827;">Hey ${firstName}!</h2>
        <p style="color: #4B5563; line-height: 1.6;">
          Welcome to ExamPadi -- your AI study partner for Nigerian university exams. You have a 3-day free trial to explore everything.
        </p>
        <p style="color: #4B5563; line-height: 1.6;">Here is what you can do:</p>
        <ul style="color: #4B5563; line-height: 1.8;">
          <li>Upload your past questions and course materials</li>
          <li>Get a personalised study timetable</li>
          <li>Chat with your AI tutor (Socratic method -- no direct answers!)</li>
          <li>Take quizzes and track your progress</li>
        </ul>
        <div style="text-align: center; margin: 32px 0;">
          <a href="https://exampadi.ng/dashboard" style="background: #1DB954; color: white; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600;">
            Start Studying
          </a>
        </div>
        <p style="color: #9CA3AF; font-size: 13px; text-align: center;">
          Questions? Chat us on WhatsApp: +234 815 885 6280
        </p>
      </div>
    `,
  };
}

export function buildDailyReminderEmail(name: string, topic: string, examDays: number): { subject: string; html: string } {
  const firstName = name.split(' ')[0];
  return {
    subject: `${firstName}, today's focus: ${topic} (${examDays} days to exam)`,
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="font-family: 'Syne', sans-serif; color: #1DB954; font-size: 24px;">ExamPadi</h1>
        </div>
        <h2 style="color: #111827;">Hey ${firstName}, ${examDays} days to go!</h2>
        <p style="color: #4B5563; line-height: 1.6;">
          Today's focus topic: <strong>${topic}</strong>
        </p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="https://exampadi.ng/dashboard/chat" style="background: #1DB954; color: white; padding: 12px 28px; border-radius: 12px; text-decoration: none; font-weight: 600;">
            Start Studying
          </a>
        </div>
        <p style="color: #9CA3AF; font-size: 13px; text-align: center;">Keep your streak alive!</p>
      </div>
    `,
  };
}

export function buildTrialExpiryEmail(name: string): { subject: string; html: string } {
  const firstName = name.split(' ')[0];
  return {
    subject: `${firstName}, your free trial ends tomorrow`,
    html: `
      <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h1 style="font-family: 'Syne', sans-serif; color: #1DB954; font-size: 24px;">ExamPadi</h1>
        </div>
        <h2 style="color: #111827;">${firstName}, your trial ends tomorrow</h2>
        <p style="color: #4B5563; line-height: 1.6;">
          Your 3-day free trial expires in 24 hours. Upgrade to keep your AI tutor, study timetable, and all your progress.
        </p>
        <p style="color: #4B5563; line-height: 1.6;">Plans start at just N3,500/month.</p>
        <div style="text-align: center; margin: 24px 0;">
          <a href="https://exampadi.ng/dashboard/settings/plan" style="background: #1DB954; color: white; padding: 12px 28px; border-radius: 12px; text-decoration: none; font-weight: 600;">
            Choose a Plan
          </a>
        </div>
      </div>
    `,
  };
}
