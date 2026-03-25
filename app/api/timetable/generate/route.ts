import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { callAI } from '@/lib/ai/ai-provider';
import { getStudentContext } from '@/lib/ai/context-injector';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const studentContext = await getStudentContext(userId);
    if (!studentContext) {
      return NextResponse.json({ error: 'Complete onboarding first' }, { status: 400 });
    }

    const systemPrompt = `You are ExamPadi's timetable generator. Create a 7-day study timetable in JSON format.

Student: ${studentContext.name}
School: ${studentContext.school}
Department: ${studentContext.department}
Exam in: ${studentContext.daysToExam || 'unknown'} days
Weak topics: ${studentContext.weakTopics.join(', ') || 'none identified'}
Strong topics: ${studentContext.strongTopics.join(', ') || 'none identified'}

Rules:
- Apply 80/20 rule: 80% time on weak topics, 20% on strong/review
- Include breaks every 90 minutes
- Include quiz/review sessions
- Time slots from 8:00 AM to 10:00 PM
- Return ONLY valid JSON array with objects: { day, time, topic, duration, type }
- type is one of: study, review, break, quiz`;

    const { stream } = await callAI({
      systemPrompt,
      messages: [{ role: 'user', content: 'Generate my study timetable for this week.' }],
    });

    // Collect streamed response
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fullResponse += decoder.decode(value, { stream: true });
    }

    // Parse JSON from response
    try {
      const jsonMatch = fullResponse.match(/\[[\s\S]*\]/);
      const slots = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
      return NextResponse.json({ slots });
    } catch {
      return NextResponse.json({ slots: [], raw: fullResponse });
    }
  } catch (error) {
    console.error('Timetable generation error:', error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
