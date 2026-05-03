import {useEffect, useRef, useState} from 'react';
import {Link} from 'react-router';
import {cn} from '~/lib/cn';

/**
 * RUDE hero. The dailyrude.com landing imagery already has "RUDE" and
 * "Electrolytes & Creatine" baked into the JPG, so we deliberately do NOT
 * stack a competing display headline on top of it. We let the image carry
 * the brand identity, and add only:
 *   - a tagline (right under the image's hard-set text, in the lower band),
 *   - two CTAs sitting on the bottom grass band (the natural empty area),
 *   - a thin brand-claims strip pinned to the very bottom.
 *
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function Hero({t, locale}) {
  const isHe = locale === 'he';
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setIntroDone(true), 60);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section
      className="relative isolate flex min-h-[88svh] flex-col justify-end overflow-hidden bg-rude-ink text-rude-cream md:min-h-[92svh]"
      aria-label="hero"
    >
      {/* Background imagery — wide landscape on tablet+, portrait on phones.
          object-position keeps the "RUDE" wordmark (top-left on the wide
          asset, top-center on the mobile asset) anchored in view rather
          than getting cropped by `object-cover`. */}
      <picture className="pointer-events-none absolute inset-0 -z-10">
        <source
          srcSet="/images/landing-page-wide.jpg"
          media="(min-width: 768px)"
        />
        <img
          src="/images/landing-page-mobile.jpg"
          alt="RUDE — electrolytes & creatine"
          className={cn(
            'h-full w-full object-cover object-[center_top] transition-[opacity,transform] duration-1000 md:object-[left_top]',
            introDone ? 'opacity-100 scale-100' : 'opacity-90 scale-[1.04]',
          )}
          style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
          fetchPriority="high"
        />
      </picture>

      {/* Bottom-only legibility wash — image breathes at the top so the
          baked-in "RUDE" wordmark reads cleanly; copy below sits on a
          progressively darker base. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[50%]"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.25) 45%, rgba(10,10,10,0.78) 100%)',
        }}
        aria-hidden
      />

      {/* Content — sits in the lower band, on the empty grass area. */}
      <div className="container-rude relative z-10 pb-24 md:pb-28">
        <p
          className={cn(
            'max-w-xl text-balance text-body-lg text-rude-cream/95 transition-all duration-700',
            isHe && 'font-hebrew',
            introDone ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
          style={{transitionDelay: '180ms'}}
        >
          {t.hero.tagline}
        </p>

        <div
          className={cn(
            'mt-7 flex flex-col items-stretch gap-3 transition-all duration-700 sm:flex-row sm:items-center sm:gap-4',
            introDone ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
          style={{transitionDelay: '320ms'}}
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
            className="btn-rude justify-center border border-rude-cream/40 bg-rude-cream/10 text-rude-cream backdrop-blur-md hover:bg-rude-cream hover:text-rude-ink"
          >
            {t.hero.ctaSecondary}
          </Link>
        </div>
      </div>

      {/* Brand claims strip — minimal, pinned to bottom edge */}
      <div
        className={cn(
          'relative z-10 border-t border-rude-cream/15 bg-rude-ink/50 backdrop-blur-md transition-all duration-700',
          introDone ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        )}
        style={{transitionDelay: '480ms'}}
      >
        <div className="container-rude flex items-center justify-between gap-4 py-3 text-rude-cream/85 md:py-4">
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
      <span className="size-1.5 rounded-full bg-rude-pink" aria-hidden />
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
