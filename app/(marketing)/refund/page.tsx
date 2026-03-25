import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Refund Policy - ExamPadi',
  description: 'ExamPadi refund policy. Learn about our refund process for subscription payments.',
  path: '/refund',
});

export default function RefundPage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[800px] mx-auto px-5 md:px-12 prose prose-sm">
        <h1 className="font-display font-extrabold text-3xl text-text-primary mb-8">Refund Policy</h1>
        <p className="text-text-muted text-sm mb-8">Last updated: January 2025</p>

        <h2>1. Free Trial</h2>
        <p>All paid plans include a 3-day free trial. No payment is required during the trial period. If you cancel before the trial ends, you will not be charged.</p>

        <h2>2. Subscription Refunds</h2>
        <p>Since ExamPadi provides immediate access to digital services upon payment:</p>
        <ul>
          <li>Refund requests within 48 hours of initial payment (after trial) will be reviewed on a case-by-case basis</li>
          <li>Refunds are not available for partial months of service</li>
          <li>If you cancel mid-cycle, you retain access until the end of your current billing period</li>
        </ul>

        <h2>3. How to Request a Refund</h2>
        <p>To request a refund:</p>
        <ol>
          <li>Contact us within 48 hours of payment at hello@exampadi.ng</li>
          <li>Include your registered email address and reason for the request</li>
          <li>We will review and respond within 2 business days</li>
        </ol>

        <h2>4. Refund Processing</h2>
        <p>Approved refunds are processed through Paystack and will be credited to your original payment method within 5-10 business days.</p>

        <h2>5. Exceptions</h2>
        <ul>
          <li>Refunds will not be issued for accounts suspended due to Terms of Service violations</li>
          <li>Referral airtime payouts are non-refundable once sent</li>
        </ul>

        <h2>6. Contact</h2>
        <p>For refund inquiries, reach us at hello@exampadi.ng or WhatsApp +234 815 885 6280.</p>
      </div>
    </section>
  );
}
