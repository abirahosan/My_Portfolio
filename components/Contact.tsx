'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Button from './Button';

const SOCIALS = [
  { label: 'GitHub', handle: 'abirahosan', href: 'https://github.com/abirahosan' },
  { label: 'LinkedIn', handle: 'Abir Ahosan Ratul', href: 'https://www.linkedin.com/in/abir-ahosan-b250583b3/' },
];

function RevealItem({ children, delay = 0, direction = 'up' }: {
  children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right';
}) {
  const { ref, isVisible } = useScrollReveal(0.15);
  const initial = direction === 'left' ? { opacity: 0, x: -28 }
    : direction === 'right' ? { opacity: 0, x: 28 }
    : { opacity: 0, y: 20 };

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={initial}
      animate={isVisible ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('https://formspree.io/f/xbdbqaer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSent(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left */}
        <div>
          <RevealItem direction="left">
            <p className="section-label mb-4">Contact</p>
            <h2 className="section-title mb-6">
              Let&apos;s <span className="font-display italic text-ink-accent">connect</span>
            </h2>
            <p className="font-body text-ink-secondary leading-relaxed mb-10 max-w-sm">
              I&apos;m open to networking opportunities, internships, entry-level IT positions,
              and professional connections. Feel free to reach out if you&apos;d like to connect
              or discuss technology and networking.
            </p>
          </RevealItem>

          <div className="space-y-3 mb-10">
            {SOCIALS.map((s, i) => (
              <RevealItem key={s.label} delay={0.1 + i * 0.07} direction="left">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between bg-bg-card border border-bg-border rounded-xl px-5 py-3.5 hover:border-ink-muted/40 hover:bg-bg-elevated transition-all duration-200 group"
                >
                  <span className="font-mono text-xs text-ink-muted">{s.label}</span>
                  <span className="font-body text-sm text-ink-secondary group-hover:text-ink-primary transition-colors">
                    {s.handle} ↗
                  </span>
                </a>
              </RevealItem>
            ))}
          </div>

          <RevealItem delay={0.3} direction="left">
            <div className="bg-bg-card border border-bg-border rounded-2xl p-5">
              <p className="font-mono text-xs text-ink-muted mb-1">Direct email</p>
              <p className="font-body text-base text-ink-primary">abirahosan001@gmail.com</p>
            </div>
          </RevealItem>
        </div>

        {/* Right */}
        <RevealItem direction="right">
          {sent ? (
            <motion.div
              className="flex flex-col items-center justify-center text-center py-20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-ink-accent/10 border border-ink-accent/30 flex items-center justify-center mb-5">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10l4.5 4.5L16 6" stroke="#c8b89a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="font-display text-2xl text-ink-primary mb-2">Message sent</h3>
              <p className="font-body text-sm text-ink-secondary">Thanks for reaching out. I&apos;ll be in touch soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { id: 'name', label: 'Your name', type: 'text', placeholder: 'Jane Smith' },
                { id: 'email', label: 'Email address', type: 'email', placeholder: 'jane@company.com' },
              ].map((field) => (
                <div key={field.id}>
                  <label className="font-mono text-xs text-ink-muted block mb-2">{field.label}</label>
                  <input
                    type={field.type} required placeholder={field.placeholder}
                    value={form[field.id as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                    className="w-full bg-bg-card border border-bg-border rounded-xl px-4 py-3 text-sm text-ink-primary placeholder-ink-muted/60 font-body focus:outline-none focus:border-ink-muted/50 hover:border-ink-muted/30 transition-colors duration-200"
                  />
                </div>
              ))}
              <div>
                <label className="font-mono text-xs text-ink-muted block mb-2">Message</label>
                <textarea
                  required rows={5} placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-bg-card border border-bg-border rounded-xl px-4 py-3 text-sm text-ink-primary placeholder-ink-muted/60 font-body focus:outline-none focus:border-ink-muted/50 hover:border-ink-muted/30 transition-colors duration-200 resize-none"
                />
              </div>
              {error && <p className="font-mono text-xs text-red-400">{error}</p>}
              <Button size="lg" className="w-full justify-center" disabled={loading}>
                {loading ? 'Sending...' : 'Send message'}
              </Button>
            </form>
          )}
        </RevealItem>
      </div>

      <RevealItem delay={0.2}>
        <div className="mt-24 pt-8 border-t border-bg-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-ink-muted">© {new Date().getFullYear()} Abir Ahosan Ratul. All rights reserved.</p>
          <p className="font-mono text-xs text-ink-muted">Built with curiosity & coffee.</p>
        </div>
      </RevealItem>
    </section>
  );
}