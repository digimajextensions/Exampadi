import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Gift } from 'lucide-react';

export async function generateMetadata({ params }: { params: { code: string } }): Promise<Metadata> {
  return {
    title: 'Join ExamPadi - Your Friend Invited You!',
    description: 'Your friend wants you to study smarter with ExamPadi. Sign up now and you both benefit!',
  };
}

export default function ReferralLandingPage({ params }: { params: { code: string } }) {
  return (
    <>
      <section className="bg-hero-gradient py-20">
        <div className="max-w-[700px] mx-auto px-5 md:px-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gold-50 flex items-center justify-center mx-auto mb-6">
            <Gift className="h-8 w-8 text-gold-500" />
          </div>

          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-text-primary mb-4">
            Your padi wants you to <span className="text-green-500">ace your exams</span>
          </h1>

          <p className="text-lg text-text-secondary mb-8 leading-relaxed">
            A friend has invited you to ExamPadi -- the AI study partner built for Nigerian university students. Upload your past questions, get a personalised study timetable, and drill with a Socratic AI tutor.
          </p>

          <Link href={`/sign-up?ref=${params.code}`}>
            <Button size="lg" className="text-base px-8">
              Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>

          <p className="text-sm text-text-muted mt-4">
            3-day free trial &middot; No credit card required
          </p>
        </div>
      </section>
    </>
  );
}
