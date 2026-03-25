import { Card } from '@/components/ui/card';

const TESTIMONIALS = [
  {
    name: 'Chioma A.',
    school: 'UNIBEN',
    department: 'Medicine',
    quote: 'ExamPadi changed how I study. The AI tutor does not just give you answers -- it makes you think. I went from struggling in Anatomy to getting a B+.',
    avatar: 'CA',
  },
  {
    name: 'Tunde O.',
    school: 'UNILAG',
    department: 'Computer Science',
    quote: 'The study timetable is a game-changer. It knew exactly which topics I was weak in and made me focus there. My CGPA went up by 0.4 in one semester.',
    avatar: 'TO',
  },
  {
    name: 'Aisha M.',
    school: 'ABU',
    department: 'Law',
    quote: 'I love the streak system. It keeps me accountable. The SMS reminders are perfect because I do not always have data for WhatsApp.',
    avatar: 'AM',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1100px] mx-auto px-5 md:px-12">
        <div className="text-center mb-16">
          <h2 className="font-display font-extrabold text-3xl md:text-4xl text-text-primary mb-4">
            Students are <span className="text-green-500">loving ExamPadi</span>
          </h2>
          <p className="text-text-secondary">
            Here is what students across Nigerian universities are saying.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.name} variant="bordered">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-display font-bold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-sm text-text-primary">{testimonial.name}</div>
                  <div className="text-xs text-text-muted">{testimonial.school} &middot; {testimonial.department}</div>
                </div>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
