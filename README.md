# ExamPadi - AI-Powered Exam Preparation for Nigerian Students

ExamPadi is a full-stack web application that helps Nigerian university, polytechnic, and college of education students prepare for exams using AI-powered tutoring, smart study timetables, and gamified learning.

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Authentication:** Clerk
- **Backend/Database:** InsForge (Postgres + AI Gateway + S3 Storage + pgvector)
- **AI Fallback:** Groq API (llama-3.1-70b-versatile)
- **Payments:** Paystack (NGN subscriptions)
- **SMS:** Hollatags API
- **Email:** Resend
- **Airtime Payouts:** VTU Naija API
- **Blog CMS:** Sanity
- **Hosting:** Vercel

## Features

- Socratic AI Tutor (never reveals answers directly)
- PDF upload and RAG-powered study sessions
- AI-generated study timetables with 80/20 rule
- Quiz and flashcard generation
- Gamification (XP, streaks, leaderboards)
- 3-tier pricing (Starter N3,500, Scholar N5,500, Scholar Pro N8,500)
- SMS and email study reminders
- Referral system with airtime payouts
- Admin-managed lifetime access via license keys
- SEO-optimized marketing pages with Sanity blog
- WhatsApp support widget

## Getting Started

1. Clone the repository
2. Copy `.env.local.example` to `.env.local` and fill in your API keys
3. Install dependencies: `npm install`
4. Link InsForge: `npx @insforge/cli link --project-id d04375c0-5c70-47de-9185-c6fa98ec53ce`
5. Run development server: `npm run dev`

## Project Structure

```
app/
  (marketing)/    - Public marketing pages (landing, about, pricing, blog, legal)
  (auth)/         - Authentication pages (sign-in, sign-up, onboarding)
  dashboard/      - Authenticated app pages (home, chat, upload, timetable, etc.)
  api/            - API routes (chat, upload, webhooks, reminders, referrals, etc.)
components/
  ui/             - Reusable UI primitives (Button, Card, Input, Badge)
  marketing/      - Marketing page sections
  dashboard/      - Dashboard-specific components
lib/
  ai/             - AI provider, prompt builder, mode detector, no-reveal guard
  insforge.ts     - InsForge client
  paystack.ts     - Paystack helpers
  hollatags.ts    - SMS helpers
  resend.ts       - Email helpers
  vtunaija.ts     - Airtime payout helpers
  sanity.ts       - Sanity CMS client
  plan-gates.ts   - Feature gating by subscription plan
  seo.ts          - SEO metadata and schema helpers
config/
  license-keys.json - Admin-managed lifetime access keys
sanity/
  schemas/        - Sanity CMS schemas (post, author, category, blockContent)
```

## Environment Variables

See `.env.local.example` for the full list of required environment variables.

## Deployment

This project is configured for deployment on Vercel. See `vercel.json` for cron job configuration (SMS at 6am WAT, email at 7am WAT).

## License

Proprietary - ExamPadi
