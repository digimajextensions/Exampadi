import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy - ExamPadi',
  description: 'ExamPadi privacy policy. Learn how we collect, use, and protect your personal data in compliance with the NDPR.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[800px] mx-auto px-5 md:px-12 prose prose-sm">
        <h1 className="font-display font-extrabold text-3xl text-text-primary mb-8">Privacy Policy</h1>
        <p className="text-text-muted text-sm mb-8">Last updated: January 2025</p>

        <h2>1. Introduction</h2>
        <p>ExamPadi (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use exampadi.ng (the &quot;Service&quot;) in compliance with the Nigeria Data Protection Regulation (NDPR).</p>

        <h2>2. Information We Collect</h2>
        <p>We collect the following information:</p>
        <ul>
          <li><strong>Account Information:</strong> Name, email address, phone number, school, department, and level when you sign up.</li>
          <li><strong>Study Data:</strong> Uploaded materials, chat messages with the AI tutor, quiz results, timetable data, and study progress.</li>
          <li><strong>Payment Information:</strong> Processed securely through Paystack. We do not store your card details.</li>
          <li><strong>Usage Data:</strong> Login times, feature usage, device information, and IP address.</li>
        </ul>

        <h2>3. How We Use Your Data</h2>
        <ul>
          <li>To provide and personalise the ExamPadi study experience</li>
          <li>To generate AI tutoring responses tailored to your courses</li>
          <li>To send study reminders via SMS and email (with your consent)</li>
          <li>To process payments and manage subscriptions</li>
          <li>To improve our AI models and product features</li>
          <li>To prevent fraud and abuse</li>
        </ul>

        <h2>4. Data Sharing</h2>
        <p>We do not sell your personal data. We share data only with:</p>
        <ul>
          <li><strong>Service Providers:</strong> Clerk (authentication), Paystack (payments), Hollatags (SMS), Resend (email), InsForge (AI/database)</li>
          <li><strong>Legal Requirements:</strong> When required by Nigerian law or regulation</li>
        </ul>

        <h2>5. Data Security</h2>
        <p>We implement industry-standard security measures including encryption in transit (TLS), encrypted database storage, and regular security audits.</p>

        <h2>6. Your Rights (NDPR)</h2>
        <p>Under the NDPR, you have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Withdraw consent for data processing</li>
          <li>Data portability</li>
        </ul>

        <h2>7. Contact Us</h2>
        <p>For privacy-related inquiries, contact us at:</p>
        <ul>
          <li>Email: privacy@exampadi.ng</li>
          <li>WhatsApp: +234 815 885 6280</li>
        </ul>
      </div>
    </section>
  );
}
