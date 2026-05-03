import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {cn} from '~/lib/cn';

/**
 * RUDE hero with two distinct treatments:
 *
 * - **Mobile**: image renders at its natural aspect ratio (no crop), then
 *   tagline + CTAs + brand-claims sit in a dedicated dark band beneath it.
 *   Nothing overlays the image, so the baked-in "RUDE" wordmark is fully
 *   visible.
 * - **Desktop (md+)**: full-bleed cover image with overlay copy on the
 *   bottom band, anchored to the empty grass area of the wide asset.
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
      className="relative isolate flex flex-col bg-rude-ink text-rude-cream md:min-h-[92svh] md:justify-end md:overflow-hidden"
      aria-label="hero"
    >
      {/* ── Mobile: full-bleed image at natural ratio ───────────────────── */}
      <div className="relative md:hidden">
        <img
          src="/images/landing-page-mobile.jpg"
          alt="RUDE — electrolytes & creatine"
          className={cn(
            'block h-auto w-full transition-[opacity,transform] duration-1000',
            introDone ? 'opacity-100 scale-100' : 'opacity-90 scale-[1.03]',
          )}
          style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
          fetchPriority="high"
        />
      </div>

      {/* ── Desktop: full-bleed cover image + bottom legibility wash ──── */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        <img
          src="/images/landing-page-wide.jpg"
          alt=""
          className={cn(
            'h-full w-full object-cover object-[left_top] transition-[opacity,transform] duration-1000',
            introDone ? 'opacity-100 scale-100' : 'opacity-90 scale-[1.04]',
          )}
          style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
          fetchPriority="high"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[55%]"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.25) 45%, rgba(10,10,10,0.78) 100%)',
          }}
          aria-hidden
        />
      </div>

      {/* ── Content band (mobile = below image, desktop = overlay) ─────── */}
      <div className="container-rude relative z-10 pb-10 pt-10 md:pb-28 md:pt-32">
        <p
          className={cn(
            'max-w-xl text-balance text-body text-rude-cream/90 transition-all duration-700 md:text-body-lg md:text-rude-cream/95',
            isHe && 'font-hebrew',
            introDone ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
          style={{transitionDelay: '180ms'}}
        >
          {t.hero.tagline}
        </p>

        <div
          className={cn(
            'mt-6 flex flex-col items-stretch gap-3 transition-all duration-700 sm:flex-row sm:items-center sm:gap-4 md:mt-7',
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

      {/* ── Brand-claims strip ───────────────────────────────────────────── */}
      <div
        className={cn(
          'relative z-10 border-t border-rude-cream/15 bg-rude-ink/50 backdrop-blur-md transition-all duration-700',
          introDone ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
        )}
        style={{transitionDelay: '480ms'}}
      >
        <div className="container-rude flex flex-wrap items-center justify-between gap-3 py-3 text-rude-cream/85 md:py-4">
          <BrandClaim>
            {locale === 'he' ? 'ללא סוכר' : 'No sugar'}
          </BrandClaim>
          <span
            className="hidden h-3 w-px bg-rude-cream/20 sm:block"
            aria-hidden
          />
          <BrandClaim className="hidden sm:inline-flex">
            {locale === 'he' ? 'רכיבים טבעיים' : 'Natural ingredients'}
          </BrandClaim>
          <span
            className="hidden h-3 w-px bg-rude-cream/20 sm:block"
            aria-hidden
          />
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
