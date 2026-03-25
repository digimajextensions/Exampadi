import Link from 'next/link';

const FOOTER_LINKS = {
  Product: [
    { href: '/pricing', label: 'Pricing' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/refund', label: 'Refund Policy' },
    { href: '/sitemap.xml', label: 'Sitemap' },
  ],
  Support: [
    { href: 'https://wa.me/2348158856280', label: 'WhatsApp Support' },
    { href: 'mailto:hello@exampadi.ng', label: 'Email Us' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-border">
      <div className="max-w-[1100px] mx-auto px-5 md:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center text-white font-display font-bold text-sm">
                EP
              </div>
              <span className="font-display font-bold text-lg text-text-primary">
                Exam<span className="text-green-500">Padi</span>
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              Your AI study partner for Nigerian university exams. Built for students who want to pass with confidence.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-bold text-sm text-text-primary mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-green-500 transition-colors"
                      {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            &copy; {new Date().getFullYear()} ExamPadi. All rights reserved.
          </p>
          <p className="text-sm text-text-muted">
            Made with purpose for Nigerian students.
          </p>
        </div>
      </div>
    </footer>
  );
}
