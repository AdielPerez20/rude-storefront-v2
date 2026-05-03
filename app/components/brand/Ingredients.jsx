import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

const INGREDIENTS = [
  {
    code: 'Na',
    he: 'נתרן',
    en: 'Sodium',
    desc_he: 'מאזן נוזלים, מונע התכווצויות.',
    desc_en: 'Balances fluids, prevents cramps.',
    dose: '1000mg',
  },
  {
    code: 'Mg',
    he: 'מגנזיום',
    en: 'Magnesium',
    desc_he: 'שריר רגוע, ראש נקי.',
    desc_en: 'Relaxed muscle, clear head.',
    dose: '60mg',
  },
  {
    code: 'K',
    he: 'אשלגן',
    en: 'Potassium',
    desc_he: 'אנרגיה תאית. אינטנסיביות.',
    desc_en: 'Cellular energy. Intensity.',
    dose: '200mg',
  },
  {
    code: 'Zn',
    he: 'אבץ',
    en: 'Zinc',
    desc_he: 'מערכת חיסון. מטבוליזם.',
    desc_en: 'Immune system. Metabolism.',
    dose: '8mg',
  },
  {
    code: 'C',
    he: 'ויטמין C',
    en: 'Vitamin C',
    desc_he: 'נוגד חמצון. הגנה.',
    desc_en: 'Antioxidant. Defense.',
    dose: '40mg',
  },
];

/**
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function Ingredients({t, locale}) {
  const isHe = locale === 'he';
  return (
    <section className="relative bg-rude-ink py-section text-rude-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay bg-noise-texture"
        aria-hidden
      />
      <div className="container-rude relative">
        <Reveal className="grid gap-6 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <span className="label-eyebrow !text-rude-neon">
              {t.sections.ingredients.eyebrow}
            </span>
            <h2 className="display-text mt-4 text-display-xl text-balance">
              {t.sections.ingredients.title}
            </h2>
          </div>
          <div className="md:col-span-5 md:self-end">
            <p
              className={cn(
                'text-body-lg text-rude-cream/70',
                isHe && 'font-hebrew',
              )}
            >
              {t.sections.ingredients.sub}
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-rude bg-rude-cream/10 md:mt-20 md:grid-cols-5">
          {INGREDIENTS.map((ing, i) => (
            <Reveal key={ing.code} delay={Math.min(i, 4)} as="li">
              <article
                className="group relative flex h-full flex-col justify-between gap-10 bg-rude-ink p-6 transition-colors duration-500 hover:bg-rude-shadow md:p-8"
              >
                <div>
                  <span className="font-mono text-micro uppercase tracking-[0.18em] text-rude-neon">
                    {ing.dose}
                  </span>
                  <div className="mt-4 inline-flex items-center justify-center rounded-rude border border-rude-cream/20 bg-rude-cream/5 px-3 py-1 font-mono text-caption">
                    {ing.code}
                  </div>
                </div>
                <div>
                  <h3
                    className={cn(
                      'font-display text-3xl uppercase tracking-tight md:text-4xl',
                      isHe && 'font-hebrew',
                    )}
                  >
                    {isHe ? ing.he : ing.en}
                  </h3>
                  <p
                    className={cn(
                      'mt-3 text-caption text-rude-cream/70',
                      isHe && 'font-hebrew',
                    )}
                  >
                    {isHe ? ing.desc_he : ing.desc_en}
                  </p>
                </div>

                <div
                  className="absolute -bottom-px start-0 h-0.5 w-0 bg-rude-neon transition-[width] duration-700 group-hover:w-full"
                  style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
                  aria-hidden
                />
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
