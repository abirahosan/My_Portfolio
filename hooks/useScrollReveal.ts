import { useEffect, useRef, useState } from 'react';

/**
 * Returns ref + isVisible. Only starts observing after client mount,
 * so SSR/hydration never pre-fires the animation.
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [mounted, threshold]);

  // Before mount: hidden. After mount: wait for intersection.
  return { ref, isVisible: mounted && isVisible };
}
