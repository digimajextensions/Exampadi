import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Terms of Service - ExamPadi',
  description: 'ExamPadi terms of service. Read our terms and conditions for using the ExamPadi platform.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[800px] mx-auto px-5 md:px-12 prose prose-sm">
        <h1 className="font-display font-extrabold text-3xl text-text-primary mb-8">Terms of Service</h1>
        <p className="text-text-muted text-sm mb-8">Last updated: January 2025</p>

        <h2>1. Acceptance of Terms</h2>
        <p>By creating an account or using ExamPadi (exampadi.ng), you agree to these Terms of Service. If you do not agree, please do not use the Service.</p>

        <h2>2. Service Description</h2>
        <p>ExamPadi is an AI-powered exam preparation platform designed for Nigerian university, polytechnic, and college of education students. The Service includes AI tutoring, study material uploads, timetable generation, quizzes, flashcards, and gamified progress tracking.</p>

        <h2>3. User Accounts</h2>
        <ul>
          <li>You must provide accurate information when creating an account</li>
          <li>You are responsible for maintaining the security of your account</li>
          <li>You must be at least 16 years old to use the Service</li>
          <li>One account per person; sharing accounts is not permitted</li>
        </ul>

        <h2>4. Subscriptions and Payments</h2>
        <ul>
          <li>Free plan users have limited access as described on our pricing page</li>
          <li>Paid subscriptions are billed monthly through Paystack in Nigerian Naira (NGN)</li>
          <li>New paid subscriptions include a 3-day free trial</li>
          <li>Subscriptions auto-renew unless cancelled before the renewal date</li>
          <li>You can cancel your subscription at any time from your settings</li>
        </ul>

        <h2>5. AI Tutor Disclaimer</h2>
        <ul>
          <li>The AI tutor is designed to guide and teach, not provide definitive answers</li>
          <li>AI-generated content may occasionally contain errors</li>
          <li>ExamPadi is a study supplement, not a replacement for lectures and official study materials</li>
          <li>We do not guarantee specific grades or exam outcomes</li>
        </ul>

        <h2>6. Uploaded Materials</h2>
        <ul>
          <li>You retain ownership of materials you upload</li>
          <li>You grant ExamPadi a license to process your materials for AI tutoring purposes</li>
          <li>You must have the right to upload any materials you submit</li>
          <li>We do not share your uploaded materials with other users</li>
        </ul>

        <h2>7. Referral Program</h2>
        <ul>
          <li>Referral rewards are subject to fraud prevention checks</li>
          <li>Payouts require the referred user to maintain an active subscription for at least 7 days</li>
          <li>Abuse of the referral system (e.g., fake accounts) will result in account suspension</li>
        </ul>

        <h2>8. Prohibited Conduct</h2>
        <ul>
          <li>Using the Service to engage in academic dishonesty during actual exams</li>
          <li>Attempting to circumvent usage limits or security measures</li>
          <li>Sharing account credentials</li>
          <li>Uploading copyrighted material you do not have rights to</li>
          <li>Abusing the referral system</li>
        </ul>

        <h2>9. Termination</h2>
        <p>We may suspend or terminate your account if you violate these Terms. You may delete your account at any time from your settings.</p>

        <h2>10. Contact</h2>
        <p>For questions about these Terms, contact us at hello@exampadi.ng or WhatsApp +234 815 885 6280.</p>
      </div>
    </section>
  );
}
