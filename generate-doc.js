const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  LevelFormat, Header, Footer, PageBreak
} = require('docx');
const fs = require('fs');

const GREEN = "1DB954";
const GOLD = "C9A84C";
const DARK = "1A1A1A";
const MUTED = "666666";

const border = { style: BorderStyle.SINGLE, size: 1, color: "E0E0E0" };
const borders = { top: border, bottom: border, left: border, right: border };

function h1(text, color = DARK) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 160 },
    children: [new TextRun({ text, color, size: 36, bold: true, font: "Arial" })]
  });
}

function h2(text, color = DARK) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 320, after: 120 },
    children: [new TextRun({ text, color, size: 28, bold: true, font: "Arial" })]
  });
}

function h3(text, color = GREEN) {
  return new Paragraph({
    spacing: { before: 240, after: 80 },
    children: [new TextRun({ text, color, size: 24, bold: true, font: "Arial" })]
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, size: 22, font: "Arial", color: opts.muted ? MUTED : DARK, bold: opts.bold || false, italics: opts.italic || false })]
  });
}

function bullet(text) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 40, after: 40 },
    children: [new TextRun({ text, size: 22, font: "Arial", color: DARK })]
  });
}

function divider() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "E8E8E8", space: 1 } },
    children: []
  });
}

function label(text, color = GREEN) {
  return new Paragraph({
    spacing: { before: 160, after: 60 },
    children: [new TextRun({ text: text.toUpperCase(), size: 18, bold: true, font: "Arial", color, characterSpacing: 40 })]
  });
}

function makeTable(headers, rows, colWidths) {
  const totalWidth = colWidths.reduce((a, b) => a + b, 0);
  return new Table({
    width: { size: totalWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((h, i) => new TableCell({
          borders,
          width: { size: colWidths[i], type: WidthType.DXA },
          shading: { fill: "F0FAF4", type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, size: 20, font: "Arial", color: "158A3E" })] })]
        }))
      }),
      ...rows.map(row => new TableRow({
        children: row.map((cell, i) => new TableCell({
          borders,
          width: { size: colWidths[i], type: WidthType.DXA },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [new Paragraph({ children: [new TextRun({ text: cell, size: 20, font: "Arial", color: DARK })] })]
        }))
      }))
    ]
  });
}

