import {Link} from 'react-router';
import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

/**
 * "Never run out" — subscription pitch on a deep berry tone with a
 * three-perk row.
 *
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function Subscription({t, locale}) {
  const isHe = locale === 'he';
  return (
    <section className="relative overflow-hidden bg-rude-berry py-section text-rude-cream">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 30% 20%, rgba(255,30,122,0.35) 0%, transparent 60%)',
        }}
        aria-hidden
      />
      <div className="container-rude">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="display-text text-display-2xl text-balance">
              {t.subscription.title}
            </h2>
            <p
              className={cn(
                'mt-4 font-display text-display-lg italic text-rude-pink',
                isHe && 'font-hebrew',
              )}
            >
              {t.subscription.sub}
            </p>
            <p
              className={cn(
                'mt-6 max-w-xl text-body-lg text-rude-cream/80',
                isHe && 'font-hebrew',
              )}
            >
              {t.subscription.desc}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={1}>
            <ul className="grid gap-3">
              {t.subscription.benefits.map((b) => (
                <li
                  key={b}
                  className="flex items-center gap-3 rounded-rude border border-rude-cream/15 bg-rude-cream/5 px-5 py-4 font-mono text-caption uppercase tracking-[0.16em] text-rude-cream backdrop-blur-md"
                >
                  <span className="size-2 shrink-0 rotate-45 bg-rude-pink" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              to="/collections/all?subscribe=1"
              prefetch="intent"
              className="btn-rude-neon mt-6 w-full justify-center"
            >
              {t.subscription.cta}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
