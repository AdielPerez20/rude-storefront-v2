import {Link} from 'react-router';
import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

/**
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function FinalCTA({t, locale}) {
  return (
    <section className="relative isolate overflow-hidden bg-rude-ink py-section text-rude-cream">
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/rude-hero-mobile.jpg"
          alt=""
          className="size-full object-cover opacity-30"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,30,122,0.4) 0%, rgba(10,10,10,0.95) 65%)',
          }}
          aria-hidden
        />
      </div>

      <div className="container-rude flex flex-col items-center gap-8 text-center">
        <Reveal>
          <span className="label-eyebrow !text-rude-neon">
            {locale === 'he' ? '08 / סוף' : '08 / END'}
          </span>
        </Reveal>
        <Reveal delay={1}>
          <h2 className={cn('display-text text-display-3xl text-balance leading-none')}>
            {t.sections.finalCta.title}
          </h2>
          <p className="mt-4 font-display text-display-lg italic text-rude-pink">
            {t.sections.finalCta.subtitle}
          </p>
        </Reveal>
        <Reveal delay={2}>
          <Link to="/collections/all" prefetch="intent" className="btn-rude-neon mt-6">
            {t.sections.finalCta.cta}
            <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ArrowRight() {
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
    >
      <path d="M1 7h15.5" />
      <path d="m11 1.5 5.5 5.5-5.5 5.5" />
    </svg>
  );
}
