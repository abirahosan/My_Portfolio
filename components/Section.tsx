'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { clsx } from 'clsx';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  label?: string;
  title?: string;
  titleItalic?: string;
  noPadding?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function SectionItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}

export default function Section({
  id,
  children,
  className,
  label,
  title,
  titleItalic,
  noPadding,
}: SectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <section
      id={id}
      ref={ref}
      className={clsx(!noPadding && 'py-24 md:py-32 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto', className)}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {(label || title) && (
          <motion.div variants={itemVariants} className="mb-12 md:mb-16">
            {label && <p className="section-label mb-3">{label}</p>}
            {title && (
              <h2 className="section-title">
                {title}
                {titleItalic && (
                  <span className="font-display italic text-ink-accent"> {titleItalic}</span>
                )}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </motion.div>
    </section>
  );
}
