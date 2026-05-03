import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

/**
 * Creatine deep-dive benefits — 4 quiet stat-style cards on cream.
 *
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function CreatineBenefits({t, locale}) {
  const isHe = locale === 'he';
  return (
    <section className="relative bg-rude-cream py-section text-rude-ink">
      <div className="container-rude">
        <Reveal className="grid gap-6 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <span className="label-eyebrow !text-rude-pink">
              {locale === 'he' ? 'קריאטין' : 'Creatine'}
            </span>
            <h2 className="display-text mt-4 text-display-xl text-balance">
              {t.creatineBenefits.title}
            </h2>
          </div>
          <div className="md:col-span-5 md:self-end">
            <p
              className={cn(
                'text-body-lg text-rude-ink/70',
                isHe && 'font-hebrew',
              )}
            >
              {t.creatineBenefits.sub}
            </p>
          </div>
        </Reveal>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-rude bg-rude-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {t.creatineBenefits.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={Math.min(i + 1, 4)}>
              <article className="group flex h-full flex-col justify-between gap-10 bg-rude-cream p-7 transition-colors duration-500 hover:bg-rude-bone md:p-9">
                <span className="font-mono text-micro uppercase tracking-[0.18em] text-rude-pink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    className={cn(
                      'font-display text-2xl uppercase tracking-tight md:text-3xl',
                      isHe && 'font-hebrew',
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      'mt-3 text-caption text-rude-ink/70',
                      isHe && 'font-hebrew',
                    )}
                  >
                    {item.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
