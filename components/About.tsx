'use client';

import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const TRAITS = [
  { label: 'Field of Interest', value: 'Computer Networking & Network Security' },
  { label: 'Approach', value: 'Curious, self-driven, project-based learning' },
  { label: 'University', value: 'American International University Bangladesh' },
  { label: 'Location', value: 'Dhaka, BD — Hometown: Narail' },
  { label: 'Languages', value: 'English, Hindi, Urdu — Conversational' },
];

const PARAGRAPHS = [
  "I am a Computer Science and Engineering student at American International University-Bangladesh (AIUB), aspiring to build a career as a Network Engineer.",
  "My primary interests include computer networking, network infrastructure, routing and switching, IP addressing, and network security. I enjoy understanding how networks operate, configuring network devices, and troubleshooting connectivity issues.",
  "I have completed Cisco Networking Academy's IT Essentials and CCNA: Introduction to Networks courses, earning verified course-completion credentials. I am currently continuing my CCNA studies to strengthen my technical knowledge and practical networking skills.",
  "I am continuously learning, exploring networking technologies, and working toward becoming a skilled Network Engineer.",
];

function RevealBlock({ children, delay = 0, direction = 'up' }: {
  children: React.ReactNode; delay?: number; direction?: 'up' | 'left' | 'right';
}) {
  const { ref, isVisible } = useScrollReveal(0.15);
  const initial = direction === 'up' ? { opacity: 0, y: 28 }
    : direction === 'left' ? { opacity: 0, x: -28 }
    : { opacity: 0, x: 28 };

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

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        <div>
          <RevealBlock direction="left">
            <p className="section-label mb-4">About</p>
            <h2 className="section-title mb-8">
              Driven by{' '}
              <span className="font-display italic text-ink-accent">networks</span>
            </h2>
          </RevealBlock>
          <div className="space-y-5 text-ink-secondary font-body leading-relaxed">
            {PARAGRAPHS.map((text, i) => (
              <RevealBlock key={i} delay={0.1 + i * 0.1} direction="left">
                <p>{text}</p>
              </RevealBlock>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {TRAITS.map((trait, i) => (
            <RevealBlock key={trait.label} delay={i * 0.09} direction="right">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-bg-card border border-bg-border rounded-xl px-5 py-4">
                <span className="font-mono text-xs text-ink-muted">{trait.label}</span>
                <span className="font-body text-sm text-ink-primary">{trait.value}</span>
              </div>
            </RevealBlock>
          ))}
          <RevealBlock delay={0.38} direction="right">
            <div className="mt-3 bg-bg-elevated border border-bg-border rounded-2xl p-6">
              <p className="font-display text-lg italic text-ink-secondary leading-relaxed">
                &ldquo;The network is the computer.&rdquo;
              </p>
              <p className="font-mono text-xs text-ink-muted mt-3">— John Gage, Sun Microsystems</p>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}
