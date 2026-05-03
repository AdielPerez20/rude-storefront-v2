import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router';
import {cn} from '~/lib/cn';

/**
 * RUDE hero — full-bleed editorial. Uses the dailyrude.com landing imagery
 * (mobile portrait + wide landscape served via <picture>), with overlay copy
 * that mirrors the live site but elevates the typography, CTAs, and bottom
 * brand-claims strip.
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
    const id = window.setTimeout(() => setIntroDone(true), 60);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-rude-ink text-rude-cream md:min-h-[92svh]"
      aria-label="hero"
    >
      {/* Background imagery: mobile portrait + wide landscape via <picture> */}
      <picture className="pointer-events-none absolute inset-0 -z-10">
        <source
          srcSet="/images/landing-page-wide.jpg"
          media="(min-width: 768px)"
        />
        <img
          src="/images/landing-page-mobile.jpg"
          alt=""
          className={cn(
            'h-full w-full object-cover transition-[opacity,transform] duration-1000',
            introDone ? 'opacity-100 scale-100' : 'opacity-80 scale-[1.04]',
          )}
          style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
          fetchPriority="high"
        />
      </picture>

      {/* Overlay strategy: dark wash at the bottom for legibility, lighter at
          the top so the imagery breathes. RTL/LTR safe. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.05) 35%, rgba(10,10,10,0.55) 80%, rgba(10,10,10,0.85) 100%)',
        }}
        aria-hidden
      />

      {/* Content */}
      <div className="container-rude relative z-10 pb-24 pt-32 md:pb-28 md:pt-36">
        {/* Eyebrow — actual brand claims */}
        <p
          className={cn(
            'mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-rude-cream/85 transition-all duration-700 md:text-micro md:tracking-[0.22em]',
            introDone ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
          style={{transitionDelay: '120ms'}}
        >
          {t.hero.eyebrow}
        </p>

        {/* Headline — clean fade-up, no per-letter animation */}
        <h1 className="display-text leading-[0.88] text-rude-cream">
          <span
            className={cn(
              'block text-display-xl transition-all duration-1000',
              introDone ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
            )}
            style={{
              transitionDelay: '200ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {t.hero.titleLine1}
          </span>
          <span
            className={cn(
              'mt-1 block text-display-2xl italic transition-all duration-1000',
              introDone ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
              'bg-gradient-to-br from-rude-cream via-rude-pink-soft to-rude-pink bg-clip-text text-transparent',
            )}
            style={{
              transitionDelay: '320ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {t.hero.titleLine2}
          </span>
        </h1>

        {/* Tagline */}
        <p
          className={cn(
            'mt-7 max-w-xl text-balance text-body-lg text-rude-cream/85 transition-all duration-700',
            isHe && 'font-hebrew',
            introDone ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
          style={{transitionDelay: '480ms'}}
        >
          {t.hero.tagline}
        </p>

        {/* CTAs */}
        <div
          className={cn(
            'mt-10 flex flex-col items-stretch gap-3 transition-all duration-700 sm:flex-row sm:items-center sm:gap-4',
            introDone ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
          style={{transitionDelay: '620ms'}}
        >
          <Link
            to="/collections/all"
            prefetch="intent"
            className="btn-rude-neon group justify-center"
          >
            {t.hero.ctaPrimary}
            <ArrowRight className="ms-1 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180" />
          </Link>
          <Link
            to="/collections"
            prefetch="intent"
            className="btn-rude justify-center border border-rude-cream/30 bg-rude-cream/5 text-rude-cream backdrop-blur-md hover:bg-rude-cream hover:text-rude-ink"
          >
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </div>

      {/* Bottom brand claims strip — minimal, sits at the absolute bottom */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 z-10 border-t border-rude-cream/15 bg-rude-ink/30 backdrop-blur-md transition-all duration-700',
          introDone ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        )}
        style={{transitionDelay: '780ms'}}
      >
        <div className="container-rude flex items-center justify-between gap-4 py-3 text-rude-cream/80 md:py-4">
          <BrandClaim>
            {locale === 'he' ? 'ללא סוכר' : 'No sugar'}
          </BrandClaim>
          <span className="hidden h-3 w-px bg-rude-cream/20 sm:block" aria-hidden />
          <BrandClaim className="hidden sm:inline-flex">
            {locale === 'he' ? 'רכיבים טבעיים' : 'Natural ingredients'}
          </BrandClaim>
          <span className="hidden h-3 w-px bg-rude-cream/20 sm:block" aria-hidden />
          <BrandClaim>
            {locale === 'he' ? 'תוצרת ישראל' : 'Made in Israel'}
          </BrandClaim>
        </div>
      </div>
    </section>
  );
}

function BrandClaim({children, className}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] md:text-micro md:tracking-[0.22em]',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-rude-neon" aria-hidden />
      {children}
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
