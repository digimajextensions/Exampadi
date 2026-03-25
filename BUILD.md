# ExamPadi — Full Technical Build Specification
> Version 1.0 | Domain: exampadi.ng | Stack: Next.js 14 + InsForge + Clerk + Paystack + Hollatags + Resend

---

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Tech Stack](#2-tech-stack)
3. [Repository Structure](#3-repository-structure)
4. [Environment Variables](#4-environment-variables)
5. [Database Schema (InsForge/Postgres)](#5-database-schema)
6. [Authentication (Clerk)](#6-authentication)
7. [AI Architecture](#7-ai-architecture)
8. [API Routes](#8-api-routes)
9. [Pages & Components](#9-pages--components)
10. [Payments (Paystack)](#10-payments-paystack)
11. [SMS Reminders (Hollatags)](#11-sms-reminders-hollatags)
12. [Email (Resend)](#12-email-resend)
13. [Referral System](#13-referral-system)
14. [Gamification Logic](#14-gamification-logic)
15. [Build Order (Step by Step)](#15-build-order)
16. [Deployment](#16-deployment)

---

## 1. Project Overview

**ExamPadi** is an AI-powered exam preparation SaaS for Nigerian university, polytechnic, and college of education students. Students upload past questions and course materials, receive a personalised study timetable, and are drilled by a Socratic AI tutor that never reveals answers directly.

### Core Value Proposition
- Personalised AI study timetable based on exam date + department
- Socratic AI tutor (hints only, No-Reveal Mandate)
- Auto-detects weak topics and adjusts study plan
- Gamified: XP, streaks, leaderboard
- SMS + email reminders (works on 2G via Hollatags)
- Referral system: earn airtime for inviting coursemates

### Target Users
- University students (100–500 level)
- Polytechnic students (ND 1/2, HND 1/2)
- College of Education students (NCE 1/2/3)
- Primary schools: UNIBEN, UNILAG, YABATECH, ABU, OAU, UI, UNN, FUTA, LASU, MAPOLY

### Monetisation
- Free plan: 5 AI questions/day, no uploads, no reminders
- Scholar: ₦2,500/month — unlimited AI, uploads, SMS+email reminders, leaderboard
- Scholar Pro: ₦4,500/month — everything + Teach the AI mode, priority AI, weekly reports
- 3-day free trial on all paid plans (no card required at sign-up)

---

## 2. Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js 14 (App Router) | UI, SSR, API routes |
| Styling | Tailwind CSS | Utility-first styling |
| Auth | Clerk | Authentication, user management |
| Backend/DB | InsForge | Postgres DB + AI Model Gateway + S3 Storage + Realtime |
| AI Model | InsForge Model Gateway (OpenAI / Kimi K2.5) | AI tutoring, quiz gen, timetable |
| PDF Storage | InsForge S3-compatible Storage | Past question uploads |
| Payments | Paystack | Nigerian NGN subscription billing |
| SMS | Hollatags API | Daily study reminders via SMS |
| Email | Resend | Transactional + reminder emails |
| Airtime Payout | VTPass API | Referral airtime rewards |
| Hosting | Vercel | Frontend + API routes |
| Domain | exampadi.ng | Nigerian domain |

### Key Packages
```bash
npm install @clerk/nextjs
npm install @insforge/client        # InsForge SDK
npm install resend
npm install axios                   # HTTP for Hollatags, Paystack, VTPass
npm install date-fns                # Date handling for timetable
npm install zod                     # Schema validation
npm install react-markdown          # Render AI markdown responses
npm install lucide-react            # Icons
npm install recharts                # Skillometer charts
```

---

## 3. Repository Structure

```
exampadi/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                    # / Landing page
│   │   ├── pricing/page.tsx            # /pricing
│   │   └── about/page.tsx             # /about
│   ├── (auth)/
│   │   ├── sign-up/[[...sign-up]]/page.tsx
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── onboarding/page.tsx        # Post-signup onboarding flow
│   ├── dashboard/
│   │   ├── layout.tsx                 # Sidebar + top bar layout
│   │   ├── page.tsx                   # /dashboard home
│   │   ├── chat/page.tsx              # /dashboard/chat
│   │   ├── upload/page.tsx            # /dashboard/upload
│   │   ├── timetable/page.tsx         # /dashboard/timetable
│   │   ├── leaderboard/page.tsx       # /dashboard/leaderboard
│   │   ├── referral/page.tsx          # /dashboard/referral
│   │   └── settings/
│   │       ├── page.tsx               # /dashboard/settings
│   │       └── plan/page.tsx          # /dashboard/settings/plan
│   └── api/
│       ├── chat/route.ts              # Main AI chat endpoint
│       ├── timetable/generate/route.ts
│       ├── quiz/generate/route.ts
│       ├── flashcards/generate/route.ts
│       ├── upload/route.ts            # PDF upload + chunking
│       ├── webhooks/
│       │   ├── paystack/route.ts      # Payment webhook
│       │   └── clerk/route.ts         # User creation webhook
│       ├── reminders/
│       │   ├── sms/route.ts
│       │   └── email/route.ts
│       └── referral/
│           ├── validate/route.ts
│           └── payout/route.ts
├── components/
│   ├── ui/                            # Reusable primitives
│   ├── dashboard/                     # Dashboard-specific components
│   ├── chat/                          # Chat UI components
│   ├── onboarding/                    # Onboarding step components
│   └── marketing/                     # Landing page sections
├── lib/
│   ├── insforge.ts                    # InsForge client config
│   ├── clerk.ts                       # Clerk helpers
│   ├── paystack.ts                    # Paystack helpers
│   ├── hollatags.ts                   # SMS helper
│   ├── resend.ts                      # Email helper
│   ├── vtpass.ts                      # Airtime payout helper
│   ├── ai/
│   │   ├── prompt-builder.ts          # Builds the master system prompt
│   │   ├── mode-detector.ts           # Detects TUTOR/QUIZ/TIMETABLE/FLASHCARD mode
│   │   ├── no-reveal-guard.ts         # Validates AI response before sending
│   │   └── context-injector.ts        # Fetches + injects student context
│   └── utils.ts
├── middleware.ts                      # Clerk auth middleware
├── .env.local
└── next.config.js
```

---

## 4. Environment Variables

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# InsForge
INSFORGE_API_URL=
INSFORGE_API_KEY=
INSFORGE_DB_URL=

# Paystack
PAYSTACK_SECRET_KEY=
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
PAYSTACK_WEBHOOK_SECRET=

# Hollatags
HOLLATAGS_API_KEY=
HOLLATAGS_SENDER_ID=ExamPadi

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=study@exampadi.ng

# VTPass (airtime payouts)
VTPASS_API_KEY=
VTPASS_PUBLIC_KEY=
VTPASS_SECRET_KEY=

# App
NEXT_PUBLIC_APP_URL=https://exampadi.ng
CRON_SECRET=                           # For Vercel cron jobs (reminders)
```

---

## 5. Database Schema

Run these SQL migrations in InsForge's Postgres instance in order.

### Table 1: students
```sql
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  full_name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  school TEXT NOT NULL,
  school_type TEXT NOT NULL CHECK (school_type IN ('University', 'Polytechnic', 'College of Education')),
  department TEXT NOT NULL,
  level TEXT NOT NULL,
  exam_date DATE,
  study_hours_per_day INTEGER DEFAULT 2,
  goal TEXT CHECK (goal IN ('pass', 'credit', 'first', 'resit')),
  referral_code TEXT UNIQUE DEFAULT substring(gen_random_uuid()::text, 1, 8),
  referred_by TEXT REFERENCES students(referral_code),
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'scholar', 'scholar_pro', 'trial')),
  trial_ends_at TIMESTAMPTZ,
  subscription_id TEXT,
  sms_reminders BOOLEAN DEFAULT true,
  email_reminders BOOLEAN DEFAULT true,
  onboarding_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### Table 2: student_topics (Skillometer data)
```sql
CREATE TABLE student_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  topic_name TEXT NOT NULL,
  course TEXT NOT NULL,
  score INTEGER DEFAULT 50 CHECK (score BETWEEN 0 AND 100),
  total_attempts INTEGER DEFAULT 0,
  correct_attempts INTEGER DEFAULT 0,
  last_reviewed TIMESTAMPTZ,
  next_review TIMESTAMPTZ DEFAULT now(),
  is_weak BOOLEAN GENERATED ALWAYS AS (score < 50) STORED,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(student_id, topic_name, course)
);
```

### Table 3: ai_sessions (Full chat history)
```sql
CREATE TABLE ai_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  mode TEXT NOT NULL CHECK (mode IN ('tutor', 'quiz', 'timetable', 'flashcard', 'general')),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  topics_covered TEXT[],
  xp_awarded INTEGER DEFAULT 0,
  tokens_used INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Table 4: flashcards
```sql
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  topic TEXT NOT NULL,
  course TEXT NOT NULL,
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  interval_days INTEGER DEFAULT 1,
  ease_factor FLOAT DEFAULT 2.5,
  times_correct INTEGER DEFAULT 0,
  times_wrong INTEGER DEFAULT 0,
  next_review DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Table 5: study_materials (Uploaded files)
```sql
CREATE TABLE study_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL,
  course TEXT,
  material_type TEXT CHECK (material_type IN ('past_question', 'lecture_note', 'textbook', 'other')),
  processing_status TEXT DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'complete', 'failed')),
  chunk_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Table 6: material_chunks (RAG vectors)
```sql
-- Enable pgvector extension first
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE material_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id UUID REFERENCES study_materials(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  chunk_text TEXT NOT NULL,
  embedding vector(1536),
  topic_tag TEXT,
  page_number INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX ON material_chunks USING ivfflat (embedding vector_cosine_ops)
  WITH (lists = 100);
```

### Table 7: timetable_slots
```sql
CREATE TABLE timetable_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  topic TEXT NOT NULL,
  course TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  session_type TEXT CHECK (session_type IN ('learn', 'review', 'quiz', 'weak_focus')),
  completed BOOLEAN DEFAULT false,
  xp_reward INTEGER DEFAULT 20,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Table 8: xp_ledger
```sql
CREATE TABLE xp_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Computed XP view
CREATE VIEW student_xp AS
SELECT student_id, SUM(amount) as total_xp
FROM xp_ledger GROUP BY student_id;
```

### Table 9: streaks
```sql
CREATE TABLE streaks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE UNIQUE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_active_date DATE,
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### Table 10: referrals
```sql
CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID REFERENCES students(id) ON DELETE CASCADE,
  referred_id UUID REFERENCES students(id) ON DELETE CASCADE UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'converted', 'paid', 'fraud')),
  plan_purchased TEXT,
  airtime_amount INTEGER,
  payout_phone TEXT,
  payout_status TEXT DEFAULT 'pending' CHECK (payout_status IN ('pending', 'processing', 'sent', 'failed')),
  converted_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Table 11: subscriptions
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE UNIQUE,
  paystack_customer_code TEXT,
  paystack_subscription_code TEXT,
  plan TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired', 'paused')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  amount INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### Row-Level Security (RLS)
```sql
-- Enable RLS on all student data tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_ledger ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Students can only see their own data
-- (Set up via InsForge JWT policy matching clerk_id)
```

---

## 6. Authentication

### Clerk Setup

```typescript
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/pricing",
    "/about",
    "/sign-in(.*)",
    "/sign-up(.*)",
    "/api/webhooks/paystack",
    "/api/webhooks/clerk",
  ],
  afterAuth(auth, req) {
    // Redirect unauthenticated users from dashboard
    if (!auth.userId && req.nextUrl.pathname.startsWith("/dashboard")) {
      return Response.redirect(new URL("/sign-in", req.url));
    }
    // Redirect authenticated users who haven't completed onboarding
    if (auth.userId && !auth.sessionClaims?.onboarding_complete &&
        req.nextUrl.pathname.startsWith("/dashboard")) {
      return Response.redirect(new URL("/onboarding", req.url));
    }
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

### Clerk Webhook — Create Student on Sign-Up
```typescript
// app/api/webhooks/clerk/route.ts
// When a new user signs up via Clerk, create their student record in InsForge
// Event: user.created
// Action: INSERT into students table with clerk_id, email, generate referral_code
```

---

## 7. AI Architecture

### The Master System Prompt Builder

```typescript
// lib/ai/prompt-builder.ts

export function buildSystemPrompt(context: StudentContext): string {
  return `
[IDENTITY]
You are ExamPadi, a strict but warm AI study tutor for Nigerian university students.
You speak naturally and use encouraging language. You may occasionally use light
Nigerian expressions (e.g. "You dey on track!", "E easy na, think am well") to 
feel relatable — but keep it professional and never overdo it.

[CORE RULE — NON-NEGOTIABLE]
You NEVER reveal the final answer to any question under any circumstances.
Before every response, ask yourself: "Am I about to give away the answer?"
If yes, STOP and reframe as a guiding question or hint instead.
This is your single most important instruction.

[STUDENT CONTEXT]
Name: ${context.name}
School: ${context.school} (${context.schoolType})
Department: ${context.department}
Level: ${context.level}
Exam date: ${context.examDate} (${context.daysLeft} days away)
Goal: ${context.goal}
Weak topics: ${context.weakTopics.join(", ") || "None identified yet"}
Today's scheduled topic: ${context.todayTopic || "General revision"}
Current XP: ${context.totalXp} | Streak: ${context.streak} days

[UPLOADED MATERIALS — USE THESE FIRST]
${context.ragChunks.length > 0
  ? context.ragChunks.map((c, i) => `[Source ${i+1}]: ${c}`).join("\n\n")
  : "No materials uploaded yet. Use general curriculum knowledge for this department."}

[RECENT CONVERSATION]
${context.recentMessages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n")}

[CURRENT MODE: ${context.mode.toUpperCase()}]
${getModeInstructions(context.mode)}

[RESPONSE RULES]
- Keep responses under 150 words unless explaining a multi-step concept
- Always end tutor responses with a question back to the student
- When student gets something right, briefly celebrate and award XP notice: "(+[N] XP)"
- Use Nigerian university course naming conventions where relevant
- Never be condescending. Always be encouraging.
- If student seems frustrated, acknowledge it warmly before continuing
`.trim();
}

function getModeInstructions(mode: string): string {
  const instructions = {
    tutor: `
Guide the student through problems using the Socratic method.
- Identify exactly where their thinking went wrong
- Give ONE hint per response, then wait for them to try again
- Never solve the problem for them
- Ask: "What do you think happens next?" / "Why do you think that is?"
- Format: Brief acknowledgment → Point out error location → One hint → Question back`,

    quiz: `
Generate exam-style questions from the student's uploaded materials and department syllabus.
- Mix MCQ, short answer, and calculation questions
- Clearly label question type
- After student answers, tell them if correct/incorrect and which topic this tests
- Do NOT explain the correct answer yet — ask if they want a hint first
- Format response as JSON: { question, type, topic, options (if MCQ) }`,

    timetable: `
Generate or update the student's study timetable.
- Apply 80/20 rule: focus 80% of time on high-exam-frequency topics
- Allocate double time to identified weak topics
- Respect the student's available hours per day
- Use spaced repetition: revisit topics after 1 day, 3 days, 7 days
- Output as a structured 7-day plan with specific topics per day`,

    flashcard: `
Generate flashcard pairs from uploaded materials or requested topics.
- Front: A question or term
- Back: The answer or definition (concise, under 50 words)
- Prioritise weak topics
- Output as JSON array: [{ front, back, topic, difficulty }]`,

    general: `
Answer the student's question helpfully but always tie it back to exam preparation.
Keep responses concise and actionable.`
  };
  return instructions[mode] || instructions.general;
}
```

### Mode Detector
```typescript
// lib/ai/mode-detector.ts

export function detectMode(message: string): AIMode {
  const lower = message.toLowerCase();

  if (/test me|quiz|give me question|practice question|exam question/.test(lower)) {
    return 'quiz';
  }
  if (/timetable|schedule|study plan|plan for|update my plan|reschedule/.test(lower)) {
    return 'timetable';
  }
  if (/flashcard|flash card|drill me|card|memorise|memorize/.test(lower)) {
    return 'flashcard';
  }
  // Default to tutor for questions, explanations, answers
  return 'tutor';
}
```

### No-Reveal Guard
```typescript
// lib/ai/no-reveal-guard.ts

const REVEAL_PATTERNS = [
  /the answer is/i,
  /the correct answer is/i,
  /the solution is/i,
  /therefore, [a-z]+ = \d/i,
  /so the final answer/i,
  /the result is/i,
];

export function checkNoReveal(response: string): { passed: boolean; violation?: string } {
  for (const pattern of REVEAL_PATTERNS) {
    if (pattern.test(response)) {
      return { passed: false, violation: pattern.toString() };
    }
  }
  return { passed: true };
}

// If guard fails, append instruction to regenerate
export const NO_REVEAL_RETRY_INSTRUCTION = `
Your previous response violated the No-Reveal Mandate by giving away the answer.
Rewrite your response to guide the student toward the answer using hints and 
Socratic questions ONLY. Do not state the answer or solution directly.
`;
```

### Main Chat API Route
```typescript
// app/api/chat/route.ts

import { auth } from "@clerk/nextjs";
import { buildSystemPrompt } from "@/lib/ai/prompt-builder";
import { detectMode } from "@/lib/ai/mode-detector";
import { checkNoReveal } from "@/lib/ai/no-reveal-guard";
import { getStudentContext } from "@/lib/ai/context-injector";
import { insforge } from "@/lib/insforge";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return new Response("Unauthorized", { status: 401 });

  const { message, courseFilter } = await req.json();

  // 1. Detect mode
  const mode = detectMode(message);

  // 2. Fetch full student context from InsForge
  const context = await getStudentContext(userId, message, mode, courseFilter);

  // 3. Build the master system prompt
  const systemPrompt = buildSystemPrompt(context);

  // 4. Call InsForge Model Gateway (streaming)
  const stream = await insforge.ai.chat({
    model: "gpt-4o-mini",             // or "kimi-k2.5" via InsForge gateway
    system: systemPrompt,
    messages: [{ role: "user", content: message }],
    stream: true,
    max_tokens: 600,
  });

  // 5. Collect full response for validation
  let fullResponse = "";
  const encoder = new TextEncoder();

  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content || "";
        fullResponse += text;
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
      }

      // 6. No-Reveal guard check
      const guard = checkNoReveal(fullResponse);
      if (!guard.passed) {
        // Log the violation and send a safe fallback
        console.warn("No-Reveal violation detected:", guard.violation);
        controller.enqueue(encoder.encode(
          `data: ${JSON.stringify({ text: "\n\n[Hint mode]: Let me guide you instead — what do you think the first step should be?" })}\n\n`
        ));
      }

      // 7. Post-response: log session, update XP, update weak topics
      await Promise.all([
        logAiSession(userId, mode, message, fullResponse, context),
        updateTopicScores(userId, context, mode, message),
        awardSessionXP(userId, mode),
        updateStreak(userId),
      ]);

      controller.close();
    }
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    }
  });
}
```

---

## 8. API Routes

### Complete API Route Map

| Method | Route | Purpose | Auth Required |
|---|---|---|---|
| POST | /api/chat | Main AI tutor chat | Yes |
| POST | /api/timetable/generate | Generate/regenerate timetable | Yes |
| POST | /api/quiz/generate | Generate quiz questions | Yes |
| POST | /api/flashcards/generate | Generate flashcards | Yes |
| POST | /api/upload | Upload PDF to InsForge S3 + chunk | Yes |
| GET | /api/materials | List student's uploaded materials | Yes |
| DELETE | /api/materials/[id] | Delete a material | Yes |
| POST | /api/webhooks/paystack | Handle payment events | No (HMAC verified) |
| POST | /api/webhooks/clerk | Handle user creation | No (Clerk verified) |
| POST | /api/reminders/sms | Send SMS via Hollatags | Cron only |
| POST | /api/reminders/email | Send email via Resend | Cron only |
| GET | /api/referral/stats | Get referral stats for user | Yes |
| POST | /api/referral/payout | Trigger airtime payout | Yes (plan check) |
| GET | /api/leaderboard | Get school/national leaderboard | Yes |
| GET | /api/student/profile | Get student profile | Yes |
| PUT | /api/student/profile | Update student profile | Yes |
| GET | /api/student/xp | Get XP + streak | Yes |

---

## 9. Pages & Components

### Middleware Auth Guard
```
Public: /, /pricing, /about, /sign-in, /sign-up, /api/webhooks/*
Protected: /dashboard/*, /onboarding, /api/* (except webhooks)
Onboarding gate: if onboarding_complete = false → redirect to /onboarding
Plan gate: if plan = 'free' → show paywall modal on locked features
```

### Plan Feature Gates
```typescript
// lib/plan-gates.ts
export const PLAN_FEATURES = {
  free: {
    aiQuestionsPerDay: 5,
    uploadMaterials: false,
    smsReminders: false,
    emailReminders: false,
    leaderboard: false,
    skillometer: false,
  },
  trial: {
    aiQuestionsPerDay: Infinity,
    uploadMaterials: true,
    smsReminders: true,
    emailReminders: true,
    leaderboard: true,
    skillometer: true,
  },
  scholar: {
    aiQuestionsPerDay: Infinity,
    uploadMaterials: true,
    smsReminders: true,
    emailReminders: true,
    leaderboard: true,
    skillometer: true,
  },
  scholar_pro: {
    aiQuestionsPerDay: Infinity,
    uploadMaterials: true,
    smsReminders: true,
    emailReminders: true,
    leaderboard: true,        // national leaderboard too
    skillometer: true,
    teachTheAI: true,
    weeklyReport: true,
    priorityAI: true,
    timeTravelSessions: true,
  }
};
```

---

## 10. Payments (Paystack)

### Plans Setup (Create via Paystack Dashboard)
```
Plan 1: ExamPadi Scholar
  - Amount: 250000 kobo (₦2,500)
  - Interval: monthly
  - Plan code: PLN_xxxxxxxxxxxx (save as PAYSTACK_SCHOLAR_PLAN_CODE)

Plan 2: ExamPadi Scholar Pro
  - Amount: 450000 kobo (₦4,500)
  - Interval: monthly
  - Plan code: PLN_xxxxxxxxxxxx (save as PAYSTACK_SCHOLAR_PRO_PLAN_CODE)
```

### Subscription Flow
```
1. User clicks "Start Free Trial" or "Upgrade"
2. Call Paystack Initialize Transaction with:
   - email: student.email
   - amount: plan amount
   - plan: plan_code
   - metadata: { student_id, plan_type, referral_code }
   - callback_url: https://exampadi.ng/dashboard/settings/plan?status=success
3. Redirect user to Paystack checkout URL
4. Paystack sends webhook to /api/webhooks/paystack
5. On 'subscription.create' event:
   - Update student.plan
   - Update student.trial_ends_at (3 days from now)
   - Create subscription record
   - Send welcome email via Resend
6. On 'invoice.payment_failed':
   - Send email + SMS to student
   - Grace period: 3 days before downgrade to free
7. On 'subscription.disable':
   - Downgrade student.plan to 'free'
```

### Webhook Handler
```typescript
// app/api/webhooks/paystack/route.ts
// CRITICAL: Verify HMAC-SHA512 signature before processing
// Header: x-paystack-signature
// Compute: crypto.createHmac('sha512', PAYSTACK_SECRET_KEY).update(rawBody).digest('hex')
// If signature mismatch: return 401
```

---

## 11. SMS Reminders (Hollatags)

### Daily Reminder Cron Job
```typescript
// app/api/reminders/sms/route.ts
// Triggered by Vercel Cron at 7:00 AM WAT daily

// Logic:
// 1. Query students WHERE sms_reminders = true AND plan IN ('scholar', 'scholar_pro', 'trial')
// 2. For each student, get today's timetable slot
// 3. Build personalised message
// 4. Send via Hollatags API

const message = `ExamPadi: Good morning ${name}! Today's topic: ${topic}. 
You have ${daysLeft} days to your exam. Keep your ${streak}-day streak alive! 
Study now: exampadi.ng/dashboard/chat`;

// Hollatags API call
await axios.post('https://api.hollatags.com/v1/sms/send', {
  api_key: process.env.HOLLATAGS_API_KEY,
  sender: 'ExamPadi',
  to: student.phone,      // Format: 2348012345678
  message,
}, { headers: { 'Content-Type': 'application/json' } });
```

### Vercel Cron Config
```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/reminders/sms",
      "schedule": "0 6 * * *"
    },
    {
      "path": "/api/reminders/email",
      "schedule": "0 7 * * *"
    }
  ]
}
```

---

## 12. Email (Resend)

### Email Types
```typescript
// lib/resend.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const emails = {
  // 1. Welcome email after sign-up
  welcome: (student) => resend.emails.send({
    from: 'ExamPadi <study@exampadi.ng>',
    to: student.email,
    subject: `Welcome to ExamPadi, ${student.name}! Your 3-day trial starts now 🚀`,
    // Use React Email template
  }),

  // 2. Daily study reminder
  dailyReminder: (student, topic, daysLeft) => resend.emails.send({
    from: 'ExamPadi <study@exampadi.ng>',
    to: student.email,
    subject: `📚 Today's study: ${topic} — ${daysLeft} days to exam`,
  }),

  // 3. Trial expiry warning (24 hours before)
  trialExpiring: (student) => resend.emails.send({
    from: 'ExamPadi <study@exampadi.ng>',
    to: student.email,
    subject: `⚠️ Your ExamPadi trial ends tomorrow`,
  }),

  // 4. Weekly progress report (Scholar Pro only)
  weeklyReport: (student, stats) => resend.emails.send({
    from: 'ExamPadi <study@exampadi.ng>',
    to: student.email,
    subject: `Your weekly ExamPadi report 📊`,
  }),

  // 5. Referral airtime sent confirmation
  airtimeSent: (student, amount) => resend.emails.send({
    from: 'ExamPadi <study@exampadi.ng>',
    to: student.email,
    subject: `💚 ₦${amount} airtime sent! Your referral reward is here`,
  }),

  // 6. Streak at risk (no activity in 20 hours)
  streakAtRisk: (student) => resend.emails.send({
    from: 'ExamPadi <study@exampadi.ng>',
    to: student.email,
    subject: `🔥 Don't break your ${student.streak}-day streak!`,
  }),
};
```

---

## 13. Referral System

### Logic
```typescript
// Referral payout calculation
// 15% of first 3 months subscription revenue → paid as airtime

function calculateAirtimePayout(plan: string, monthNumber: number): number {
  if (monthNumber > 3) return 0; // Only first 3 months
  const planAmount = plan === 'scholar' ? 2500 : 4500;
  return Math.floor(planAmount * 0.15); // ₦375 or ₦675
}

// Payout tiers (bonus on top of base 15%)
const BONUS_PAYOUTS = {
  3: 200,   // 3 referrals = extra ₦200 bonus
  5: 500,   // 5 referrals = extra ₦500 bonus
  10: 1500, // 10 referrals = extra ₦1,500 bonus
  20: 3000, // 20 referrals = extra ₦3,000 bonus + upgrade to 20% cut
};
```

### VTPass Airtime Payout
```typescript
// lib/vtpass.ts
export async function sendAirtime(phone: string, amount: number, network: string) {
  // network: 'mtn', 'airtel', 'glo', '9mobile'
  const response = await axios.post('https://vtpass.com/api/pay', {
    api_key: process.env.VTPASS_API_KEY,
    request_id: `EXAMPADI_${Date.now()}`,
    serviceID: `${network}-data`,   // or airtime
    amount,
    phone,
  }, {
    auth: {
      username: process.env.VTPASS_PUBLIC_KEY,
      password: process.env.VTPASS_SECRET_KEY,
    }
  });
  return response.data;
}
```

### Fraud Prevention
```typescript
// Anti-abuse checks before payout:
// 1. Referred user must have completed 7+ days as paying subscriber
// 2. Referrer and referred cannot share same IP at sign-up
// 3. Max 50 referrals per account per month (flag for review above this)
// 4. Phone number must be verified (Clerk phone verification)
// 5. Payout delayed 7 days after conversion
```

---

## 14. Gamification Logic

### XP Awards
```typescript
export const XP_REWARDS = {
  complete_onboarding: 100,
  daily_study_session: 30,
  quiz_correct_answer: 15,
  quiz_wrong_answer: 2,       // still earn a little for trying
  complete_flashcard_deck: 25,
  maintain_streak_7_days: 50,
  maintain_streak_30_days: 200,
  upload_materials: 40,
  complete_timetable_slot: 20,
  teach_ai_session: 35,
};
```

### Streak Logic
```typescript
// Run after every study session
async function updateStreak(studentId: string) {
  const streak = await getStreak(studentId);
  const today = new Date().toDateString();
  const lastActive = streak.last_active_date?.toDateString();

  if (lastActive === today) return; // Already active today

  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (lastActive === yesterday) {
    // Extend streak
    await incrementStreak(studentId);
  } else {
    // Streak broken — reset to 1
    await resetStreak(studentId);
  }
}
```

### Leaderboard Query
```typescript
// School leaderboard
SELECT s.full_name, s.school, s.department,
       COALESCE(SUM(x.amount), 0) as total_xp,
       st.current_streak
FROM students s
LEFT JOIN xp_ledger x ON x.student_id = s.id
LEFT JOIN streaks st ON st.student_id = s.id
WHERE s.school = :school
GROUP BY s.id, st.current_streak
ORDER BY total_xp DESC
LIMIT 50;
```

---

## 15. Build Order

Follow this exact sequence to ship in 4 weeks.

### Week 1 — Foundation
```
Day 1: Repo setup, install all dependencies, configure .env
Day 2: InsForge setup — create database, run all SQL migrations
Day 3: Clerk setup — configure auth, webhook handler, create student on sign-up
Day 4: Onboarding flow — wire up the existing component to save to InsForge DB
Day 5: Basic dashboard shell — layout with sidebar, top bar, protected routes
Day 6: Paystack test mode — create plans, subscription initialisation flow
Day 7: Test full auth → onboarding → dashboard flow end-to-end
```

### Week 2 — AI Core
```
Day 8:  InsForge Model Gateway test — basic API call working
Day 9:  lib/ai/* — prompt builder, mode detector, no-reveal guard, context injector
Day 10: /api/chat route — full implementation with streaming
Day 11: Chat UI page — streaming display, message history, XP animations
Day 12: PDF upload → InsForge S3 → basic chunking (no embeddings yet)
Day 13: RAG — generate embeddings, store in material_chunks, vector search in chat
Day 14: Test full upload → chat with materials flow
```

### Week 3 — Engagement
```
Day 15: Timetable generation — /api/timetable/generate + UI page
Day 16: Quiz mode — /api/quiz/generate + quiz UI component
Day 17: Flashcard mode — /api/flashcards/generate + flashcard UI
Day 18: XP system — xp_ledger, awards on all actions, XP display in UI
Day 19: Streaks — logic + streak display in dashboard
Day 20: Hollatags SMS — daily reminder cron + Vercel cron config
Day 21: Resend email — welcome, daily reminder, trial expiry emails
```

### Week 4 — Money & Launch
```
Day 22: Paystack live mode — subscription webhooks, plan gating
Day 23: Referral system — referral links, tracking, VTPass payout
Day 24: Leaderboard page — school-based rankings
Day 25: Skillometer — topic scores chart (Recharts radar/bar chart)
Day 26: Settings page — profile, plan management, notification toggles
Day 27: Bug fixes, performance, mobile responsiveness
Day 28: Deploy to Vercel + exampadi.ng DNS → LAUNCH 🚀
```

---

## 16. Deployment

### Vercel Setup
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Set environment variables via Vercel dashboard or CLI
vercel env add CLERK_SECRET_KEY production
# ... (repeat for all env vars)
```

### Domain (exampadi.ng)
```
1. Register exampadi.ng via a Nigerian registrar (e.g. web4africa.ng, whogohost.com)
2. Add to Vercel: Settings → Domains → Add → exampadi.ng
3. Update DNS: Add CNAME record pointing to cname.vercel-dns.com
4. Enable HTTPS (automatic via Vercel)
5. Update Clerk allowed origins to include https://exampadi.ng
6. Update Paystack callback URLs to https://exampadi.ng/...
```

### Post-Launch Monitoring
```
- Vercel Analytics: page performance
- InsForge dashboard: DB query performance, AI token usage
- Paystack dashboard: subscription health, failed payments
- Set up Sentry for error tracking: npm install @sentry/nextjs
```

---

*ExamPadi BUILD.md — Last updated: March 2025*
*For questions, refer to the full product session transcript.*
