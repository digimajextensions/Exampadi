import { insforge, type InsForgeAIMessage } from '../insforge';

interface AICallParams {
  systemPrompt: string;
  messages: InsForgeAIMessage[];
  priorityAI?: boolean;
  maxTokens?: number;
}

interface AICallResult {
  provider: 'insforge' | 'groq';
  stream: ReadableStream;
}

export async function callAI(params: AICallParams): Promise<AICallResult> {
  try {
    // Primary: InsForge Model Gateway
    const stream = await insforge.ai.chat({
      model: params.priorityAI ? 'gpt-4o' : 'gpt-4o-mini',
      system: params.systemPrompt,
      messages: params.messages,
      stream: true,
      max_tokens: params.maxTokens || 600,
    });
    return { provider: 'insforge', stream };
  } catch (error) {
    console.warn('InsForge AI failed, falling back to Groq:', error);

    // Fallback: Groq API
    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      throw new Error('Both InsForge and Groq AI are unavailable');
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [
          { role: 'system', content: params.systemPrompt },
          ...params.messages,
        ],
        stream: true,
        max_tokens: params.maxTokens || 600,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    return { provider: 'groq', stream: response.body as ReadableStream };
  }
}

export type { AICallParams, AICallResult };
