import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Brain, Trophy } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      <div className="max-w-[1100px] mx-auto px-5 md:px-12 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-border rounded-full px-4 py-1.5 mb-6">
            <span className="text-xs font-semibold text-green-600">AI-Powered</span>
            <span className="text-xs text-text-secondary">Study smarter, not harder</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold text-4xl md:text-6xl lg:text-7xl text-text-primary tracking-tight mb-6">
            Your AI Study Partner for{' '}
            <span className="text-green-500">Nigerian Exams</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed">
            Upload past questions, get a personalised study timetable, and drill with a Socratic AI tutor that helps you truly understand -- not just memorise.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/sign-up">
              <Button size="lg" className="text-base px-8">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="text-base px-8">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Social proof */}
          <p className="text-sm text-text-muted mb-8">
            3-day free trial. No credit card required. Built for UNIBEN, UNILAG, YABATECH, OAU, UI, and 100+ institutions.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Brain, label: 'Socratic AI Tutor' },
              { icon: BookOpen, label: 'Smart Timetable' },
              { icon: Trophy, label: 'Gamified Learning' },
            ].map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 shadow-sm"
              >
                <feature.icon className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium text-text-primary">{feature.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
