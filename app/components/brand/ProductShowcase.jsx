import {useState} from 'react';
import {Link} from 'react-router';
import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

const FLAVOURS = [
  {
    handle: 'lemon',
    nameHe: 'לימון מטורף',
    nameEn: 'Wild Lemon',
    image: '/images/flavor-lemon-texture.jpg',
    bg: '#DCE68D',
    accent: '#2D5A1E',
    text: '#1A1A1A',
    badge: 'No.01',
  },
  {
    handle: 'lime',
    nameHe: 'ליים שורק',
    nameEn: 'Sharp Lime',
    image: '/images/flavor-lime-macro.jpg',
    bg: '#DBFF00',
    accent: '#2D5A1E',
    text: '#0A0A0A',
    badge: 'No.02',
  },
  {
    handle: 'pomegranate',
    nameHe: 'רימון רגוע',
    nameEn: 'Punk Pomegranate',
    image: '/images/flavor-pomegranate-texture.jpg',
    bg: '#FF1E7A',
    accent: '#811A35',
    text: '#0A0A0A',
    badge: 'No.03',
  },
  {
    handle: 'berry',
    nameHe: 'פירות יער מיובאים',
    nameEn: 'Imported Berries',
    image: '/images/hero-berry-bg.jpg',
    bg: '#811A35',
    accent: '#FF1E7A',
    text: '#F5F2EC',
    badge: 'No.04',
  },
];

/**
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function ProductShowcase({t, locale}) {
  const isHe = locale === 'he';
  const [active, setActive] = useState(2);
  const current = FLAVOURS[active];

  return (
    <section
      className="relative overflow-hidden py-section transition-colors duration-1000"
      style={{
        backgroundColor: current.bg,
        color: current.text,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay bg-noise-texture"
        aria-hidden
      />

      <div className="container-rude grid gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Heading */}
        <Reveal className="lg:col-span-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span
                className="font-mono text-micro uppercase tracking-[0.18em]"
                style={{color: current.accent}}
              >
                {t.sections.products.eyebrow}
              </span>
              <h2 className="display-text mt-4 text-display-2xl text-balance">
                {t.sections.products.title}
              </h2>
            </div>
            <p
              className={cn(
                'max-w-md text-body-lg opacity-80',
                isHe && 'font-hebrew',
              )}
            >
              {t.sections.products.sub}
            </p>
          </div>
        </Reveal>

        {/* Flavour selector — 2x2 on mobile, vertical stack on desktop */}
        <Reveal className="lg:col-span-4 lg:col-start-1" delay={1}>
          <div className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-2">
            {FLAVOURS.map((f, i) => (
              <button
                key={f.handle}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  'group flex w-full items-center justify-between gap-3 rounded-rude border px-4 py-3 text-left transition-all duration-500 lg:px-5 lg:py-4',
                  active === i
                    ? 'border-current bg-rude-ink/10'
                    : 'border-current/20 hover:border-current/60',
                )}
                style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
              >
                <span className="flex min-w-0 flex-col items-start gap-1 lg:flex-row lg:items-center lg:gap-4">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.16em] lg:text-micro lg:tracking-[0.18em]"
                    style={{color: current.accent}}
                  >
                    {f.badge}
                  </span>
                  <span className="truncate font-display text-lg uppercase lg:text-2xl">
                    {isHe ? f.nameHe : f.nameEn}
                  </span>
                </span>
                <svg
                  width="22"
                  height="14"
                  viewBox="0 0 22 14"
                  fill="none"
                  className={cn(
                    'shrink-0 transition-transform duration-500',
                    active === i ? 'translate-x-1' : 'translate-x-0',
                    'group-hover:translate-x-1',
                  )}
                  aria-hidden
                >
                  <path
                    d="M1 7h19m-6-5.5L20 7l-5.5 5.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Big image */}
        <Reveal className="relative lg:col-span-8" delay={2}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-rude md:aspect-[3/4]">
            {FLAVOURS.map((f, i) => (
              <img
                key={f.handle}
                src={f.image}
                alt={isHe ? f.nameHe : f.nameEn}
                loading={i === 0 ? 'eager' : 'lazy'}
                className={cn(
                  'absolute inset-0 size-full object-cover transition-all duration-1000',
                  active === i
                    ? 'scale-100 opacity-100'
                    : 'scale-110 opacity-0',
                )}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              />
            ))}

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 50%, ${current.bg}88 100%)`,
              }}
              aria-hidden
            />

            {/* Overlay number */}
            <div className="absolute end-6 top-6">
              <span
                className="font-display text-display-xl leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
                style={{color: current.text}}
              >
                {String(active + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Bottom CTA */}
            <div className="absolute bottom-6 start-6 end-6 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p
                  className="font-mono text-micro uppercase tracking-[0.18em]"
                  style={{color: current.text}}
                >
                  {locale === 'he' ? 'טעם נבחר' : 'Selected flavour'}
                </p>
                <h3 className="font-display text-3xl uppercase md:text-5xl">
                  {isHe ? current.nameHe : current.nameEn}
                </h3>
              </div>
              <Link
                to={`/products/${current.handle}`}
                prefetch="intent"
                className="btn-rude bg-rude-ink text-rude-cream hover:bg-rude-cream hover:text-rude-ink"
              >
                {locale === 'he' ? 'לעמוד המוצר' : 'View product'}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