const doc = new Document({
  numbering: {
    config: [{
      reference: "bullets",
      levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }]
    }]
  },
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 36, bold: true, font: "Arial", color: DARK },
        paragraph: { spacing: { before: 400, after: 160 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 28, bold: true, font: "Arial", color: DARK },
        paragraph: { spacing: { before: 320, after: 120 }, outlineLevel: 1 } },
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: GREEN, space: 1 } },
          spacing: { after: 0 },
          children: [new TextRun({ text: "ExamPadi — Product Document", size: 18, font: "Arial", color: MUTED })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          border: { top: { style: BorderStyle.SINGLE, size: 4, color: "E8E8E8", space: 1 } },
          spacing: { before: 0 },
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "exampadi.ng  |  Confidential", size: 18, font: "Arial", color: MUTED })]
        })]
      })
    },
    children: [
      // COVER
      new Paragraph({ spacing: { before: 800, after: 160 }, alignment: AlignmentType.LEFT,
        children: [new TextRun({ text: "ExamPadi", size: 72, bold: true, font: "Arial", color: GREEN })] }),
      new Paragraph({ spacing: { before: 0, after: 80 }, children: [
        new TextRun({ text: "Product Strategy, Architecture & Build Specification", size: 32, font: "Arial", color: DARK, bold: true })
      ]}),
      new Paragraph({ spacing: { before: 0, after: 400 }, children: [
        new TextRun({ text: "exampadi.ng  |  Version 1.0  |  March 2025", size: 22, font: "Arial", color: MUTED })
      ]}),

      divider(),

      // EXECUTIVE SUMMARY
      h1("1. Executive Summary"),
      body("ExamPadi is an AI-powered exam preparation SaaS purpose-built for Nigerian university, polytechnic, and college of education students. It combines a personalised Socratic AI tutor, gamified study mechanics, automated SMS and email reminders, and a referral-based growth engine to help students pass their exams faster and more effectively."),
      new Paragraph({ spacing: { before: 120, after: 80 }, children: [] }),
      body("The platform is built on a lean, AI-optimised tech stack: Next.js (frontend), InsForge (backend, database, AI gateway), Clerk (authentication), Paystack (billing), Hollatags (SMS), and Resend (email). The domain is exampadi.ng."),
      new Paragraph({ spacing: { before: 120, after: 120 }, children: [] }),

      makeTable(
        ["Attribute", "Detail"],
        [
          ["Product Name", "ExamPadi"],
          ["Domain", "exampadi.ng"],
          ["Target Market", "Nigerian university, polytechnic & COE students"],
          ["Core Technology", "Next.js 14 + InsForge + Clerk + Paystack"],
          ["Monetisation", "Monthly subscription (₦2,500 / ₦4,500/mo)"],
          ["Trial", "3-day full-access free trial, no card required"],
          ["Launch Timeline", "4 weeks (MVP)"],
          ["Break-even", "~80 paying users"],
          ["Primary ICP", "200-400 level students, 2-4 weeks before exams"],
        ],
        [3000, 6000]
      ),

      divider(),

      // THE PROBLEM
      h1("2. The Problem"),
      body("Nigerian university students face a unique combination of challenges that generic edtech products do not address:"),
      new Paragraph({ spacing: { before: 80 }, children: [] }),
      bullet("Cramming culture: Most students read all materials the night before exams, which neuroscience shows is deeply ineffective for long-term retention."),
      bullet("Past questions without context: Students have access to past exam papers but no system to explain why answers are correct or wrong."),
      bullet("No accountability: Study groups dissolve. No external system tracks whether students actually studied."),
      bullet("Unfocused preparation: Syllabi are vast, lecturers are vague, and students waste hours on low-frequency topics that rarely appear in exams."),
      bullet("Data and connectivity constraints: Expensive mobile data and unreliable internet access limits use of heavy web applications."),
      new Paragraph({ spacing: { before: 160, after: 80 }, children: [] }),
      body("A 2024 Harvard randomised controlled trial (Kestin et al.) found that AI-powered tutoring produces 2x the learning gains compared to traditional active learning classrooms, while taking 18% less time. This evidence base directly validates ExamPadi's core proposition.", { italic: true }),

      divider(),

      // THE SOLUTION
      h1("3. The Solution"),
      body("ExamPadi addresses each pain point with a specific product feature:"),
      new Paragraph({ spacing: { before: 120, after: 80 }, children: [] }),
      makeTable(
        ["Pain Point", "ExamPadi Feature"],
        [
          ["Cramming culture", "AI generates spaced-repetition timetable based on exam date"],
          ["Past questions without context", "Socratic AI tutor guides to the answer — never reveals it directly"],
          ["No accountability", "Daily SMS + email reminders, streaks, XP gamification"],
          ["Unfocused preparation", "80/20 rule: AI identifies high-frequency exam topics"],
          ["Data constraints", "SMS reminders work on 2G, lightweight app architecture"],
          ["Weak topic detection", "Automatic Skillometer tracks mastery per topic in real time"],
        ],
        [4000, 5000]
      ),

      divider(),

      // PRODUCT FEATURES
      h1("4. Product Features"),

      h2("4.1 Onboarding Flow (6 Steps)"),
      bullet("Step 1: Welcome screen — value proposition, feature highlights"),
      bullet("Step 2: School selection — UNIBEN first, 13 pre-loaded institutions"),
      bullet("Step 3: Department selection — filtered by school type (University/Poly/COE)"),
      bullet("Step 4: Level + Goal + Daily study hours"),
      bullet("Step 5: Exam date + SMS/email reminder preferences"),
      bullet("Step 6: AI-generated personalised timetable reveal with staggered animation"),
      new Paragraph({ spacing: { before: 80 }, children: [] }),

      h2("4.2 AI Tutor (Socratic Mode)"),
      bullet("Operates in 5 modes: Tutor, Quiz, Flashcard, Timetable, General"),
      bullet("No-Reveal Mandate: AI is forbidden from giving direct answers — guides through hints and questions"),
      bullet("Grounded in uploaded materials first; falls back to curriculum knowledge"),
      bullet("No-Reveal Guard: automated post-response validator checks for answer-revealing patterns before streaming to student"),
      bullet("Response streaming for immediate feedback feel"),
      bullet("XP awarded per session, per correct quiz answer, per streak maintained"),
      new Paragraph({ spacing: { before: 80 }, children: [] }),

      h2("4.3 Gamification"),
      bullet("XP Points: awarded for every study action (sessions, quizzes, uploads, streaks)"),
      bullet("Streaks: daily study streak with 🔥 visual; breaks reset to 0"),
      bullet("Leaderboard: school-based, department-based, and national rankings"),
      bullet("Badges: milestone achievements (7-day streak, 100 questions, First Class Hunter etc.)"),
      bullet("Skillometer: visual radar/bar chart of topic mastery per course"),
      new Paragraph({ spacing: { before: 80 }, children: [] }),

      h2("4.4 Study Materials Upload"),
      bullet("Supports PDF and image uploads (for scanned past questions)"),
      bullet("Files stored in InsForge S3-compatible storage"),
      bullet("AI pipeline: PDF text extraction → chunking → embedding generation → pgvector storage"),
      bullet("Chunks retrieved via semantic vector search per chat session"),
      new Paragraph({ spacing: { before: 80 }, children: [] }),

      h2("4.5 Reminders"),
      bullet("SMS via Hollatags: daily study nudge at 7am WAT, works on 2G"),
      bullet("Email via Resend: welcome, daily reminder, trial expiry, streak at risk, weekly report"),
      bullet("Vercel Cron Jobs: automated daily triggers at 6am and 7am WAT"),
      bullet("Students can toggle each reminder type independently in Settings"),

      divider(),

      // TECH STACK
      h1("5. Technology Stack"),
      new Paragraph({ spacing: { before: 80, after: 80 }, children: [] }),
      makeTable(
        ["Layer", "Technology", "Purpose"],
        [
          ["Frontend", "Next.js 14 (App Router)", "UI, SSR, streaming, API routes"],
          ["Auth", "Clerk", "Authentication, user management, Nigerian phone numbers"],
          ["Backend / Database", "InsForge", "Postgres DB + AI Gateway + S3 + Realtime"],
          ["AI Model", "InsForge Model Gateway", "OpenAI / Kimi K2.5 routing"],
          ["File Storage", "InsForge S3 Storage", "PDF and image uploads"],
          ["Payments", "Paystack", "NGN subscription billing"],
          ["SMS", "Hollatags", "Daily study reminders (works on 2G)"],
          ["Email", "Resend", "Transactional email"],
          ["Airtime Payouts", "VTPass", "Referral reward payouts"],
          ["Hosting", "Vercel", "Frontend, API routes, cron jobs"],
          ["Domain", "exampadi.ng", "Nigerian TLD"],
        ],
        [2500, 3000, 3500]
      ),
      new Paragraph({ spacing: { before: 120, after: 80 }, children: [] }),
      body("InsForge replaces Supabase and a separate AI model provider, reducing the stack from 2 backend platforms to 1. This significantly reduces integration complexity for a solo non-technical founder. InsForge is benchmarked to complete backend tasks 1.6x faster with 30% fewer tokens and 1.7x higher accuracy vs. raw Postgres.", { italic: true }),

      divider(),

      // AI ARCHITECTURE
      h1("6. AI Architecture"),

      h2("6.1 Design Philosophy"),
      body("ExamPadi V1 uses a single-model, multi-mode architecture: one AI model (via InsForge Model Gateway) governed by a dynamically-built master system prompt. This delivers 80% of multi-agent capability at 10% of the complexity — the right trade-off for a 4-week MVP."),
      new Paragraph({ spacing: { before: 80 }, children: [] }),

      h2("6.2 The Five Modes"),
      makeTable(
        ["Mode", "Trigger", "Behaviour"],
        [
          ["TUTOR", "Question, explanation request, answer submission", "Socratic guidance, hints only, never reveals answer, ends every response with a question"],
          ["QUIZ", '"Test me", "give me questions", post-session auto-trigger', "Generates 5-10 MCQ/short answer/calc questions from uploaded materials"],
          ["TIMETABLE", '"Update my plan", "reschedule", onboarding complete', "Generates/regenerates 7-day rolling timetable using 80/20 rule + weak topics weighting"],
          ["FLASHCARD", '"Flashcards", "drill me", after material upload', "Generates front/back pairs prioritising weak topics, with spaced repetition intervals"],
          ["GENERAL", "Any other input", "Helpful response tied back to exam preparation"],
        ],
        [1800, 2500, 4700]
      ),
      new Paragraph({ spacing: { before: 120 }, children: [] }),

      h2("6.3 Context Injection"),
      body("Every API request to the AI rebuilds the system prompt with live context fetched from InsForge:"),
      bullet("Student profile: name, school, department, level, exam date, days remaining"),
      bullet("Weak topics: auto-updated after every quiz and tutoring session"),
      bullet("Today's timetable slot: the topic the student should be on"),
      bullet("RAG context: top 5 relevant chunks from uploaded materials (pgvector search)"),
      bullet("Session history: last 5 messages for conversational coherence"),
      bullet("XP and streak: for in-response motivational callouts"),
      new Paragraph({ spacing: { before: 80 }, children: [] }),

      h2("6.4 No-Reveal Guard"),
      body("After every AI response is generated, a pattern-matching validator checks for phrases that indicate a direct answer has been given (e.g. 'the answer is', 'the solution is', 'therefore X = Y'). If detected, a fallback hint-only response is substituted before streaming to the student. This enforces the No-Reveal Mandate at the infrastructure level, not just in the prompt."),

      divider(),

      // MONETISATION
      h1("7. Monetisation & Pricing"),

      h2("7.1 Plans"),
      makeTable(
        ["Plan", "Price", "Key Features"],
        [
          ["Free (post-trial)", "₦0/mo", "5 AI questions/day, basic timetable, no uploads, no reminders"],
          ["Scholar", "₦2,500/mo", "Unlimited AI, uploads, SMS + email reminders, leaderboard, skillometer"],
          ["Scholar Pro", "₦4,500/mo", "Everything in Scholar + Teach the AI, priority AI, weekly reports, national leaderboard"],
        ],
        [2000, 2000, 5000]
      ),
      new Paragraph({ spacing: { before: 120 }, children: [] }),
      body("All paid plans include a 3-day full-access free trial. No credit card required at sign-up. Billing via Paystack (NGN, supports Nigerian bank cards, USSD, and bank transfer)."),
      new Paragraph({ spacing: { before: 80 }, children: [] }),

      h2("7.2 Unit Economics"),
      makeTable(
        ["Metric", "Scholar", "Scholar Pro"],
        [
          ["Monthly price", "₦2,500", "₦4,500"],
          ["Paystack fee", "~₦137", "~₦167"],
          ["AI + SMS cost/user", "~₦1,000", "~₦1,200"],
          ["Gross profit/user", "~₦1,363", "~₦3,133"],
          ["Gross margin", "~55%", "~70%"],
        ],
        [3000, 3000, 3000]
      ),
      new Paragraph({ spacing: { before: 120 }, children: [] }),

      h2("7.3 Break-Even Analysis"),
      makeTable(
        ["Paid Users", "MRR (est.)", "Monthly Costs", "Net Profit"],
        [
          ["50", "₦143,750", "₦70,000", "₦73,750"],
          ["80 (break-even)", "₦230,000", "₦130,000", "₦100,000"],
          ["200", "₦575,000", "₦190,000", "₦342,000"],
          ["500", "₦1,437,500", "₦350,000", "₦979,500"],
          ["1,000", "₦2,875,000", "₦580,000", "₦2,079,000"],
        ],
        [2200, 2200, 2200, 2400]
      ),

      divider(),

      // REFERRAL SYSTEM
      h1("8. Referral System"),
      body("Every student gets a unique referral link (exampadi.ng/ref/[code]). When a referred student converts to a paid plan, the referrer receives 15% of the subscription value for the first 3 months — paid as mobile airtime via VTPass."),
      new Paragraph({ spacing: { before: 80 }, children: [] }),
      body("Why airtime? It is universally trusted in Nigeria, requires no bank account, works on all networks (MTN, Airtel, Glo, 9mobile), and feels immediate and premium. Students will share it as a social achievement."),
      new Paragraph({ spacing: { before: 120, after: 80 }, children: [] }),
      makeTable(
        ["Referrals", "Base Payout", "Bonus", "Tier Badge"],
        [
          ["1", "₦375/referral", "—", "🌱 Starter"],
          ["3", "₦375/referral", "+₦200 bonus", "🔥 Hustler"],
          ["5", "₦375/referral", "+₦500 bonus", "⭐ Scholar Rep"],
          ["10", "₦375/referral", "+₦1,500 bonus", "👑 ExamPadi Ambassador"],
          ["20+", "Upgraded to 20% cut", "+₦3,000 bonus", "🏆 Campus Legend"],
        ],
        [1800, 2200, 2200, 2800]
      ),
      new Paragraph({ spacing: { before: 120 }, children: [] }),
      body("Fraud prevention: payouts are delayed 7 days post-conversion, require the referred user to have an active subscription for 7+ days, and flag accounts exceeding 50 referrals/month for manual review."),

      divider(),

      // MARKETING & ICP
      h1("9. Go-to-Market Strategy"),

      h2("9.1 Ideal Customer Profile (ICP)"),
      h3("Primary ICP — The Serious Crammer"),
      body("200-400 level student, exam 2-4 weeks away, wants to avoid carryovers or achieve 2:1. Has ₦10,000-30,000/mo pocket money. On WhatsApp groups daily. Will pay ₦2,500 if the value is immediately obvious."),
      new Paragraph({ spacing: { before: 80 }, children: [] }),
      h3("Secondary ICP — The Carryover Student"),
      body("Has 1-3 carryovers. Under intense academic and family pressure. Highest willingness to pay (will pay ₦4,500 without hesitation). Loudest advocate if the product works. Primary target for Scholar Pro."),
      new Paragraph({ spacing: { before: 80 }, children: [] }),
      h3("Tertiary ICP — The First Class Hunter"),
      body("Already performing well (3.5+ GPA), wants to push to First Class. Sees ExamPadi as an investment. Low churn, high LTV. Responds to aspirational, data-backed messaging."),
      new Paragraph({ spacing: { before: 120 }, children: [] }),

      h2("9.2 Marketing Channels"),
      makeTable(
        ["Channel", "Tactic", "Cost"],
        [
          ["WhatsApp Groups", "Peer-to-peer drops in department groups 3 weeks before exam season", "Free (referral link embedded)"],
          ["Twitter/X", "Relatable exam content + replies to student tweets during exam season", "Free (time)"],
          ["Campus Ambassadors", "1 influential student per school — free Scholar Pro + 20% referral cut", "Free until conversion"],
          ["Referral flywheel", "15% airtime reward drives organic word-of-mouth", "15% of revenue, paid on conversion"],
          ["Content SEO", "Blog posts targeting 'UNIBEN past questions', 'YABATECH past questions' etc.", "Free (long-term)"],
          ["SMS blast", "Waitlist → exam season launch blast via Hollatags", "~₦5/message"],
        ],
        [2000, 3500, 3500]
      ),
      new Paragraph({ spacing: { before: 120 }, children: [] }),

      h2("9.3 Key Insight: Exam Season Marketing"),
      body("ExamPadi's marketing calendar is dictated by university exam schedules — not arbitrary campaign dates. Students need the product desperately for 3-6 weeks per semester. Marketing spikes hard 21 days before each institution's exam period, then pulls back. This creates urgency that no amount of advertising can manufacture."),
      new Paragraph({ spacing: { before: 80 }, children: [] }),
      body("Nigerian universities have two main exam seasons: January-February (1st semester) and June-July (2nd semester). These are the two annual revenue peaks."),

      divider(),

      // PAGES
      h1("10. Product Pages"),
      h2("10.1 Public Pages"),
      bullet("/ — Landing page: hero, pain section, how it works, features, skillometer preview, testimonials, pricing preview, CTA"),
      bullet("/pricing — Standalone pricing page with plan comparison table and FAQ"),
      bullet("/about — Mission, team, research foundation (Harvard 2x study cited)"),
      new Paragraph({ spacing: { before: 80 }, children: [] }),

      h2("10.2 App Pages (Authenticated)"),
      bullet("/onboarding — 6-step personalisation flow (school → dept → level → goal → exam date → timetable reveal)"),
      bullet("/dashboard — Home: today's focus, streaks, XP, skillometer, quick actions"),
      bullet("/dashboard/chat — AI tutor: Socratic chat with mode selector and live XP tracking"),
      bullet("/dashboard/upload — Upload materials: drag-and-drop zone, processing pipeline, materials library"),
      bullet("/dashboard/timetable — Weekly calendar with topic slots, progress tracking"),
      bullet("/dashboard/leaderboard — School, department, national tabs with top-3 podium"),
      bullet("/dashboard/referral — Referral link, tier ladder, earnings table, airtime withdrawal"),
      bullet("/dashboard/settings — Profile, plan management, notification toggles, danger zone"),

      divider(),

      // BUILD TIMELINE
      h1("11. 4-Week Build Plan"),
      makeTable(
        ["Week", "Focus", "Key Deliverables"],
        [
          ["Week 1", "Foundation", "Repo, InsForge DB setup, Clerk auth, onboarding wired to DB, dashboard shell, Paystack test mode"],
          ["Week 2", "AI Core", "InsForge Model Gateway, /api/chat with streaming, chat UI, PDF upload, RAG pipeline"],
          ["Week 3", "Engagement", "Timetable, quiz, flashcards, XP system, streaks, Hollatags SMS, Resend emails"],
          ["Week 4", "Money & Launch", "Paystack live billing, referral + VTPass, leaderboard, settings, bug fixes, deploy to exampadi.ng"],
        ],
        [1500, 2000, 5500]
      ),
      new Paragraph({ spacing: { before: 120 }, children: [] }),
      body("V1 intentionally excludes: LangGraph multi-agent orchestration, Knowledge Graph RAG, OCR for handwritten questions, Scholar Pro plan (launch with Scholar only), offline mode. All are scheduled for V2 once initial revenue is established.", { italic: true }),

      divider(),

      // CLOSING
      new Paragraph({ spacing: { before: 400, after: 160 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "ExamPadi — Built for Nigeria. Powered by AI.", size: 28, bold: true, font: "Arial", color: GREEN })]
      }),
      new Paragraph({ spacing: { before: 0, after: 40 }, alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: "exampadi.ng", size: 22, font: "Arial", color: MUTED })]
      }),
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/home/claude/exampadi-docs/ExamPadi-Product-Document.docx', buffer);
  console.log('✅ Document created successfully');
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
