import type { AIMode } from './prompt-builder';

const MODE_KEYWORDS: Record<AIMode, string[]> = {
  quiz: [
    'quiz', 'test me', 'question me', 'ask me questions', 'practice questions',
    'mcq', 'multiple choice', 'mock test', 'test my knowledge', 'examine me',
    'give me questions', 'drill me',
  ],
  flashcard: [
    'flashcard', 'flash card', 'cards', 'review cards', 'make flashcards',
    'create cards', 'study cards', 'memory cards',
  ],
  timetable: [
    'timetable', 'schedule', 'study plan', 'study schedule', 'weekly plan',
    'create timetable', 'generate timetable', 'plan my study', 'reading timetable',
    'time table',
  ],
  tutor: [
    'explain', 'help me understand', 'teach me', 'what is', 'how does',
    'why does', 'can you explain', 'i don\'t understand', 'break down',
    'simplify', 'make me understand', 'i no understand', 'abeg explain',
    'wetin be', 'define',
  ],
  general: [],
};

/**
 * Detects the AI mode from a user message using keyword matching.
 * Returns 'tutor' as default if no specific mode is detected.
 */
export function detectMode(message: string): AIMode {
  const lowerMessage = message.toLowerCase().trim();

  // Check each mode's keywords
  for (const [mode, keywords] of Object.entries(MODE_KEYWORDS) as [AIMode, string[]][]) {
    if (mode === 'general') continue;
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        return mode;
      }
    }
  }

  // Default to tutor for academic questions, general for others
  const academicIndicators = [
    '?', 'how', 'what', 'why', 'when', 'where', 'which',
    'solve', 'calculate', 'find', 'prove', 'derive', 'show that',
  ];

  for (const indicator of academicIndicators) {
    if (lowerMessage.includes(indicator)) {
      return 'tutor';
    }
  }

  return 'general';
}

/**
 * Allows explicit mode setting via UI buttons.
 * Takes priority over keyword detection.
 */
export function resolveMode(explicitMode: AIMode | null, message: string): AIMode {
  if (explicitMode) return explicitMode;
  return detectMode(message);
}
