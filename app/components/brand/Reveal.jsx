import {useEffect, useRef} from 'react';
import {cn} from '~/lib/cn';

/**
 * Reveal-on-scroll wrapper using IntersectionObserver. SSR-safe.
 *
 * @param {{
 *   children: React.ReactNode,
 *   delay?: 0 | 1 | 2 | 3 | 4,
 *   className?: string,
 *   as?: keyof JSX.IntrinsicElements,
 *   once?: boolean,
 * }} props
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Component = 'div',
  once = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      {threshold: 0.12, rootMargin: '0px 0px -10% 0px'},
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return (
    <Component
      ref={ref}
      data-reveal=""
      data-reveal-delay={delay || undefined}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
