/**
 * No-Reveal Guard validates AI responses before sending to the student.
 * The core mandate: ExamPadi must NEVER directly reveal answers.
 *
 * Two-pass validation:
 * 1. Regex pattern matching against 20+ known reveal patterns
 * 2. Structural analysis of the response
 */

const REVEAL_PATTERNS: RegExp[] = [
  /the\s+(?:correct\s+)?answer\s+is/i,
  /the\s+(?:right\s+)?answer\s+is/i,
  /correct\s+answer:\s*/i,
  /the\s+solution\s+is/i,
  /(?:it|this)\s+equals?\s+/i,
  /simply\s+put,?\s+(?:it's|it\s+is)/i,
  /the\s+(?:direct\s+)?answer\s+(?:to\s+(?:this|that|your))?\s*(?:is|would\s+be)/i,
  /here\s+(?:is|are)\s+the\s+(?:answer|solution)/i,
  /let\s+me\s+(?:just\s+)?(?:tell|give)\s+you\s+the\s+answer/i,
  /(?:answer|solution)\s*[:=]\s*/i,
  /to\s+(?:directly|simply)\s+answer/i,
  /the\s+(?:final\s+)?result\s+is/i,
  /(?:therefore|hence|thus|so),?\s+(?:the\s+answer\s+is|it\s+(?:is|equals))/i,
  /you\s+(?:just\s+)?need\s+to\s+(?:write|put|answer)\s+/i,
  /just\s+(?:write|put|answer|say)\s+/i,
  /the\s+formula\s+gives?\s+(?:us\s+)?(?:an?\s+answer\s+of|the\s+result)/i,
  /na\s+the\s+answer\s+be\s+that/i, // Nigerian pidgin
  /e\s+be\s+like\s+say\s+(?:the\s+)?answer/i, // Nigerian pidgin
  /the\s+answer\s+na/i, // Nigerian pidgin
  /straight\s+up,?\s+(?:the\s+answer|it)\s+(?:is|na)/i,
  /i['']ll\s+(?:just\s+)?give\s+you\s+the\s+answer/i,
];

/**
 * Pattern-matching pass: checks for common answer-revealing phrases.
 */
function checkRevealPatterns(response: string): { isReveal: boolean; matchedPattern?: string } {
  for (const pattern of REVEAL_PATTERNS) {
    if (pattern.test(response)) {
      return { isReveal: true, matchedPattern: pattern.source };
    }
  }
  return { isReveal: false };
}

/**
 * Structural analysis pass: checks if the response ends with a question
 * (good Socratic responses should generally end with a question or prompt).
 */
function checkSocraticStructure(response: string): { hasSocraticEnding: boolean } {
  const trimmed = response.trim();
  const lastSentence = trimmed.split(/[.!?\n]/).filter(Boolean).pop()?.trim() || '';
  const hasSocraticEnding = lastSentence.includes('?') ||
    /(?:think about|consider|try|what do you|can you|how would|why do you|does that)/i.test(lastSentence);
  return { hasSocraticEnding };
}

export interface GuardResult {
  safe: boolean;
  reason?: string;
  matchedPattern?: string;
  hasSocraticEnding: boolean;
}

/**
 * Main guard function. Returns whether the response is safe to send.
 */
export function validateResponse(response: string): GuardResult {
  // Pass 1: Pattern matching
  const patternCheck = checkRevealPatterns(response);
  if (patternCheck.isReveal) {
    return {
      safe: false,
      reason: 'Response contains answer-revealing pattern',
      matchedPattern: patternCheck.matchedPattern,
      hasSocraticEnding: false,
    };
  }

  // Pass 2: Structural analysis
  const structureCheck = checkSocraticStructure(response);

  return {
    safe: true,
    hasSocraticEnding: structureCheck.hasSocraticEnding,
  };
}

/**
 * If a response is flagged as unsafe, this rewrites it to be Socratic.
 */
export function makeSocratic(originalResponse: string): string {
  return `I want to help you figure this out yourself -- that's how you truly learn it! Let me give you a hint instead.\n\nThink about the key concepts involved here. What's the first step you'd take to approach this problem?`;
}
