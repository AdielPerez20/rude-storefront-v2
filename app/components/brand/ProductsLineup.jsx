import {useState} from 'react';
import {Link} from 'react-router';
import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

const TILES = [
  {
    handle: 'electrolytes',
    nameHe: 'אלקטרוליטים',
    nameEn: 'Electrolytes',
    metaHe: '20 סטיקים · 5 אלקטרוליטים',
    metaEn: '20 sticks · 5 electrolytes',
    image: '/images/flavor-pomegranate-texture.jpg',
    accent: '#FF1E7A',
  },
  {
    handle: 'creatine',
    nameHe: 'קריאטין',
    nameEn: 'Creatine',
    metaHe: 'מונוהידראט 100% · 30 מנות',
    metaEn: '100% monohydrate · 30 servings',
    image: '/images/rude-creatine-tennis.jpg',
    accent: '#1A6CC8',
  },
  {
    handle: 'bundles',
    nameHe: 'באנדלים',
    nameEn: 'Bundles',
    metaHe: 'חסכו עד 20%',
    metaEn: 'Save up to 20%',
    image: '/images/rude-hydration-summer.jpg',
    accent: '#DBFF00',
  },
];

/**
 * Compact, chip-driven product lineup. A horizontal selector chips row
 * swaps a single editorial preview tile, instead of stacking three tall
 * cards. Reads as a curated shelf rather than a catalogue dump.
 *
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function ProductsLineup({t, locale}) {
  const isHe = locale === 'he';
  const [active, setActive] = useState(0);
  const current = TILES[active];

  return (
    <section className="relative bg-rude-cream py-section-sm text-rude-ink md:py-section">
      <div className="container-rude">
        <Reveal className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end md:gap-6">
          <div>
            <span className="label-eyebrow">{t.productsLineup.eyebrow}</span>
            <h2 className="display-text mt-2 text-display-lg text-balance md:text-display-xl">
              {t.productsLineup.title}
            </h2>
          </div>
          <p
            className={cn(
              'max-w-sm text-body text-rude-ink/65',
              isHe && 'font-hebrew',
            )}
          >
            {t.productsLineup.sub}
          </p>
        </Reveal>

        {/* Chips row — picks the active product */}
        <Reveal delay={1} className="mt-8 flex flex-wrap gap-2">
          {TILES.map((tile, i) => (
            <button
              type="button"
              key={tile.handle}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={cn(
                'group relative inline-flex items-center gap-2 rounded-pill border px-4 py-2 font-mono text-micro uppercase tracking-[0.16em] transition-all duration-500',
                active === i
                  ? 'border-rude-ink bg-rude-ink text-rude-cream'
                  : 'border-rude-ink/15 text-rude-ink hover:border-rude-ink/40',
              )}
              style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
            >
              <span
                className="size-2 shrink-0 rounded-full transition-transform duration-500"
                style={{
                  backgroundColor: tile.accent,
                  transform: active === i ? 'scale(1.4)' : 'scale(1)',
                }}
                aria-hidden
              />
              {String(i + 1).padStart(2, '0')} · {isHe ? tile.nameHe : tile.nameEn}
            </button>
          ))}
        </Reveal>

        {/* Single editorial preview that cross-fades on selection */}
        <Reveal delay={2} className="mt-6">
          <Link
            to={`/collections/${current.handle}`}
            prefetch="intent"
            className={cn(
              'group relative block overflow-hidden rounded-rude transition-transform duration-700',
              'hover:-translate-y-0.5',
            )}
            style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
          >
            <div className="relative aspect-[5/4] sm:aspect-[16/9] md:aspect-[21/9]">
              {TILES.map((tile, i) => (
                <img
                  key={tile.handle}
                  src={tile.image}
                  alt={isHe ? tile.nameHe : tile.nameEn}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className={cn(
                    'absolute inset-0 size-full object-cover transition-all duration-1000',
                    active === i
                      ? 'scale-100 opacity-100'
                      : 'scale-[1.04] opacity-0',
                  )}
                  style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
                />
              ))}

              <div
                className="absolute inset-0 bg-gradient-to-t from-rude-ink/75 via-rude-ink/25 to-transparent"
                aria-hidden
              />

              {/* Foot row — name + meta + arrow */}
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-rude-cream md:p-7">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-rude-cream/70">
                    {isHe ? current.metaHe : current.metaEn}
                  </p>
                  <h3
                    className={cn(
                      'mt-1 font-display text-2xl uppercase tracking-tight md:text-3xl',
                      isHe && 'font-hebrew',
                    )}
                  >
                    {isHe ? current.nameHe : current.nameEn}
                  </h3>
                </div>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-rude-cream/40 bg-rude-cream/5 backdrop-blur-md transition-transform duration-500 group-hover:rotate-45 md:size-10">
                  <svg width="13" height="13" viewBox="0 0 14 14" aria-hidden>
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
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
