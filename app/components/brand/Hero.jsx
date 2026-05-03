import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router';
import {cn} from '~/lib/cn';

/**
 * Cinematic full-bleed hero with looping video, animated knockout typography
 * and parallax. Falls back to a still image on mobile/poor connections.
 *
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function Hero({t, locale}) {
  const isHe = locale === 'he';
  const ref = useRef(null);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setIntroDone(true), 50);
    return () => window.clearTimeout(id);
  }, []);

  // Scroll-driven parallax for the headline
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, -rect.top / (rect.height || 1)),
      );
      el.style.setProperty('--p', String(progress));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={ref}
      className={cn(
        'relative isolate flex min-h-[100svh] items-end overflow-hidden bg-rude-ink text-rude-cream',
      )}
      aria-label="hero"
    >
      {/* Background media */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <video
          className={cn(
            'h-full w-full object-cover transition-opacity duration-1000',
            introDone ? 'opacity-90' : 'opacity-0',
          )}
          autoPlay
          muted
          loop
          playsInline
          poster="/images/rude-hero-desktop.jpg"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Color wash + grain */}
        <div className="absolute inset-0 bg-gradient-to-b from-rude-ink/30 via-rude-ink/10 to-rude-ink/80" />
        <div
          className="absolute inset-0 bg-noise-texture opacity-[0.08] mix-blend-overlay"
          aria-hidden
        />
        <div
          className="absolute inset-0 mix-blend-color"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, rgba(255,30,122,0.35) 0%, rgba(129,26,53,0.25) 35%, transparent 70%)',
          }}
          aria-hidden
        />
      </div>

      {/* Top metadata strip — wraps on tiny screens */}
      <div className="absolute inset-x-0 top-0 z-10 pt-20 md:pt-28">
        <div className="container-rude flex flex-wrap items-center justify-between gap-2 text-rude-cream/70">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] md:text-micro md:tracking-[0.22em]">
            {locale === 'he' ? 'פרק 01 ✦ הקסם הישראלי' : 'CHAPTER 01 ✦ THE ISRAELI EDGE'}
          </span>
          <span className="hidden font-mono text-micro uppercase tracking-[0.22em] md:inline">
            {locale === 'he' ? 'תל אביב · 32.07°N' : 'TEL AVIV · 32.07°N'}
          </span>
        </div>
      </div>

      {/* Headline */}
      <div className="container-rude relative z-10 pb-20 pt-4 md:pb-24">
        <p
          className={cn(
            'mb-6 font-mono text-micro uppercase tracking-[0.22em] text-rude-cream/70 transition-all duration-700',
            introDone
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0',
          )}
          style={{transitionDelay: '120ms'}}
        >
          {t.hero.eyebrow}
        </p>

        <h1
          className="display-text text-rude-cream"
          style={{
            transform:
              'translateY(calc(var(--p, 0) * -8%))',
            willChange: 'transform',
          }}
        >
          <SplitLine
            text={t.hero.titleLine1}
            visible={introDone}
            delay={0}
            className="block text-display-2xl"
          />
          <SplitLine
            text={t.hero.titleLine2}
            visible={introDone}
            delay={140}
            className={cn(
              'block text-display-3xl',
              'bg-gradient-to-br from-rude-pink via-rude-cherry to-rude-berry bg-clip-text text-transparent',
            )}
            italic
          />
        </h1>

        <p
          className={cn(
            'mt-8 max-w-xl font-sans text-body-lg text-rude-cream/80 transition-all duration-700',
            isHe && 'font-hebrew',
            introDone
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0',
          )}
          style={{transitionDelay: '420ms'}}
        >
          {t.hero.tagline}
        </p>

        <div
          className={cn(
            'mt-10 flex flex-col items-start gap-3 transition-all duration-700 sm:flex-row sm:items-center sm:gap-4',
            introDone
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0',
          )}
          style={{transitionDelay: '560ms'}}
        >
          <Link
            to="/collections/all"
            prefetch="intent"
            className="btn-rude-neon group"
          >
            {t.hero.ctaPrimary}
            <ArrowRight className="ms-1 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
          <Link
            to="/pages/story"
            prefetch="intent"
            className="btn-rude border border-rude-cream/30 text-rude-cream backdrop-blur-md hover:bg-rude-cream hover:text-rude-ink"
          >
            <PlayDot />
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <div
          className={cn(
            'flex flex-col items-center gap-2 font-mono text-micro uppercase tracking-[0.22em] text-rude-cream/60 transition-opacity duration-1000',
            introDone ? 'opacity-100' : 'opacity-0',
          )}
        >
          <span>{locale === 'he' ? 'גלגלו' : 'Scroll'}</span>
          <span className="h-10 w-px animate-pulse bg-rude-cream/40" />
        </div>
      </div>
    </section>
  );
}

/** Per-letter staggered split. */
function SplitLine({text, visible, delay, className, italic}) {
  const chars = Array.from(text);
  return (
    <span className={cn('block overflow-hidden', italic && 'italic', className)}>
      <span className="inline-flex">
        {chars.map((c, i) => (
          <span
            key={i}
            className={cn(
              'inline-block transition-[transform,opacity] duration-700',
              visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
            )}
            style={{
              transitionDelay: `${delay + i * 28}ms`,
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              whiteSpace: c === ' ' ? 'pre' : undefined,
            }}
          >
            {c === ' ' ? ' ' : c}
          </span>
        ))}
      </span>
    </span>
  );
}

function ArrowRight({className}) {
  return (
    <svg
      width="18"
      height="14"
      viewBox="0 0 18 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M1 7h15.5" />
      <path d="m11 1.5 5.5 5.5-5.5 5.5" />
    </svg>
  );
}

function PlayDot() {
  return (
    <span className="relative flex size-3">
      <span className="absolute inset-0 animate-ping rounded-full bg-rude-neon opacity-60" />
      <span className="relative size-3 rounded-full bg-rude-neon" />
    </span>
  );
}
