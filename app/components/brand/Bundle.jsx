import {Link} from 'react-router';
import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

/**
 * "Bundle up" — pricing-tier band with a highlighted "best" tier.
 *
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function Bundle({t, locale}) {
  const isHe = locale === 'he';
  return (
    <section className="relative bg-rude-cream py-section text-rude-ink">
      <div className="container-rude">
        <Reveal className="text-center">
          <h2 className="display-text text-display-xl text-balance">
            {t.bundle.title}
          </h2>
          <p
            className={cn(
              'mt-4 font-display text-display-lg italic text-rude-pink',
              isHe && 'font-hebrew',
            )}
          >
            {t.bundle.sub}
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.bundle.tiers.map((tier, i) => (
            <Reveal as="li" key={tier.boxes} delay={Math.min(i + 1, 4)}>
              <article
                className={cn(
                  'group relative flex h-full flex-col items-center gap-4 rounded-rude border bg-rude-bone p-7 text-center transition-all duration-700',
                  tier.best
                    ? 'border-rude-pink bg-white shadow-[0_18px_45px_-25px_rgba(255,30,122,0.45)]'
                    : 'border-rude-ink/10 hover:border-rude-ink/30',
                )}
              >
                {tier.best ? (
                  <span className="absolute -top-3 rounded-pill bg-rude-pink px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-rude-cream">
                    {locale === 'he' ? 'הכי משתלם' : 'Best value'}
                  </span>
                ) : null}

                <span className="font-display text-display-xl leading-none">
                  ×{tier.boxes}
                </span>
                <span
                  className={cn(
                    'font-mono text-micro uppercase tracking-[0.18em] text-rude-ink/70',
                    isHe && 'font-hebrew',
                  )}
                >
                  {tier.label}
                </span>
                <span
                  className={cn(
                    'font-display text-2xl',
                    tier.save ? 'text-rude-pink' : 'text-rude-ink/40',
                  )}
                >
                  {tier.save ? `−${tier.save}` : '—'}
                </span>
              </article>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={4} className="mt-10 text-center">
          <Link
            to="/collections/bundles"
            prefetch="intent"
            className="btn-rude-primary"
          >
            {t.bundle.cta}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
