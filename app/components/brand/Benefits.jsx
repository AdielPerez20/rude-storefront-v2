import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

/**
 * "Why RUDE?" — 3 oversized benefit cards on cream. Mirrors dailyrude.com's
 * BenefitsSection but uses the elevated typography + Reveal cascade.
 *
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function Benefits({t, locale}) {
  const isHe = locale === 'he';
  return (
    <section className="relative bg-rude-cream py-section text-rude-ink">
      <div className="container-rude">
        <Reveal className="text-center">
          <h2 className="display-text text-display-xl text-balance">
            {t.benefits.title}
          </h2>
          <p
            className={cn(
              'mt-4 font-display text-display-lg italic text-rude-pink',
              isHe && 'font-hebrew',
            )}
          >
            {t.benefits.sub}
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-5 md:grid-cols-3 md:gap-6">
          {t.benefits.items.map((item, i) => (
            <Reveal as="li" key={item.title} delay={Math.min(i + 1, 4)}>
              <article className="group relative flex h-full flex-col justify-between gap-12 rounded-rude border border-rude-ink/10 bg-rude-bone p-8 transition-all duration-700 hover:border-rude-ink/30 hover:bg-white md:p-10">
                <span className="font-mono text-micro uppercase tracking-[0.18em] text-rude-pink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    className={cn(
                      'display-text text-heading',
                      isHe && 'font-hebrew',
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      'mt-3 text-body text-rude-ink/70 text-pretty',
                      isHe && 'font-hebrew',
                    )}
                  >
                    {item.desc}
                  </p>
                </div>
                <div
                  className="absolute inset-x-8 bottom-6 h-px origin-left scale-x-0 bg-rude-pink transition-transform duration-700 group-hover:scale-x-100"
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
