'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Send, Brain, FileQuestion, BookOpen, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { AIMode } from '@/lib/ai/prompt-builder';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const MODES: { id: AIMode; label: string; icon: typeof Brain }[] = [
  { id: 'tutor', label: 'Tutor', icon: Brain },
  { id: 'quiz', label: 'Quiz', icon: FileQuestion },
  { id: 'flashcard', label: 'Flashcards', icon: BookOpen },
  { id: 'timetable', label: 'Timetable', icon: Calendar },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<AIMode>('tutor');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          mode,
          history: messages.slice(-10),
        }),
      });

      if (!response.ok) throw new Error('Chat request failed');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          assistantMessage += chunk;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'assistant', content: assistantMessage };
            return updated;
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again or check your connection.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Mode selector */}
      <div className="flex items-center gap-2 mb-4">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              mode === m.id
                ? 'bg-green-50 text-green-600 border border-green-200'
                : 'text-text-secondary hover:bg-bg-hover border border-transparent'
            )}
          >
            <m.icon className="h-4 w-4" />
            {m.label}
          </button>
        ))}
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 && (
          <div className="text-center py-20">
            <Brain className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h2 className="font-display font-bold text-xl text-text-primary mb-2">Your AI Study Partner</h2>
            <p className="text-text-secondary text-sm max-w-md mx-auto">
              Ask me anything about your courses. I will guide you to discover answers yourself -- the best way to truly learn and remember.
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div
              className={cn(
                'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                msg.role === 'user'
                  ? 'bg-green-500 text-white rounded-br-md'
                  : 'bg-white border border-border text-text-primary rounded-bl-md'
              )}
            >
              {msg.content || (isLoading && i === messages.length - 1 ? (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              ) : msg.content)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-border pt-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              mode === 'quiz'
                ? 'Ask me to generate a quiz on any topic...'
                : mode === 'flashcard'
                ? 'Ask me to create flashcards...'
                : mode === 'timetable'
                ? 'Ask me to generate your study timetable...'
                : 'Ask your study question...'
            }
            className="flex-1 rounded-xl border border-border bg-white px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={isLoading}
          />
          <Button type="submit" disabled={!input.trim() || isLoading} className="h-12 w-12 rounded-xl p-0">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
