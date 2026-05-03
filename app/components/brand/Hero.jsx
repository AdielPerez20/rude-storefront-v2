import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {cn} from '~/lib/cn';

/**
 * RUDE hero — image-first. The dailyrude.com landing imagery already
 * carries the wordmark, the subtitle, and the editorial mood, so the
 * only chrome the hero adds is two CTAs anchored to the bottom of the
 * image. No cropping: the asset always renders at its full natural
 * aspect ratio (portrait on phones, landscape on tablet+), and the
 * section height comes from the image itself rather than from
 * `min-h-[Nsvh]`.
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
      className="relative isolate overflow-hidden bg-rude-ink text-rude-cream"
      aria-label="hero"
    >
      {/* Image — always rendered at its natural aspect ratio. The mobile
          (portrait) source kicks in below 768px, the wide source from
          768px up. `block h-auto w-full` keeps the asset uncropped. */}
      <picture>
        <source
          srcSet="/images/landing-page-wide.jpg"
          media="(min-width: 768px)"
        />
        <img
          src="/images/landing-page-mobile.jpg"
          alt="RUDE — electrolytes & creatine"
          className={cn(
            'block h-auto w-full transition-[opacity,transform] duration-1000',
            introDone ? 'opacity-100 scale-100' : 'opacity-90 scale-[1.02]',
          )}
          style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
          fetchPriority="high"
        />
      </picture>

      {/* Bottom legibility wash — only over the bottom band where the
          CTAs sit, so the top of the image (heads, RUDE wordmark) stays
          fully visible. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[35%] sm:h-[28%]"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(10,10,10,0.78) 100%)',
        }}
        aria-hidden
      />

      {/* CTAs anchored to the bottom of the image */}
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 z-10 px-5 pb-6 transition-all duration-700 sm:px-8 md:pb-10',
          introDone ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
        )}
        style={{transitionDelay: '320ms'}}
      >
        <div className="container-rude !px-0 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
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
