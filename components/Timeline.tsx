'use client';

import { motion } from 'framer-motion';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const TIMELINE = [
  { type: 'education', period: 'Nov 21, 2026', role: 'CCNA: Introduction to Networks', org: 'Cisco Networking Academy · AIUB', description: 'Completed the Cisco Networking Academy course CCNA: Introduction to Networks through AIUB and earned a verified course-completion credential. This is a course-completion credential, not the full CCNA professional certification.' },
  { type: 'education', period: '2023 — Present', role: 'BSc in Computer Science & Engineering', org: 'American International University-Bangladesh (AIUB)', description: 'Currently in my final semester. Coursework includes programming, data structures, algorithms, databases, and software engineering, alongside Computer Networks, Advanced Computer Networks, and Network Security.' },
  { type: 'education', period: 'Jun 11, 2023', role: 'IT Essentials: PC Hardware and Software', org: 'Cisco Networking Academy', description: 'Completed the Cisco Networking Academy IT Essentials course, earning a verified course-completion credential. This is a course-completion credential, not the full CCNA professional certification.' },
  { type: 'work', period: '2023', role: 'First GitHub Commit', org: 'github.com/abirahosan', description: 'Started sharing code publicly on GitHub. Learning version control, open source practices, and building a portfolio of projects one repository at a time.' },
  { type: 'education', period: '2022', role: 'Higher Secondary Certificate (HSC)', org: 'Narail, Bangladesh', description: 'Completed HSC from Narail. Developed an early interest in computers and technology, which led to pursuing a CSE degree.' },
];

function TimelineItem({ item, index }: { item: typeof TIMELINE[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      className="relative pl-12 md:pl-16 pb-10 last:pb-0"
      initial={{ opacity: 0, x: -24 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.65, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={`absolute left-[13px] md:left-[21px] top-[22px] w-3 h-3 rounded-full border-2 ${
        item.type === 'work' ? 'bg-ink-accent border-ink-accent' : 'bg-bg-base border-ink-muted'
      }`} />
      <div className="bg-bg-card border border-bg-border rounded-2xl p-5 md:p-6 hover:border-ink-muted/30 transition-colors duration-300">
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="font-body text-base font-medium text-ink-primary">{item.role}</h3>
            <p className="font-display text-sm italic text-ink-accent mt-0.5">{item.org}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-mono text-xs px-2.5 py-1 rounded-full border ${
              item.type === 'work' ? 'text-ink-accent border-ink-accent/20 bg-ink-accent/5' : 'text-ink-muted border-bg-border bg-bg-elevated'
            }`}>{item.type === 'work' ? 'Project' : 'Education'}</span>
            <span className="font-mono text-xs text-ink-muted">{item.period}</span>
          </div>
        </div>
        <p className="font-body text-sm text-ink-secondary leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const { ref, isVisible } = useScrollReveal(0.4);

  return (
    <section id="timeline" className="py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
      <motion.div
        ref={ref as React.Ref<HTMLDivElement>}
        initial={{ opacity: 0, y: 24 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-14"
      >
        <p className="section-label mb-3">Background</p>
        <h2 className="section-title">
          Journey & <span className="font-display italic text-ink-accent">Education</span>
        </h2>
      </motion.div>
      <div className="relative">
        <div className="absolute left-4 md:left-6 top-2 bottom-2 w-px bg-bg-border" />
        <div className="space-y-0">
          {TIMELINE.map((item, i) => <TimelineItem key={i} item={item} index={i} />)}
        </div>
      </div>
    </section>
  );
}
