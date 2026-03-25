'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQS = [
  {
    question: 'How does the AI tutor work?',
    answer: 'ExamPadi uses a Socratic AI tutor that never gives you answers directly. Instead, it guides you through hints, leading questions, and step-by-step reasoning. Research shows this method leads to 2x better retention compared to passive reading. You upload your past questions, and the AI uses them to create personalised study sessions.',
  },
  {
    question: 'Which schools and courses are supported?',
    answer: 'ExamPadi supports 100+ Nigerian institutions including UNIBEN, UNILAG, YABATECH, ABU, OAU, UI, UNN, FUTA, LASU, MAPOLY, and many more. It works for all courses and departments -- you upload your specific past questions and materials, and the AI adapts to your exact syllabus.',
  },
  {
    question: 'Is there a free plan?',
    answer: 'Yes! After your 3-day free trial, you can continue on the free plan with 5 AI questions per day. No uploads, no reminders, but you can still use the basic AI tutor. Paid plans start at N3,500/month for more questions, uploads, and features.',
  },
  {
    question: 'How does payment work?',
    answer: 'We accept payments via Paystack (debit cards, bank transfer, USSD). All prices are in Naira. You get a 3-day free trial on any paid plan with no credit card required at signup. Cancel anytime from your settings.',
  },
  {
    question: 'Can I earn airtime by referring friends?',
    answer: 'Yes! Share your referral link with coursemates. When they subscribe, you earn airtime rewards: N200 per referral for Starter, N350 for Scholar, N500 for Scholar Pro. Bonus tiers at 3, 5, 10, and 20+ referrals. Airtime is sent directly to your phone via MTN, Airtel, Glo, or 9mobile.',
  },
  {
    question: 'Does the SMS reminder work without internet?',
    answer: 'Yes! SMS reminders work on any phone, even basic phones on 2G networks. You will get a daily study reminder with your focus topic. This feature is available on Scholar and Scholar Pro plans.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[700px] mx-auto px-5 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-text-primary mb-4">
            Frequently asked questions
          </h2>
          <p className="text-text-secondary">
            Everything you need to know about ExamPadi.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-bg-hover transition-colors"
              >
                <span className="font-medium text-sm text-text-primary pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-text-muted flex-shrink-0 transition-transform',
                    openIndex === index && 'rotate-180'
                  )}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-text-secondary leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { FAQS };
