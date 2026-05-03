import {Link} from 'react-router';
import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

const TILES = [
  {
    handle: 'electrolytes',
    nameHe: 'אלקטרוליטים',
    nameEn: 'Electrolytes',
    image: '/images/flavor-pomegranate-texture.jpg',
    bg: 'bg-rude-pink',
    fg: 'text-rude-cream',
  },
  {
    handle: 'creatine',
    nameHe: 'קריאטין',
    nameEn: 'Creatine',
    image: '/images/rude-creatine-tennis.jpg',
    bg: 'bg-rude-bone',
    fg: 'text-rude-ink',
  },
  {
    handle: 'bundles',
    nameHe: 'באנדל זוגי',
    nameEn: 'Duo bundle',
    image: '/images/rude-hydration-summer.jpg',
    bg: 'bg-rude-ink',
    fg: 'text-rude-cream',
  },
];

/**
 * Top-of-fold product lineup — three big tiles (Electrolytes, Creatine,
 * Bundle). Replaces the v1 ProductsGridSection. Each tile is a Link to
 * `/collections/<handle>` so it works with mock.shop today and with a
 * real Shopify catalog later.
 *
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function ProductsLineup({t, locale}) {
  const isHe = locale === 'he';
  return (
    <section className="relative bg-rude-cream py-section text-rude-ink">
      <div className="container-rude">
        <Reveal className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="label-eyebrow">{t.productsLineup.eyebrow}</span>
            <h2 className="display-text mt-3 text-display-xl text-balance">
              {t.productsLineup.title}
            </h2>
          </div>
          <p
            className={cn(
              'max-w-md text-body-lg text-rude-ink/70',
              isHe && 'font-hebrew',
            )}
          >
            {t.productsLineup.sub}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3 md:gap-6">
          {TILES.map((tile, i) => (
            <Reveal key={tile.handle} delay={Math.min(i + 1, 4)}>
              <Link
                to={`/collections/${tile.handle}`}
                prefetch="intent"
                className={cn(
                  'group relative flex h-full flex-col overflow-hidden rounded-rude transition-transform duration-700',
                  'hover:-translate-y-1',
                  tile.bg,
                  tile.fg,
                )}
                style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
              >
                <figure className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={tile.image}
                    alt={isHe ? tile.nameHe : tile.nameEn}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.06]"
                    style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-rude-ink/60 via-rude-ink/0 to-transparent"
                    aria-hidden
                  />
                </figure>

                <div className="flex items-center justify-between gap-4 p-6 md:p-7">
                  <div>
                    <p className="font-mono text-micro uppercase tracking-[0.18em] opacity-70">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3
                      className={cn(
                        'mt-1 font-display text-3xl uppercase tracking-tight md:text-4xl',
                        isHe && 'font-hebrew',
                      )}
                    >
                      {isHe ? tile.nameHe : tile.nameEn}
                    </h3>
                  </div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-current transition-transform duration-500 group-hover:rotate-45">
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                      <path
                        d="M3 11L11 3M5 3h6v6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
