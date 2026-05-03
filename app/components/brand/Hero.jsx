import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {cn} from '~/lib/cn';

/**
 * RUDE hero — image-first. The dailyrude.com landing imagery already
 * carries the wordmark, the subtitle, and the editorial mood, so the
 * only chrome the hero adds on top is two CTAs anchored to the bottom
 * of the image. No tagline, no claims strip — those live in the
 * marquee section that immediately follows.
 *
 * - **Mobile**: the portrait asset renders at its natural aspect ratio
 *   (no crop, fully visible). CTAs sit on the bottom edge of the image.
 * - **Desktop**: full-bleed cover; CTAs sit on the empty grass band at
 *   the bottom of the wide asset.
 *
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function Hero({t, locale}) {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setIntroDone(true), 60);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <section
      className="relative isolate flex flex-col overflow-hidden bg-rude-ink text-rude-cream md:min-h-[92svh] md:justify-end"
      aria-label="hero"
    >
      {/* ── Mobile: full-bleed image at natural ratio ─────────────────── */}
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

        {/* Bottom soft wash for legibility under the CTAs only */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.7) 100%)',
          }}
          aria-hidden
        />

        {/* CTAs anchored to the bottom of the mobile image */}
        <div
          className={cn(
            'absolute inset-x-0 bottom-0 z-10 px-5 pb-7 transition-all duration-700 sm:px-8',
            introDone ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          )}
          style={{transitionDelay: '320ms'}}
        >
          <div className="flex flex-col items-stretch gap-3">
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
      </div>

      {/* ── Desktop: full-bleed cover image + bottom legibility wash ─── */}
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
          className="absolute inset-x-0 bottom-0 h-[40%]"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.55) 100%)',
          }}
          aria-hidden
        />
      </div>

      {/* Desktop CTA band at the bottom of the hero */}
      <div className="container-rude relative z-10 hidden pb-12 md:block">
        <div
          className={cn(
            'flex flex-row items-center gap-4 transition-all duration-700',
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
    </section>
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
