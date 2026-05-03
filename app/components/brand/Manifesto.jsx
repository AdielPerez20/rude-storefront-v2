import {Link} from 'react-router';
import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

/**
 * Editorial split manifesto section. Big imagery on one side, statement on the
 * other. Designed to anchor the brand voice mid-scroll.
 *
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function Manifesto({t, locale}) {
  const isHe = locale === 'he';
  return (
    <section className="relative bg-rude-cream py-section text-rude-ink">
      <div className="container-rude grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <span className="label-eyebrow">{t.sections.manifesto.eyebrow}</span>
          <h2 className="display-text mt-6 text-display-xl text-balance">
            {t.sections.manifesto.title}
          </h2>
          <p
            className={cn(
              'mt-8 max-w-xl text-body-lg text-rude-ink/80 text-pretty',
              isHe && 'font-hebrew',
            )}
          >
            {t.sections.manifesto.body}
          </p>
          <Link
            to="/pages/story"
            prefetch="intent"
            className="btn-rude-primary mt-10"
          >
            {t.sections.manifesto.cta}
          </Link>
        </Reveal>

        {/* Imagery cluster — three aligned tiles */}
        <Reveal className="lg:col-span-6" delay={1}>
          <div className="relative grid grid-cols-6 gap-3 md:gap-4">
            <figure className="ar-3-4 col-span-4 overflow-hidden rounded-rude bg-rude-ink/5">
              <img
                src="/images/rude-grandpa-skate.jpg"
                alt="Grandpa skating in dramatic pose"
                className="size-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                loading="lazy"
              />
            </figure>
            <div className="col-span-2 grid gap-3 md:gap-4">
              <figure className="ar-3-4 overflow-hidden rounded-rude bg-rude-ink/5">
                <img
                  src="/images/rude-grandma-suit.jpg"
                  alt="Grandma in dramatic suit"
                  className="size-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                  loading="lazy"
                />
              </figure>
              <figure className="ar-3-4 overflow-hidden rounded-rude bg-rude-ink/5">
                <img
                  src="/images/rude-grandpa-tennis.jpg"
                  alt="Grandpa serving with intent"
                  className="size-full object-cover transition-transform duration-[1200ms] hover:scale-105"
                  loading="lazy"
                />
              </figure>
            </div>

            {/* Pull quote — full row below the cluster on mobile, overlaps
                the bottom-left of the cluster from `lg` up. */}
            <div className="col-span-6 mt-6 inline-block w-fit max-w-[18rem] rotate-[-1.5deg] bg-rude-pink px-4 py-3 font-display text-sm uppercase tracking-tight text-rude-cream shadow-[6px_6px_0_0] shadow-rude-ink lg:absolute lg:-bottom-6 lg:start-2 lg:col-span-2 lg:mt-0">
              {locale === 'he'
                ? 'אנשים אמיתיים. אטיטיוד אמיתי.'
                : 'Real people. Real attitude.'}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
