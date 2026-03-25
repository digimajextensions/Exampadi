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
    const { topic, count = 10 } = body;

    const studentContext = await getStudentContext(userId);
    if (!studentContext) {
      return NextResponse.json({ error: 'Complete onboarding first' }, { status: 400 });
    }

    const ragChunks = topic ? await getRAGChunks(userId, topic) : [];

    const systemPrompt = `Generate ${count} flashcards for a ${studentContext.department} student.
${topic ? `Topic: ${topic}` : `Focus on: ${studentContext.weakTopics.join(', ')}`}
${ragChunks.length > 0 ? `\nUse this material:\n${ragChunks.join('\n\n')}` : ''}

Return ONLY valid JSON array: { "front": "question/term", "back": "answer/definition" }`;

    const { stream } = await callAI({
      systemPrompt,
      messages: [{ role: 'user', content: `Generate ${count} flashcards` }],
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
      const flashcards = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
      return NextResponse.json({ flashcards });
    } catch {
      return NextResponse.json({ flashcards: [], raw: fullResponse });
    }
  } catch (error) {
    console.error('Flashcard generation error:', error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}
