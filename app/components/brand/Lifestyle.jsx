import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

const TILES = [
  {
    src: '/images/lifestyle-surfer.jpg',
    alt: 'Surfer at dawn',
    span: 'col-span-12 sm:col-span-6 row-span-2 sm:row-span-2',
  },
  {
    src: '/images/lifestyle-tlv-girl-tight.jpg',
    alt: 'TLV girl',
    span: 'col-span-6 sm:col-span-3',
  },
  {
    src: '/images/rude-padel.jpg',
    alt: 'Padel match',
    span: 'col-span-6 sm:col-span-3',
  },
  {
    src: '/images/lifestyle-beach-woman.jpg',
    alt: 'Beach',
    span: 'col-span-6 sm:col-span-3',
  },
  {
    src: '/images/rude-grandma-golf.jpg',
    alt: 'Grandma golfing',
    span: 'col-span-6 sm:col-span-3',
  },
  {
    src: '/images/rude-park-family.jpg',
    alt: 'Family in park',
    span: 'col-span-12 sm:col-span-6 row-span-2 sm:row-span-2',
  },
  {
    src: '/images/rude-grandpa-kick-beach.jpg',
    alt: 'Grandpa kicking',
    span: 'col-span-6 sm:col-span-3',
  },
  {
    src: '/images/lifestyle-lemon-guy.jpg',
    alt: 'Lemon guy',
    span: 'col-span-6 sm:col-span-3',
  },
];

/**
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function Lifestyle({t, locale}) {
  const isHe = locale === 'he';
  return (
    <section className="relative bg-rude-cream py-section">
      <div className="container-rude">
        <Reveal className="grid gap-6 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-7">
            <span className="label-eyebrow">{t.sections.lifestyle.eyebrow}</span>
            <h2 className="display-text mt-4 text-display-xl text-balance">
              {t.sections.lifestyle.title}
            </h2>
          </div>
          <div className="md:col-span-5 md:self-end">
            <p
              className={cn(
                'text-body-lg text-rude-ink/70',
                isHe && 'font-hebrew',
              )}
            >
              {t.sections.lifestyle.sub}
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid auto-rows-[140px] grid-cols-12 gap-2 sm:auto-rows-[200px] sm:gap-3 md:auto-rows-[260px] md:gap-4">
          {TILES.map((tile, i) => (
            <Reveal
              key={tile.src}
              delay={Math.min(i, 4)}
              className={cn('overflow-hidden rounded-rude bg-rude-ink/5', tile.span)}
            >
              <figure className="group relative size-full">
                <img
                  src={tile.src}
                  alt={tile.alt}
                  className="size-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                  style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
                  loading="lazy"
                />
                <figcaption className="absolute inset-x-3 bottom-3 flex translate-y-2 items-center gap-2 rounded-pill bg-rude-cream/90 px-3 py-1.5 font-mono text-micro uppercase tracking-[0.18em] text-rude-ink opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="size-1.5 rounded-full bg-rude-pink" />
                  {tile.alt}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
