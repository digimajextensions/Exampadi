import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { formatNaira } from '@/lib/utils';

const PLANS = [
  {
    name: 'Starter',
    price: 3500,
    description: 'For students getting started with AI study tools',
    features: [
      '40 AI questions/day',
      '3 file uploads',
      'Email reminders',
      'School leaderboard',
      'Basic Skillometer (3 topics)',
      '10 flashcards/day',
      '5 quizzes/day',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Scholar',
    price: 5500,
    description: 'For serious students who want comprehensive prep',
    features: [
      '150 AI questions/day',
      '15 file uploads',
      'SMS + Email reminders',
      'School + Dept leaderboard',
      'Full Skillometer',
      '50 flashcards/day',
      '20 quizzes/day',
      'Smart 7-day timetable',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Scholar Pro',
    price: 8500,
    description: 'Maximum power for students aiming for First Class',
    features: [
      '400 AI questions/day',
      '40 file uploads',
      'SMS + Email reminders',
      'National leaderboard',
      'Full Skillometer + Weekly Report',
      '150 flashcards/day',
      '60 quizzes/day',
      'Smart timetable + 80/20 + weak focus',
      'Priority AI (faster model)',
      'Teach the AI mode',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
];

export function PricingPreview() {
  return (
    <section className="py-20 bg-bg-surface">
      <div className="max-w-[1100px] mx-auto px-5 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-text-primary mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            All plans include a 3-day free trial. No credit card required at signup.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={plan.popular ? 'border-2 border-green-500 relative' : ''}
            >
              {plan.popular && (
                <Badge variant="green" className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <div className="mb-6">
                <h3 className="font-display font-bold text-xl text-text-primary">{plan.name}</h3>
                <p className="text-sm text-text-secondary mt-1">{plan.description}</p>
                <div className="mt-4">
                  <span className="font-display font-extrabold text-3xl text-text-primary">
                    {formatNaira(plan.price)}
                  </span>
                  <span className="text-text-muted text-sm">/month</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/sign-up">
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/pricing" className="text-sm text-green-500 font-medium hover:underline">
            View full plan comparison &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
