# ExamPadi — UI/UX Design Specification
> For AI UI/UX Designer | Domain: exampadi.ng | Audience: Nigerian university students aged 18–24

---

## Table of Contents
1. [Brand Identity](#1-brand-identity)
2. [Design Principles](#2-design-principles)
3. [Typography](#3-typography)
4. [Colour System](#4-colour-system)
5. [Spacing & Layout Grid](#5-spacing--layout-grid)
6. [Component Library](#6-component-library)
7. [Page-by-Page Specs](#7-page-by-page-specs)
8. [Motion & Animation](#8-motion--animation)
9. [Mobile Responsiveness](#9-mobile-responsiveness)
10. [Accessibility](#10-accessibility)

---

## 1. Brand Identity

### Name
**ExamPadi** — "Padi" is Nigerian slang for "friend/companion." ExamPadi is your exam companion.

### Tagline
*"Your AI study partner for Nigerian university exams"*

### Personality
Confident, warm, encouraging, Nigerian-authentic. Like a brilliant final-year student who actually wants to help you pass. Not corporate. Not cold. Not generic Western edtech. Feels built for Lagos, Benin, Ibadan, Kano.

### Logo Concept
- Icon: An open book with a subtle circuit/AI spark pattern on the pages
- Wordmark: "Exam" in regular weight + "Padi" in bold — slight personality in the "Padi"
- Icon size: 34×34px rounded square (10px border radius) in Primary Green
- Emoji shorthand used in UI: 📚

### Brand Voice
- Encouraging: "You're almost there! Think about..."
- Relatable: "Guy, 12 days to exam — let's lock in."
- Direct: Never vague. Always tells student exactly what to do next.
- Nigerian-authentic: Occasional light pidgin in microcopy, never forced

---

## 2. Design Principles

### 1. Dark-First
The app is dark theme only. Students study at night. Dark reduces eye strain. It also feels premium and focused — not a textbook, a tool.

### 2. Gamified Without Being Childish
XP, streaks, and leaderboards should feel like a serious productivity app (think Linear, Notion) with game mechanics — NOT like a children's learning app. No cartoons, no bouncing characters.

### 3. Information Density Done Right
Nigerian students have limited screen time and data. Every screen should communicate maximum value with minimum scrolling. Dense but never cluttered.

### 4. Nigerian-First Visual Language
- Use warm skin tones in any illustrations or avatars
- Reference Nigerian institutions by name (UNIBEN, YABATECH etc.)
- Naira (₦) symbol, not dollar
- Nigerian phone number formats in inputs

### 5. Speed Feels Like Care
Skeleton loaders on every async action. Streaming AI text (not waiting for full response). Instant XP animations. The product should feel fast even when it isn't.

---

## 3. Typography

### Font Pairing
| Role | Font | Weight | Notes |
|---|---|---|---|
| Display / Headlines | **Syne** | 700, 800 | Bold, geometric, modern — memorable |
| Body / UI | **DM Sans** | 400, 500, 600 | Clean, highly legible at small sizes |

### Import
```css
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
```

### Type Scale
| Token | Size | Weight | Font | Use |
|---|---|---|---|---|
| `display-xl` | 72–96px | 800 | Syne | Hero headlines only |
| `display-lg` | 48–64px | 800 | Syne | Section headlines |
| `display-md` | 32–40px | 800 | Syne | Page titles, card headlines |
| `display-sm` | 22–28px | 700 | Syne | Card titles, modal titles |
| `body-lg` | 18px | 400 | DM Sans | Hero subheadings |
| `body-md` | 15–16px | 400 | DM Sans | Main body text |
| `body-sm` | 13–14px | 400/500 | DM Sans | Secondary text, descriptions |
| `caption` | 11–12px | 500/600 | DM Sans | Labels, tags, metadata |
| `overline` | 11px | 700 | DM Sans | Section labels (uppercase + letter-spacing: 2px) |

### Letter Spacing
- Headlines: -1px to -2px (tight, confident)
- Overlines: +2px to +3px (airy, label-like)
- Body: 0 (default)

---

## 4. Colour System

### Base Palette (CSS Variables)
```css
:root {
  /* Backgrounds */
  --bg-base: #080808;          /* App background */
  --bg-surface: #0F0F0F;       /* Cards, panels */
  --bg-elevated: #141414;      /* Modals, dropdowns */
  --bg-hover: rgba(255,255,255,0.04);

  /* Primary — Green */
  --green-500: #1DB954;        /* Primary actions, accents */
  --green-600: #158A3E;        /* Hover states */
  --green-glow: rgba(29,185,84,0.18);
  --green-subtle: rgba(29,185,84,0.08);
  --green-border: rgba(29,185,84,0.25);

  /* Secondary — Gold */
  --gold-500: #C9A84C;         /* XP, achievements, Scholar Pro */
  --gold-400: #F0D080;         /* Light gold text */
  --gold-subtle: rgba(201,168,76,0.08);
  --gold-border: rgba(201,168,76,0.25);

  /* Text */
  --text-primary: #FFFFFF;
  --text-secondary: rgba(255,255,255,0.65);
  --text-muted: rgba(255,255,255,0.40);
  --text-disabled: rgba(255,255,255,0.20);

  /* Borders */
  --border-subtle: rgba(255,255,255,0.06);
  --border-default: rgba(255,255,255,0.10);
  --border-strong: rgba(255,255,255,0.18);

  /* Semantic */
  --success: #2EA855;
  --warning: #F0A020;
  --error: #E05050;
  --info: #4A9EDB;

  /* Skill levels */
  --skill-strong: #1DB954;     /* 80–100% */
  --skill-medium: #C9A84C;     /* 50–79% */
  --skill-weak: #E05050;       /* 0–49% */
}
```

### Colour Usage Rules
- **Green** = primary actions (buttons, CTAs, active states, success)
- **Gold** = XP, achievements, Scholar Pro tier, premium features
- **Red** = weak topics, errors, warnings, carryover-related messaging
- **White at varying opacity** = text hierarchy (100% → 65% → 40% → 20%)
- **Never** use pure white backgrounds. Never use purple. Never use blue as primary.

---

## 5. Spacing & Layout Grid

### Spacing Scale (4px base unit)
```
4px   — xs  (tight internal spacing)
8px   — sm  (gap between inline elements)
12px  — md  (component internal padding)
16px  — lg  (card padding, list gaps)
24px  — xl  (section internal spacing)
32px  — 2xl (between components)
48px  — 3xl (section padding top/bottom)
64px  — 4xl (large section gaps)
80px  — 5xl (hero padding)
120px — 6xl (marketing section padding)
```

### Border Radius
```
4px  — inputs, small tags
8px  — small chips, badges
12px — buttons, input fields
14px — cards (small)
16px — cards (medium)
20px — cards (large), modals
24px — hero cards, featured sections
99px — pills, round buttons
```

### Dashboard Layout
```
Sidebar: 240px wide (collapsed: 64px on mobile)
Content area: calc(100vw - 240px)
Top bar: 60px height
Content padding: 32px
Max content width: 1100px (centred in content area)
```

### Marketing Layout
```
Max content width: 1100px
Page padding: 48px (desktop), 20px (mobile)
Section padding: 100–120px top/bottom
```

---

## 6. Component Library

### Buttons

#### Primary Button (Green)
```
Background: var(--green-500)
Text: #FFFFFF, Syne, 700, 14–16px
Padding: 12px 24px (default) | 16px 36px (hero)
Border radius: 12px (default) | 14px (hero)
Box shadow: 0 4px 24px rgba(29,185,84,0.35)
Hover: background lightens to #25D466, shadow intensifies, translateY(-2px)
Active: translateY(0), shadow reduces
```

#### Ghost Button
```
Background: transparent
Border: 1px solid var(--border-default)
Text: var(--text-muted), DM Sans, 500, 14px
Padding: 9px 20px
Border radius: 99px
Hover: border-color → var(--border-strong), text → white
```

#### Destructive Button
```
Background: rgba(224,80,80,0.1)
Border: 1px solid rgba(224,80,80,0.3)
Text: var(--error), DM Sans, 600, 14px
```

### Cards
```
Background: var(--bg-surface)
Border: 1px solid var(--border-subtle)
Border radius: 16–20px
Padding: 24–32px
Hover: border-color → var(--green-border), translateY(-4px)
Transition: all 0.3s ease
```

#### Featured Card (Scholar plan, highlighted content)
```
Border: 1px solid var(--green-500)
Background: linear-gradient(160deg, rgba(29,185,84,0.08) 0%, var(--bg-surface) 100%)
Box shadow: 0 0 40px rgba(29,185,84,0.15)
```

### Input Fields
```
Background: rgba(255,255,255,0.05)
Border: 1.5px solid var(--border-default)
Border radius: 12px
Padding: 12px 16px
Text: var(--text-primary), DM Sans, 400, 14px
Placeholder: var(--text-muted)
Focus: border-color → var(--green-border), box-shadow: 0 0 0 3px rgba(29,185,84,0.1)
```

### Tags / Chips
```
Padding: 4px 12px (small) | 8px 18px (medium)
Border radius: 99px
Background: colour-subtle variant
Border: 1px solid colour-border variant
Text: colour-500, DM Sans, 600, 11–13px

Green tag: "Core Feature", "Active"
Gold tag: "Pro", "XP Bonus", "Gamified"
Red tag: "Weak Topic", "Needs Work"
```

### Progress / Skill Bar
```
Track: height 8px, background rgba(255,255,255,0.06), border-radius 99px
Fill — Strong (80–100%): linear-gradient(90deg, #158A3E, #1DB954), glow: 0 0 10px rgba(29,185,84,0.4)
Fill — Medium (50–79%): linear-gradient(90deg, #7A5A00, #C9A84C)
Fill — Weak (0–49%): linear-gradient(90deg, #7A2000, #E05050)
Animation: width transition 1.5s cubic-bezier(0.4, 0, 0.2, 1) on mount
```

### Toggle Switch
```
Track width: 44px, height: 24px, border-radius: 99px
Off: background rgba(255,255,255,0.12)
On: background var(--green-500)
Thumb: 18px circle, white, 3px from each end
Transition: 0.3s ease
```

### XP Badge (floating notification)
```
Background: linear-gradient(135deg, #C9A84C, #F0D080)
Text: #1A1A0E (dark), Syne, 800, 14–16px
Padding: 10px 20px
Border radius: 99px
Box shadow: 0 4px 24px rgba(201,168,76,0.7)
Animation: flies in from top-right, stays 1.8s, fades out upward
Position: fixed, top: 20px, right: 20px, z-index: 9999
```

### Chat Message Bubbles

#### AI message
```
Background: rgba(255,255,255,0.05)
Border: 1px solid var(--border-subtle)
Border radius: 4px 14px 14px 14px (top-left flat = AI)
Text: var(--text-secondary), DM Sans, 400, 14px
Max width: 80%
```

#### User message
```
Background: rgba(29,185,84,0.12)
Border: 1px solid rgba(29,185,84,0.2)
Border radius: 14px 4px 14px 14px (top-right flat = User)
Text: var(--text-primary), DM Sans, 400, 14px
Align: flex-end (right side)
Max width: 80%
```

#### Hint message
```
Background: rgba(201,168,76,0.07)
Border: 1px solid rgba(201,168,76,0.2)
Border radius: 10px
Text: var(--gold-500), DM Sans, 400, 13px italic
Prefix icon: 💡
```

#### Typing indicator
```
3 dots, 6px each, var(--text-muted), border-radius 50%
Animation: bounce sequentially (delay: 0, 0.15s, 0.3s)
```

### Sidebar Navigation
```
Width: 240px
Background: var(--bg-surface)
Border right: 1px solid var(--border-subtle)
Item padding: 10px 16px
Item border-radius: 10px
Active item: background var(--green-subtle), text var(--green-500), left border 2px solid var(--green-500)
Hover: background var(--bg-hover)
Icon size: 18px
Label: DM Sans, 500, 14px
```

---

## 7. Page-by-Page Specs

---

### `/` — Landing Page

#### Navbar
- Fixed, blur backdrop (backdrop-filter: blur(20px))
- Left: Logo (icon + wordmark)
- Centre: Navigation links (Features, Pricing, About) — hidden on mobile
- Right: "Log in" ghost button + "Start Free →" green pill button
- Shrinks on scroll: padding 18px → 12px

#### Hero Section
- Full viewport height (100vh)
- Background: near-black with subtle green radial glow (top-left) and gold glow (bottom-right)
- Grid overlay: 60px grid at 3% opacity
- Left side (60% width): Badge → Headline → Subtext → CTA → Social proof
- Right side (40% width): Floating mock chat widget
- Headline: Animates word-by-word on page load (each word: opacity 0 → 1, translateY 30px → 0)
- Green words: "Pass", "knowing." | Gold word: "Stop"
- CTA button: Large (16px, 16px 36px padding), green, strong shadow
- Social proof: Row of 5 emoji avatars + "2,400+ students already studying smarter"

#### Mock Chat Widget (Hero)
- Floats right, subtle rotation (-2deg) for personality
- Shows realistic AI tutor conversation in progress
- Typing dots animate in loop
- Floating badge top-right: "+50 XP earned 🏆" (gold, animates up and down)
- Floating badge bottom-left: "📅 Exam in 12 days" (dark card)

#### Pain Section
- Diagonal clip-path top and bottom (polygon cut) to break rectangular grid
- Background: var(--bg-surface) — slightly lighter than hero
- Left: 4 pain point cards (icon + title + description)
- Right: Large stat card — "2x" in massive Syne 800, with Harvard citation
- Pain cards hover: subtle green left border glow

#### How It Works
- 3 cards in a row
- Each card has: large faded step number (52px, green at 12% opacity), emoji icon, title, description
- Top border: 2px left-to-right green gradient line
- Cards hover: lift (translateY -6px)

#### Features Grid
- Asymmetric grid: some cards span 2 columns (the important ones)
- "Socratic AI Tutor" and "Skillometer" cards are the 2-col big ones
- Feature icon: 48px rounded square, green tinted background
- Each card has a coloured tag (green or gold)

#### Skillometer Preview
- Two-column layout: animated skill bars (left) + copy (right)
- Skill bars animate in when section scrolls into view (not on page load)
- Each bar has label, percentage, and colour-coded fill
- Strong → Medium → Weak = Green → Gold → Red

#### Testimonials
- 3 cards with student quotes
- Stars in gold
- Student avatar: emoji face (warm skin tones)
- School + department + level shown under name
- Cards hover: subtle lift + green border tint

#### Pricing Preview
- 3 plan cards
- Scholar plan (middle) is featured: green border, gradient background, "⭐ Most Popular" badge
- Scholar Pro has gold accents

#### CTA Banner
- Centred, dark background
- Large headline with green accent
- Big green CTA button
- Below button: comma-separated list of school names in muted text

---

### `/onboarding` — 6-Step Flow

#### Container
- Full screen, dark background
- Centred card: max-width 520px, padding 32px, glass-morphism effect
- Progress bar: 5 segments at top, gold fill on completed steps

#### Step 0 — Welcome
- Large waving hand emoji (48px)
- Bold headline with gold accent on "exams"
- 3 feature bullets with emoji icons
- Full-width green "Let's Go 🚀" button
- Small muted text: "3-day free trial · No credit card needed"

#### Step 1 — School Picker
- Step counter (STEP 1 OF 5, uppercase, green, 12px)
- Scrollable list of school cards (max-height 380px)
- Each card: 2-letter abbreviation icon + full name + school type badge
- UNIBEN appears FIRST in the list
- University type badge: green | Polytechnic: blue | COE: orange
- Selected state: gold border, gold checkmark, scale(1.02)

#### Step 2 — Department
- Search input at top (filters department list)
- Scrollable wrap of chip-style options
- Selected chip: gold border + background + text

#### Step 3 — Level + Goal + Hours
- Level: chips row
- Goal: 4 option cards with emoji + label + XP reward shown on right
- Carryover goal card: red-tinted (urgent feel)
- First Class goal: gold-tinted
- Study hours: chips row

#### Step 4 — Exam Date + Reminders
- Native date input (styled dark)
- 2 reminder toggle rows (SMS, Email) — toggle switches
- Phone input appears if either toggle is on
- Each reminder row has icon + title + subtitle explaining the benefit

#### Step 5 — Timetable Reveal
- Celebration emoji (🎉) centred
- Personalised headline: "Your study plan is ready!"
- Student's school + dept + level shown as meta line
- Goal badge in gold pill
- 7-day timetable: each day card animates in staggered (200–800ms delay)
- XP earned summary card in green
- Full-width "Enter ExamPadi 📚" button

---

### `/dashboard` — Home

#### Layout
- Left sidebar (240px, fixed) + main content area
- Sidebar: Logo at top, nav items, plan badge at bottom
- Top bar: Page title + XP counter + streak flame + avatar

#### Top Bar
- Left: Page title (Syne, 700, 20px)
- Right cluster: ⚡ XP pill (gold) + 🔥 Streak number (green) + Avatar circle
- Avatar: student's initials in a coloured circle, dropdown on click

#### Sidebar Nav Items
- 📊 Dashboard (home)
- 🤖 AI Tutor (chat)
- 📄 Materials (upload)
- 📅 Timetable
- 🏆 Leaderboard
- 👥 Referral
- ⚙️ Settings
- Active item: green left border + green text + subtle green background

#### Dashboard Home Widgets

**Today's Focus Card** (full width, prominent)
- Green gradient left border accent
- Topic name (large, Syne 700)
- Course name (small, muted)
- Exam countdown: "12 days to exam" in bold
- "Start Studying →" green button

**Streak + XP Row** (2 cards side by side)
- Streak card: 🔥 large number + "day streak" + motivational line
- XP card: ⚡ total XP + mini bar showing progress to next level

**Skillometer Widget** (horizontal bar charts for each course topic)
- Title: "Your Skillometer"
- 3–5 topic bars with colour coding
- "View all" link to full skillometer view
- Weak topics flagged in red with "Focus Today" tag

**Quick Action Buttons** (3 buttons in a row)
- "Start Study Session" → /dashboard/chat
- "Practice Quiz" → chat in quiz mode
- "Review Flashcards" → chat in flashcard mode

**Recent Activity Feed** (last 5 sessions)
- Each item: mode icon + topic + XP earned + time ago
- Compact, muted, no borders — just a clean list

---

### `/dashboard/chat` — AI Tutor

#### Layout
- Two-column on desktop: left (course selector + session history, 260px) + right (main chat, flex)
- Full screen on mobile (course selector slides in from left)

#### Left Panel
- Course selector: dropdown or list of student's courses
- "Today's topic" auto-selected based on timetable
- Mode selector: 🎓 Tutor / 📝 Quiz / 🃏 Flashcards / 🗓️ Timetable
- Previous sessions list (compact, by date)

#### Main Chat Area
- Top bar: Course name + mode badge + XP counter for this session
- Message list: scrollable, messages appear from bottom
- AI messages: left-aligned with AI avatar (small green icon)
- User messages: right-aligned
- Hint messages: full-width, gold-tinted, slightly indented
- Typing indicator: animated dots while AI is responding
- XP pop-up: floats up and fades when XP is awarded

#### Input Area (bottom, fixed)
- Text input: full width, rounded, dark
- Left side: 📎 file/image attach button (for uploading question photos)
- Right side: Send button (green arrow icon)
- Placeholder: "Ask anything about [Today's Topic]..."
- Character limit: 500 visible

#### Session XP Tracker (right panel, desktop only)
- Shows XP earned in this session
- List of topics covered in this session
- Progress toward today's timetable goal

---

### `/dashboard/upload` — Materials

#### Upload Zone
- Large dashed border area (min-height 200px)
- Centre: cloud upload icon + "Drop your PDFs here" text
- Sub-text: "Past questions, lecture notes, textbooks — we'll process them all"
- On hover: border turns green, background gets subtle green tint
- Supports: PDF, images (PNG/JPG for handwritten questions)
- Max file size: 20MB
- Shows file name + size after drop

#### Processing Status
- After upload: progress bar shows stages
  - Uploading → Processing → Extracting text → Building AI memory → Done ✓
- Each stage animates in sequence
- Done state: green checkmark + "Ready to use in your study sessions"

#### My Materials Library
- Grid of uploaded file cards (3 columns desktop, 1 mobile)
- Each card: file icon + name + course tag + upload date + processing status
- Actions: Delete button (with confirmation)
- Empty state: illustrated empty folder + "Upload your first past question to get started"

---

### `/dashboard/leaderboard`

#### Tabs
- "My School" / "My Department" / "National"
- Tab bar: horizontal, pill style, active tab green

#### Top 3 Podium
- Visual podium design: 2nd | 1st | 3rd height order
- Each position: avatar circle + name + XP + medal emoji
- 1st place gets gold glow, 2nd silver tint, 3rd bronze tint

#### Full Rankings Table
- Columns: Rank | Name | School | Streak | XP
- Alternating row background (very subtle)
- Current student's row: permanently highlighted in gold-subtle + "You" badge
- Rows animate in staggered on load

#### Your Position (if outside top 50)
- Fixed card at bottom of page
- Always visible: "You are ranked #247 nationally"
- "Top 10% in your department" motivational tag

---

### `/dashboard/referral`

#### Hero Area
- Bold headline: "Refer a friend, earn airtime 📱"
- Sub: "Get 15% of every friend's subscription — paid directly to your phone"

#### Referral Link Card
- Large card with referral URL: `exampadi.ng/ref/[code]`
- Copy button (changes to "Copied!" with green checkmark for 2 seconds)
- Share buttons: WhatsApp (primary), Twitter, Copy Link

#### Reward Tiers (visual ladder)
- 5 tiers displayed as a vertical progression
- Current tier highlighted in gold
- Next tier shown with XP/airtime to unlock
- Each tier: icon + label + airtime amount + bonus badge

#### My Referrals Table
- Columns: Friend name (truncated) | Status | Reward | Date
- Status badges: Pending (grey) | Trial (blue) | Converted (green) | Paid (gold)

#### Total Earnings Card
- Large gold card showing total airtime earned
- "Withdraw to Phone" button → triggers VTPass payout flow
- Minimum withdrawal: ₦500

---

### `/dashboard/settings`

#### Tab Navigation
- Profile | Plan | Notifications | Danger Zone

#### Profile Tab
- Avatar upload circle (click to change)
- Fields: Full name, Email (read-only from Clerk), Phone, School, Department, Level
- Exam date picker
- Study hours slider (1–6 hours/day)
- Save button (green, bottom)

#### Plan Tab
- Current plan card with green (Scholar) or gold (Scholar Pro) styling
- Plan name + price + renewal date
- Feature list (what's included)
- Upgrade button (if on Scholar, shows Pro upgrade)
- Cancel subscription link (destructive, small, bottom)
- Billing history table: Date | Amount | Status

#### Notifications Tab
- SMS reminders toggle + phone number input
- Email reminders toggle
- Streak at-risk alerts toggle
- Weekly report toggle (Scholar Pro only, locked for Scholar)
- Exam countdown alerts toggle

#### Danger Zone Tab
- Red-tinted section
- "Delete Account" button — requires typing "DELETE" to confirm
- Clear all study materials button

---

## 8. Motion & Animation

### Page Load
- All above-fold content fades up staggered (0.1s between elements)
- Hero headline: word-by-word animation (0.1s delay per word)
- Do not animate below-fold on load — use scroll-reveal

### Scroll Reveal
- All sections use IntersectionObserver
- Trigger: 12% of element visible
- Animation: opacity 0→1 + translateY 28px→0, 0.6s ease
- Stagger sibling elements: 0.1s delay increment

### XP Pop-Up
- Triggers after every positive action
- Floats in from top-right → bounces once → fades out upward
- Duration: 1.8s total
- Never stacks — if XP event fires while one is showing, queue it

### Skill Bars
- Animate to their value when section enters viewport
- Duration: 1.5s cubic-bezier(0.4, 0, 0.2, 1)
- Stagger bars: 150ms delay each

### Chat Messages
- New messages slide up from bottom: translateY(12px)→0, opacity 0→1, 0.25s
- AI typing indicator bounces with 0.15s stagger between dots

### Button Interactions
- Hover: translateY(-2px), shadow intensifies — 0.2s ease
- Active/Click: translateY(0), instant
- Disabled: opacity 0.4, cursor not-allowed, no hover effects

### Navigation Transitions
- Page transitions: fade (opacity 0→1, 0.3s)
- Sidebar active state: background expands from left, 0.2s

### Streak Fire
- 🔥 emoji in top bar gently pulses (scale 1→1.1→1) every 3 seconds when streak > 0
- On streak milestone (7, 30 days): brief confetti burst

---

## 9. Mobile Responsiveness

### Breakpoints
```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### Dashboard on Mobile
- Sidebar collapses to bottom navigation bar (5 icons)
- Top bar simplified: just logo + XP + avatar
- Cards stack to single column
- Chat: full screen, no left panel (course selector in top dropdown)

### Landing Page on Mobile
- Mock chat widget hidden (saves space, reduces complexity)
- Grid sections → single column
- Font sizes scale down (clamp() values)
- Padding: 48px → 20px

### Touch Interactions
- All tap targets minimum 44px height
- Swipe left on chat messages to reveal quick actions
- Pull-to-refresh on leaderboard

---

## 10. Accessibility

### Contrast Ratios
- Primary text on bg-base: > 7:1 (AAA)
- Secondary text on bg-base: > 4.5:1 (AA)
- Green on dark: passes AA at all standard sizes
- Gold on dark: passes AA at display sizes, use with care at small sizes

### Focus States
- All interactive elements have visible focus ring
- Focus ring: 2px solid var(--green-500), 2px offset
- Never remove outline without replacing with visible alternative

### Motion
- Respect prefers-reduced-motion:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Semantic HTML
- Use proper heading hierarchy (h1 → h2 → h3)
- Form inputs always have associated labels
- Images always have alt text
- Chat messages have role="log" aria-live="polite" on the container

### Screen Readers
- XP pop-up: aria-live="assertive"
- Loading states: aria-busy="true"
- Sidebar navigation: nav landmark with aria-label="Main navigation"

---

*ExamPadi DESIGN.md — Last updated: March 2025*
*Hand this document to your AI UI/UX tool (v0, Galileo, Locofy, or similar) along with the component specs for faithful implementation.*
