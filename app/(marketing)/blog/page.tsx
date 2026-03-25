import type { Metadata } from 'next';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/seo';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = generatePageMetadata({
  title: 'Blog - ExamPadi Study Tips & Past Question Guides',
  description:
    'Study tips, past question guides, and exam preparation strategies for Nigerian university students. Powered by ExamPadi.',
  path: '/blog',
});

// Placeholder blog posts until Sanity is connected
const PLACEHOLDER_POSTS = [
  {
    slug: 'how-to-study-with-past-questions',
    title: 'How to Study Effectively with Past Questions',
    excerpt: 'Past questions are your best friend during exam prep. Here is a proven method for using them to boost your grades.',
    date: '2025-01-15',
    category: 'Study Tips',
  },
  {
    slug: 'socratic-method-explained',
    title: 'The Socratic Method: Why ExamPadi Never Gives You Answers',
    excerpt: 'Discover the Harvard-backed science behind why being guided to discover answers leads to 2x better retention.',
    date: '2025-01-10',
    category: 'Learning Science',
  },
  {
    slug: 'exam-preparation-timeline',
    title: 'The Perfect Exam Preparation Timeline for Nigerian Students',
    excerpt: 'Whether you have 30 days or 7 days until exams, here is how to structure your study time for maximum results.',
    date: '2025-01-05',
    category: 'Exam Prep',
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-hero-gradient py-16">
        <div className="max-w-[800px] mx-auto px-5 md:px-12 text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-text-primary mb-4">
            The ExamPadi Blog
          </h1>
          <p className="text-lg text-text-secondary">
            Study tips, exam strategies, and guides for Nigerian university students.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[900px] mx-auto px-5 md:px-12">
          <div className="space-y-6">
            {PLACEHOLDER_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold text-green-500 mb-2 block">{post.category}</span>
                      <h2 className="font-display font-bold text-lg text-text-primary mb-2">{post.title}</h2>
                      <p className="text-sm text-text-secondary">{post.excerpt}</p>
                    </div>
                    <span className="text-xs text-text-muted whitespace-nowrap">{post.date}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
