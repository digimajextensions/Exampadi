import type { Metadata } from 'next';
import { generatePageMetadata, faqSchema } from '@/lib/seo';
import { PricingPreview } from '@/components/marketing/pricing-preview';
import { FAQ, FAQS } from '@/components/marketing/faq';
import { CTABanner } from '@/components/marketing/cta-banner';

export const metadata: Metadata = generatePageMetadata({
  title: 'Pricing - ExamPadi Plans for Every Student',
  description:
    'Choose the ExamPadi plan that fits your study needs. Plans start at N3,500/month with a 3-day free trial. No credit card required.',
  path: '/pricing',
});

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(FAQS)),
        }}
      />
      <section className="bg-hero-gradient py-16">
        <div className="max-w-[800px] mx-auto px-5 md:px-12 text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-text-primary mb-4">
            Simple pricing, <span className="text-green-500">serious results</span>
          </h1>
          <p className="text-lg text-text-secondary">
            All plans include a 3-day free trial. No credit card required. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>
      </section>
      <PricingPreview />
      <FAQ />
      <CTABanner />
    </>
  );
}
