import {Link} from 'react-router';
import {useState} from 'react';
import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

/**
 * FAQ accordion preview — three or four questions, each animating open
 * with a height transition. Final row links to the full FAQ page.
 *
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function FAQ({t, locale}) {
  const isHe = locale === 'he';
  const [open, setOpen] = useState(0);

  return (
    <section className="relative bg-rude-bone py-section text-rude-ink">
      <div className="container-rude max-w-3xl">
        <Reveal className="text-center">
          <h2 className="display-text text-display-xl text-balance">
            {t.faq.title}
          </h2>
          <p
            className={cn(
              'mt-4 font-display text-display-lg italic text-rude-pink',
              isHe && 'font-hebrew',
            )}
          >
            {t.faq.sub}
          </p>
        </Reveal>

        <ul className="mt-14 divide-y divide-rude-ink/10 border-y border-rude-ink/10">
          {t.faq.items.map((item, i) => {
            const isOpen = i === open;
            return (
              <Reveal as="li" key={item.q} delay={Math.min(i + 1, 4)}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-start transition-colors hover:text-rude-pink md:py-7"
                >
                  <span
                    className={cn(
                      'flex-1 font-display text-xl uppercase tracking-tight md:text-2xl',
                      isHe && 'font-hebrew',
                    )}
                  >
                    {item.q}
                  </span>
                  <span
                    className={cn(
                      'flex size-9 items-center justify-center rounded-full border border-current transition-transform duration-500',
                      isOpen ? 'rotate-45' : 'rotate-0',
                    )}
                    style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
                    aria-hidden
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14">
                      <path
                        d="M7 1v12M1 7h12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>
                <div
                  className={cn(
                    'grid transition-[grid-template-rows,opacity] duration-500',
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0',
                  )}
                  style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
                >
                  <div className="overflow-hidden">
                    <p
                      className={cn(
                        'pb-7 text-body-lg text-rude-ink/75',
                        isHe && 'font-hebrew',
                      )}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={4} className="mt-10 text-center">
          <Link to="/pages/faq" prefetch="intent" className="btn-rude-ghost">
            {t.faq.ctaAll}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
