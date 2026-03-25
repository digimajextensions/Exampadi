import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="py-20 bg-green-500">
      <div className="max-w-[800px] mx-auto px-5 md:px-12 text-center">
        <h2 className="font-display font-extrabold text-3xl md:text-4xl text-white mb-4">
          Ready to ace your exams?
        </h2>
        <p className="text-green-100 text-lg mb-8 max-w-lg mx-auto">
          Join students across Nigeria who are studying smarter with ExamPadi. Start your free trial today.
        </p>
        <Link href="/sign-up">
          <Button
            variant="secondary"
            size="lg"
            className="bg-white text-green-600 hover:bg-green-50 text-base px-8"
          >
            Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <p className="text-green-100 text-sm mt-4">
          3-day free trial &middot; No credit card required &middot; Cancel anytime
        </p>
      </div>
    </section>
  );
}
