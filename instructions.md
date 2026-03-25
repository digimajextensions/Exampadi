# ExamPadi - Deployment & Setup Instructions

## Prerequisites
- Node.js 18+
- npm
- Vercel account
- Clerk account
- Paystack account
- Hollatags account
- Resend account
- VTU Naija account
- Sanity account (optional, for blog)

## Step 1: Environment Setup

Copy `.env.local.example` to `.env.local` and fill in all API keys.

### Clerk Setup
1. Create a Clerk application at clerk.com
2. Copy the Publishable Key and Secret Key
3. Configure sign-in/sign-up URLs in Clerk dashboard
4. Set up webhook endpoint: `https://exampadi.ng/api/webhooks/clerk`

### InsForge Setup
1. Run: `npx @insforge/cli link --project-id d04375c0-5c70-47de-9185-c6fa98ec53ce`
2. Run all SQL migrations from BUILD.md
3. Verify connection

### Paystack Setup
1. Create 3 subscription plans in Paystack dashboard:
   - Starter: N3,500/month
   - Scholar: N5,500/month
   - Scholar Pro: N8,500/month
2. Copy plan codes to environment variables
3. Set up webhook: `https://exampadi.ng/api/webhooks/paystack`
4. Set webhook secret

### Sanity Setup (Optional)
1. Create a Sanity project at sanity.io
2. Copy project ID and dataset name
3. Create API token with read access

## Step 2: Install & Run

```bash
npm install
npm run dev
```

## Step 3: Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add all environment variables
4. Deploy

## Step 4: DNS Configuration

Point `exampadi.ng` to Vercel:
- Add CNAME record: `@` -> `cname.vercel-dns.com`
- Or use Vercel's nameservers

## Step 5: Post-Deployment

1. Verify all webhook endpoints are receiving events
2. Test payment flow end-to-end
3. Verify cron jobs are running (check Vercel dashboard)
4. Test SMS and email reminders

## License Key Management

To grant lifetime access:
1. Edit `config/license-keys.json`
2. Add key with student email
3. Deploy (or trigger sync via POST `/api/admin/sync-licenses`)
