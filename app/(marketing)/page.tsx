import type { Metadata } from 'next';
import { Hero } from '@/components/marketing/hero';
import { SocialProof } from '@/components/marketing/social-proof';
import { Stats } from '@/components/marketing/stats';
import { Features } from '@/components/marketing/features';
import { Testimonials } from '@/components/marketing/testimonials';
import { PricingPreview } from '@/components/marketing/pricing-preview';
import { FAQ } from '@/components/marketing/faq';
import { CTABanner } from '@/components/marketing/cta-banner';
import { organizationSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'ExamPadi - Your AI Study Partner for Nigerian University Exams',
  description:
    'AI-powered exam preparation for Nigerian university, polytechnic, and college of education students. Upload past questions, get a personalised study timetable, and drill with a Socratic AI tutor.',
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }}
      />
      <Hero />
      <SocialProof />
      <Stats />
      <Features />
      <Testimonials />
      <PricingPreview />
      <FAQ />
      <CTABanner />
    </>
  );
}
