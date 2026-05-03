import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

/**
 * "How to use" — 3-step ritual on a quiet ink/cream contrast band.
 *
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function HowToUse({t, locale}) {
  const isHe = locale === 'he';
  return (
    <section className="relative bg-rude-ink py-section text-rude-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay bg-noise-texture"
        aria-hidden
      />
      <div className="container-rude relative">
        <Reveal className="text-center">
          <h2 className="display-text text-display-xl text-balance">
            {t.howto.title}
          </h2>
          <p
            className={cn(
              'mt-4 font-display text-display-lg italic text-rude-pink',
              isHe && 'font-hebrew',
            )}
          >
            {t.howto.sub}
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8">
          {t.howto.steps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={Math.min(i + 1, 4)}>
              <div className="group relative flex h-full flex-col gap-12 rounded-rude border border-rude-cream/15 bg-rude-shadow p-8 transition-all duration-700 hover:border-rude-pink/40 md:p-10">
                <span
                  className="font-display text-display-lg leading-none text-rude-pink"
                  dir="ltr"
                >
                  {step.n}
                </span>
                <h3
                  className={cn(
                    'display-text text-heading text-rude-cream',
                    isHe && 'font-hebrew',
                  )}
                >
                  {step.label}
                </h3>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={4} className="mt-10 text-center">
          <p
            className={cn(
              'font-mono text-micro uppercase tracking-[0.18em] text-rude-cream/60',
              isHe && 'font-hebrew',
            )}
          >
            {t.howto.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
