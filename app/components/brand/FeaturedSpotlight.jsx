import {Link} from 'react-router';
import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

/**
 * Two-column "Introducing." spotlight used twice on the homepage —
 * once for Electrolytes (image-leading), once for Creatine (image
 * trailing on lg). Mirrors the editorial cadence dailyrude.com uses.
 *
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 *   data: 'featuredElectrolytes' | 'featuredCreatine',
 *   image: string,
 *   imageAlt: string,
 *   reverse?: boolean,
 *   bg?: string,
 *   accentColor?: string,
 * }} props
 */
export function FeaturedSpotlight({
  t,
  locale,
  data,
  image,
  imageAlt,
  reverse = false,
  bg = 'bg-rude-bone',
  accentColor = 'text-rude-pink',
}) {
  const isHe = locale === 'he';
  const d = t[data];

  return (
    <section
      className={cn(
        'relative overflow-hidden text-rude-ink',
        bg,
      )}
    >
      <div
        className={cn(
          'grid gap-0 lg:min-h-[88vh] lg:grid-cols-2',
          reverse && 'lg:[&>*:first-child]:order-2',
        )}
      >
        {/* Image panel */}
        <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-[1200ms] hover:scale-[1.04]"
            style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
          />
        </div>

        {/* Text panel */}
        <div className="container-rude flex flex-col justify-center py-section-sm lg:py-section">
          <Reveal>
            <span
              className={cn(
                'font-display text-2xl italic md:text-3xl',
                accentColor,
              )}
            >
              {d.kicker}
            </span>
            <h2
              className="display-text mt-2 text-display-xl leading-[0.92]"
              dir="ltr"
            >
              {d.titleA}
            </h2>
            <h2 className="display-text text-display-xl leading-[0.92]">
              {d.titleB}
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <p
              className={cn(
                'mt-6 max-w-md text-body-lg text-rude-ink/75 text-pretty',
                isHe && 'font-hebrew',
              )}
            >
              {d.desc}
            </p>
          </Reveal>

          <Reveal delay={2}>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {d.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.16em] text-rude-ink/80"
                >
                  <span className="size-2 shrink-0 rotate-45 bg-rude-pink" aria-hidden />
                  {bullet}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/collections/all"
                prefetch="intent"
                className="btn-rude-primary"
              >
                {d.ctaPrimary}
              </Link>
              <Link
                to="/pages/story"
                prefetch="intent"
                className="btn-rude-ghost"
              >
                {d.ctaSecondary}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
