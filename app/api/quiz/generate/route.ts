import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { callAI } from '@/lib/ai/ai-provider';
import { getStudentContext, getRAGChunks } from '@/lib/ai/context-injector';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { topic, count = 5, difficulty = 'medium' } = body;

    const studentContext = await getStudentContext(userId);
    if (!studentContext) {
      return NextResponse.json({ error: 'Complete onboarding first' }, { status: 400 });
    }

    const ragChunks = topic ? await getRAGChunks(userId, topic) : [];

    const systemPrompt = `Generate ${count} ${difficulty} difficulty quiz questions for a ${studentContext.department} student.
${topic ? `Topic: ${topic}` : `Focus on weak topics: ${studentContext.weakTopics.join(', ')}`}
${ragChunks.length > 0 ? `\nUse this course material:\n${ragChunks.join('\n\n')}` : ''}

Return ONLY valid JSON array with objects:
{ "question": "...", "options": ["A) ...", "B) ...", "C) ...", "D) ..."], "correct": "A", "explanation": "..." }`;

    const { stream } = await callAI({
      systemPrompt,
      messages: [{ role: 'user', content: `Generate ${count} quiz questions` }],
    });

    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let fullResponse = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fullResponse += decoder.decode(value, { stream: true });
    }

    try {
      const jsonMatch = fullResponse.match(/\[[\s\S]*\]/);
      const questions = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
      return NextResponse.json({ questions });
    } catch {
      return NextResponse.json({ questions: [], raw: fullResponse });
    }
  } catch (error) {
    console.error('Quiz generation error:', error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
