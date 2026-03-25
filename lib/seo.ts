import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://exampadi.ng';

interface SEOParams {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  type?: 'website' | 'article';
  publishedAt?: string;
  author?: string;
}

export function generatePageMetadata(params: SEOParams): Metadata {
  const url = `${BASE_URL}${params.path}`;
  return {
    title: params.title,
    description: params.description,
    alternates: { canonical: url },
    openGraph: {
      title: params.title,
      description: params.description,
      url,
      siteName: 'ExamPadi',
      type: params.type || 'website',
      locale: 'en_NG',
      images: [{ url: params.ogImage || `${BASE_URL}/og-image.png`, width: 1200, height: 630 }],
      ...(params.publishedAt && { publishedTime: params.publishedAt }),
      ...(params.author && { authors: [params.author] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: params.title,
      description: params.description,
      images: [params.ogImage || `${BASE_URL}/og-image.png`],
    },
  };
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ExamPadi',
    url: BASE_URL,
    logo: `${BASE_URL}/images/logo.png`,
    description: 'AI-powered exam preparation for Nigerian university students',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234-815-885-6280',
      contactType: 'customer support',
      availableLanguage: 'English',
    },
    sameAs: [],
  };
}

export function articleSchema(params: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  author: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.title,
    description: params.description,
    url: params.url,
    datePublished: params.publishedAt,
    author: {
      '@type': 'Person',
      name: params.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ExamPadi',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/images/logo.png` },
    },
    image: params.image || `${BASE_URL}/og-image.png`,
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
