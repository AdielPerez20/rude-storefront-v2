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
  const isHe = locale === 'he';
  return (
    <section className="relative isolate flex min-h-[60vh] items-center overflow-hidden bg-rude-ink py-section text-rude-cream">
      <img
        src="/images/rude-tennis-raining.jpg"
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover object-top opacity-50"
        loading="lazy"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(90deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 100%)',
        }}
        aria-hidden
      />

      <div className="container-rude w-full text-center">
        <Reveal>
          <h2
            className={cn(
              'display-text text-display-2xl text-rude-cream',
              isHe && 'font-hebrew',
            )}
          >
            {t.finalCta.title}
          </h2>
          <p className="font-display text-display-3xl italic text-rude-pink">
            {t.finalCta.titleAccent}
          </p>
        </Reveal>
        <Reveal delay={1}>
          <Link
            to="/collections/all"
            prefetch="intent"
            className="btn-rude-neon mt-10"
          >
            {t.finalCta.cta}
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
      className="rtl:rotate-180"
    >
      <path d="M1 7h15.5" />
      <path d="m11 1.5 5.5 5.5-5.5 5.5" />
    </svg>
  );
}
