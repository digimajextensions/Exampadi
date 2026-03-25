import axios from 'axios';

const HOLLATAGS_API_KEY = process.env.HOLLATAGS_API_KEY || '';
const HOLLATAGS_SENDER_ID = process.env.HOLLATAGS_SENDER_ID || 'ExamPadi';

interface SendSMSParams {
  to: string;
  message: string;
}

export async function sendSMS({ to, message }: SendSMSParams): Promise<{ success: boolean; messageId?: string }> {
  try {
    const response = await axios.post(
      'https://api.hollatags.com/api/sms/send',
      {
        sender: HOLLATAGS_SENDER_ID,
        recipient: to,
        message,
        type: 'plain',
      },
      {
        headers: {
          Authorization: `Bearer ${HOLLATAGS_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: response.data.status === 'success',
      messageId: response.data.data?.message_id,
    };
  } catch (error) {
    console.error('Hollatags SMS error:', error);
    return { success: false };
  }
}

export function buildStudyReminder(studentName: string, topic: string, examDays: number): string {
  const firstName = studentName.split(' ')[0];
  if (examDays <= 3) {
    return `${firstName}, ${examDays} days to exam! Focus on ${topic} today. You got this! - ExamPadi`;
  }
  if (examDays <= 7) {
    return `${firstName}, exam in ${examDays} days. Today's focus: ${topic}. Let's lock in! - ExamPadi`;
  }
  return `Hey ${firstName}! Time to study ${topic}. Open ExamPadi and keep your streak alive - ExamPadi`;
}
