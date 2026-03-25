import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { callAI } from '@/lib/ai/ai-provider';
import { buildSystemPrompt } from '@/lib/ai/prompt-builder';
import { resolveMode } from '@/lib/ai/mode-detector';
import { validateResponse, makeSocratic } from '@/lib/ai/no-reveal-guard';
import { getStudentContext, getRAGChunks, getSessionHistory } from '@/lib/ai/context-injector';
import type { AIMode } from '@/lib/ai/prompt-builder';

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { message, mode: explicitMode, history } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Get student context
    const studentContext = await getStudentContext(userId);
    if (!studentContext) {
      return NextResponse.json({ error: 'Please complete onboarding first' }, { status: 400 });
    }

    // Resolve AI mode
    const mode: AIMode = resolveMode(explicitMode || null, message);

    // Get RAG chunks for context
    const ragChunks = await getRAGChunks(userId, message);

    // Build system prompt
    const systemPrompt = buildSystemPrompt({
      mode,
      studentContext,
      ragChunks,
    });

    // Build message history
    const messages = [
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })),
      { role: 'user' as const, content: message },
    ];

    // Call AI with fallback
    const { stream } = await callAI({
      systemPrompt,
      messages,
      priorityAI: studentContext.plan === 'scholar_pro',
    });

    // Stream the response
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
