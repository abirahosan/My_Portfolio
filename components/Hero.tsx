'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Button from './Button';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

const NAV_ITEMS = [
  { label: 'About',    href: '#about' },
  { label: 'Work',     href: '#work' },
  { label: 'Skills',   href: '#skills' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Contact',  href: '#contact' },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [sceneScroll, setSceneScroll] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const rawProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scrollProgress = useSpring(rawProgress, { stiffness: 60, damping: 20 });

  useMotionValueEvent(scrollProgress, 'change', (v) => setSceneScroll(v));

  const textY       = useTransform(scrollYProgress, [0, 0.6], [0, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const photoY      = useTransform(scrollYProgress, [0, 0.6], [0, -30]);
  const photoOpacity= useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={heroRef} className="relative min-h-[120vh]">

      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-5">
          <motion.a href="#" className="font-display text-lg text-ink-primary tracking-tight" whileHover={{ scale: 1.04 }}>
            AAR
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="font-body text-sm text-ink-muted hover:text-ink-primary px-3 py-2 rounded-full hover:bg-bg-elevated transition-all duration-200"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} transition={{ duration: 0.2 }} className="block w-6 h-px bg-ink-primary origin-center" />
            <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} transition={{ duration: 0.2 }} className="block w-6 h-px bg-ink-primary" />
            <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} transition={{ duration: 0.2 }} className="block w-6 h-px bg-ink-primary origin-center" />
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-bg-card border border-bg-border rounded-2xl mb-4 p-3 flex flex-col gap-1"
            >
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-body text-sm text-ink-muted hover:text-ink-primary px-4 py-3 rounded-xl hover:bg-bg-elevated transition-all duration-200"
                >
                  {item.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Sticky hero frame */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">

        <div className="absolute inset-0">
          <Scene scrollProgress={sceneScroll} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg-base to-transparent pointer-events-none z-10" />

        <div className="relative z-20 w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-20 items-start min-h-screen pt-20 pb-4">

            {/* Left — identity */}
            <motion.div style={{ y: textY, opacity: textOpacity }} className="flex flex-col">
              <motion.p
                className="section-label mb-4 md:mb-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                Aspiring Network Engineer
              </motion.p>

              <motion.h1
                className="font-display text-5xl md:text-5xl lg:text-7xl xl:text-8xl leading-[1.02] tracking-tight mb-6 md:mb-8"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="text-ink-primary">Abir</span>
                <br />
                <span className="font-display italic text-ink-accent">Ahosan Ratul</span>
              </motion.h1>

              <motion.p
                className="font-body text-base md:text-lg text-ink-secondary leading-relaxed max-w-md mb-8 md:mb-10"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                Computer Science &amp; Engineering student passionate about computer networking,
                network infrastructure, routing, switching, and network security. Currently
                pursuing CCNA studies and developing practical networking skills.
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <Button href="#work" size="lg">View Projects</Button>
                <Button href="#contact" variant="outline" size="lg">Get in touch</Button>
              </motion.div>

              <motion.div
                className="flex items-center gap-6 mt-10 md:mt-14 pt-8 md:pt-10 border-t border-bg-border"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.1 }}
              >
                {[['CSE', 'Final Semester'], ['Network', 'Engineering Goal'], ['Dhaka', 'Bangladesh']].map(
                  ([num, label]) => (
                    <div key={label} className="flex flex-col">
                      <span className="font-display text-2xl text-ink-primary">{num}</span>
                      <span className="font-mono text-xs text-ink-muted mt-0.5">{label}</span>
                    </div>
                  )
                )}
              </motion.div>
            </motion.div>

            {/* Right — photo card */}
            <motion.div
              style={{ y: photoY, opacity: photoOpacity }}
              className="flex flex-col items-center md:items-end gap-2"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className="relative w-44 md:w-64 lg:w-80 xl:w-96 aspect-[3/4] bg-bg-card rounded-3xl border border-bg-border overflow-hidden"
                style={{ boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)' }}
              >
                <img
                  src="/profile.jpg"
                  alt="Abir Ahosan Ratul"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center z-10">
                  <p className="font-display text-sm text-ink-accent italic mb-1">Open to opportunities</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs text-ink-muted">Looking for internships</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-ink-accent/30 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-ink-accent/30 rounded-bl-lg" />
              </div>

              <motion.div
                className="mt-4 self-start bg-bg-card border border-bg-border rounded-2xl px-4 py-3 shadow-xl"
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-mono text-xs text-ink-muted">Currently at</p>
                <p className="font-body text-sm font-medium text-ink-primary mt-0.5">American International University Bangladesh</p>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
        style={{ opacity: textOpacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="font-mono text-xs text-ink-muted tracking-widest">SCROLL</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-ink-muted to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}