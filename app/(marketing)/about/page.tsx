import type { Metadata } from 'next';
import { generatePageMetadata, breadcrumbSchema } from '@/lib/seo';
import { Card } from '@/components/ui/card';
import { BookOpen, Brain, Users, Target } from 'lucide-react';

export const metadata: Metadata = generatePageMetadata({
  title: 'About ExamPadi - Our Mission to Transform Nigerian Education',
  description:
    'ExamPadi is built for Nigerian students who deserve world-class study tools. Learn about our mission, the science behind our approach, and the team.',
  path: '/about',
});

const VALUES = [
  {
    icon: Brain,
    title: 'Science-Backed Learning',
    description: 'A 2019 Harvard study showed that Socratic questioning leads to 2x better knowledge retention than passive reading. ExamPadi applies this to every interaction.',
  },
  {
    icon: BookOpen,
    title: 'Nigerian-First',
    description: 'Built specifically for Nigerian university students. We understand your curriculum, your exam patterns, and the challenges you face from UNIBEN to YABATECH.',
  },
  {
    icon: Users,
    title: 'Community-Driven',
    description: 'Our referral system builds study communities across campuses. When you help a coursemate join, you both win -- they get a study partner, you earn airtime.',
  },
  {
    icon: Target,
    title: 'Results-Focused',
    description: 'Everything we build is designed to help you pass your exams. No fluff, no distractions. Every feature has one purpose: getting you closer to that grade.',
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Home', url: 'https://exampadi.ng' },
              { name: 'About', url: 'https://exampadi.ng/about' },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="bg-hero-gradient py-20">
        <div className="max-w-[800px] mx-auto px-5 md:px-12 text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-text-primary mb-6">
            Your exam padi, <span className="text-green-500">powered by AI</span>
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ExamPadi was built with one mission: to give every Nigerian student access to a world-class study companion. We combine artificial intelligence with proven learning science to help you study smarter, not just harder.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 bg-white">
        <div className="max-w-[800px] mx-auto px-5 md:px-12">
          <h2 className="font-display font-extrabold text-3xl text-text-primary mb-6 text-center">
            The problem we are solving
          </h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Nigerian university students face a unique set of challenges. Overcrowded lecture halls, limited access to study materials, inconsistent teaching quality, and the pressure of a system where one exam can determine your future.
            </p>
            <p>
              Most students resort to memorising past questions without truly understanding the material. They study alone, with no feedback on what they actually know versus what they think they know. When exam day comes, many are left guessing.
            </p>
            <p>
              ExamPadi changes this. Our AI tutor uses the Socratic method -- the same approach used at the world&#39;s best universities -- to guide you to discover answers yourself. A Harvard University study (2019) demonstrated that this method leads to 2x better retention compared to passive reading.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-bg-surface">
        <div className="max-w-[1100px] mx-auto px-5 md:px-12">
          <h2 className="font-display font-extrabold text-3xl text-text-primary mb-12 text-center">
            What we believe
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {VALUES.map((value) => (
              <Card key={value.title}>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center flex-shrink-0">
                    <value.icon className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-text-primary mb-2">{value.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
