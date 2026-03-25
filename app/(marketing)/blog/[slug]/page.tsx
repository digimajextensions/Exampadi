import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// This will be replaced with Sanity CMS data once connected
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return {
    title: `Blog Post | ExamPadi`,
    description: 'Read this article on the ExamPadi blog.',
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[700px] mx-auto px-5 md:px-12">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-green-500 hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <article className="prose prose-sm max-w-none">
          <h1 className="font-display font-extrabold text-3xl text-text-primary mb-4">
            {params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </h1>
          <p className="text-text-muted text-sm mb-8">Published on ExamPadi Blog</p>

          <p className="text-text-secondary leading-relaxed">
            This blog post will be populated with content from Sanity CMS once the integration is complete. Check back soon for study tips, past question guides, and exam preparation strategies tailored for Nigerian university students.
          </p>

          <p className="text-text-secondary leading-relaxed mt-4">
            In the meantime, why not start your free trial and experience ExamPadi&#39;s AI tutor for yourself?
          </p>
        </article>
      </div>
    </section>
  );
}
