import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { WhatsAppWidget } from '@/components/whatsapp-widget';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ExamPadi - Your AI Study Partner for Nigerian University Exams',
    template: '%s | ExamPadi',
  },
  description:
    'AI-powered exam preparation for Nigerian university, polytechnic, and college of education students. Upload past questions, get a personalised study timetable, and drill with a Socratic AI tutor.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://exampadi.ng'),
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://exampadi.ng',
    siteName: 'ExamPadi',
    title: 'ExamPadi - Your AI Study Partner for Nigerian University Exams',
    description:
      'AI-powered exam preparation for Nigerian university, polytechnic, and college of education students.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExamPadi - Your AI Study Partner for Nigerian University Exams',
    description:
      'AI-powered exam preparation for Nigerian university, polytechnic, and college of education students.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="font-body">
          {children}
          <WhatsAppWidget />
        </body>
      </html>
    </ClerkProvider>
  );
}
