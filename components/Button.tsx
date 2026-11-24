'use client';

import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  external?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
  external,
  disabled,
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 font-body font-medium tracking-wide rounded-full transition-all duration-300 cursor-pointer select-none';

  const variants = {
    primary:
      'bg-ink-primary text-bg-base hover:bg-ink-accent shadow-[0_1px_20px_rgba(240,237,232,0.08)] hover:shadow-[0_1px_30px_rgba(200,184,154,0.18)]',
    ghost:
      'text-ink-secondary hover:text-ink-primary hover:bg-bg-elevated',
    outline:
      'border border-bg-border text-ink-secondary hover:border-ink-muted hover:text-ink-primary bg-bg-elevated',
  };

  const sizes = {
    sm: 'text-xs px-4 py-2',
    md: 'text-sm px-6 py-3',
    lg: 'text-base px-8 py-4',
  };

  const classes = clsx(base, variants[variant], sizes[size], className);

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 20 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={classes}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} className={classes} disabled={disabled} {...motionProps}>
      {children}
    </motion.button>
  );
}
