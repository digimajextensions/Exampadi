'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, Mail, Phone } from 'lucide-react';

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setStatus('sent');
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section className="bg-hero-gradient py-20">
        <div className="max-w-[800px] mx-auto px-5 md:px-12 text-center">
          <h1 className="font-display font-extrabold text-4xl md:text-5xl text-text-primary mb-4">
            Get in touch
          </h1>
          <p className="text-lg text-text-secondary">
            Have a question, feedback, or need help? We are here for you.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-5 md:px-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact info cards */}
            <div className="space-y-4">
              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-text-primary">WhatsApp</div>
                    <a
                      href="https://wa.me/2348158856280"
                      className="text-sm text-green-500 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      +234 815 885 6280
                    </a>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-text-primary">Email</div>
                    <a href="mailto:hello@exampadi.ng" className="text-sm text-green-500 hover:underline">
                      hello@exampadi.ng
                    </a>
                  </div>
                </div>
              </Card>
              <Card>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-text-primary">Support Hours</div>
                    <span className="text-sm text-text-secondary">Mon-Fri, 9am-6pm WAT</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact form */}
            <div className="md:col-span-2">
              <Card>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      required
                      placeholder="Chioma Adeyemi"
                    />
                    <Input
                      label="Email"
                      id="email"
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      required
                      placeholder="chioma@email.com"
                    />
                  </div>
                  <Input
                    label="Subject"
                    id="subject"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="What's this about?"
                  />
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      required
                      placeholder="Tell us how we can help..."
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <Button type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </Button>
                  {status === 'sent' && (
                    <p className="text-sm text-green-600">Message sent! We will get back to you soon.</p>
                  )}
                  {status === 'error' && (
                    <p className="text-sm text-red-500">Something went wrong. Please try WhatsApp instead.</p>
                  )}
                </form>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
