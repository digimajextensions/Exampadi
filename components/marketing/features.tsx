import { Brain, Upload, Calendar, Trophy, BarChart3, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

const FEATURES = [
  {
    icon: Brain,
    title: 'Socratic AI Tutor',
    description: 'Our AI never gives you answers directly. Instead, it guides you to discover them yourself through hints and leading questions -- the proven way to truly learn.',
  },
  {
    icon: Upload,
    title: 'Upload Past Questions',
    description: 'Drop your PDFs and the AI learns your course material. It uses your actual past questions and notes to create personalised study sessions.',
  },
  {
    icon: Calendar,
    title: 'Smart Study Timetable',
    description: 'Get a 7-day study plan that adapts to your exam date, weak topics, and available hours. The 80/20 rule ensures you focus where it matters most.',
  },
  {
    icon: Trophy,
    title: 'Gamified Progress',
    description: 'Earn XP, maintain streaks, and climb leaderboards. Compete with coursemates and track your improvement with the Skillometer.',
  },
  {
    icon: BarChart3,
    title: 'Skillometer Analytics',
    description: 'See exactly which topics you are strong in and which need work. The AI automatically adjusts your study plan based on your performance.',
  },
  {
    icon: MessageCircle,
    title: 'SMS & Email Reminders',
    description: 'Never miss a study session. Get daily reminders via SMS (works on 2G!) and email with your focus topic for the day.',
  },
];

export function Features() {
  return (
    <section className="py-20 bg-bg-surface">
      <div className="max-w-[1100px] mx-auto px-5 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-text-primary mb-4">
            Everything you need to <span className="text-green-500">pass your exams</span>
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            ExamPadi combines AI tutoring, smart scheduling, and gamification to make exam prep effective and engaging.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Card key={feature.title} className="hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-display font-bold text-lg text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
