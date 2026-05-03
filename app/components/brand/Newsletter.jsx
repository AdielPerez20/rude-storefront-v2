import {useState} from 'react';
import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

/**
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function Newsletter({t, locale}) {
  const isHe = locale === 'he';
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');

  function onSubmit(e) {
    e.preventDefault();
    if (!email.includes('@')) return;
    setState('loading');
    // Stubbed; wire to Klaviyo / Shopify customer create later.
    setTimeout(() => setState('done'), 700);
  }

  return (
    <section className="relative overflow-hidden bg-rude-lilac py-section text-rude-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply bg-noise-texture"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 80% 20%, rgba(255,30,122,0.18) 0%, transparent 60%)',
        }}
        aria-hidden
      />
      <div className="container-rude">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <span className="label-eyebrow">{t.sections.newsletter.eyebrow}</span>
            <h2 className="display-text mt-4 text-display-2xl text-balance">
              {t.sections.newsletter.title}
            </h2>
            <p
              className={cn(
                'mt-6 max-w-xl text-body-lg text-rude-ink/75',
                isHe && 'font-hebrew',
              )}
            >
              {t.sections.newsletter.sub}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:self-end" delay={1}>
            <form onSubmit={onSubmit} className="relative">
              <label className="sr-only" htmlFor="newsletter-email">
                {t.sections.newsletter.placeholder}
              </label>
              <div className="relative flex items-center rounded-pill border border-rude-ink/30 bg-rude-cream/40 backdrop-blur-md transition-colors focus-within:border-rude-ink">
                <input
                  id="newsletter-email"
                  type="email"
                  name="email"
                  placeholder={t.sections.newsletter.placeholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-transparent px-6 py-4 font-sans text-body placeholder:text-rude-ink/40 focus:outline-none"
                  disabled={state !== 'idle'}
                />
                <button
                  type="submit"
                  disabled={state !== 'idle'}
                  className="m-1 inline-flex h-12 items-center gap-2 rounded-pill bg-rude-ink px-6 font-display text-sm uppercase tracking-[0.18em] text-rude-cream transition-all duration-500 hover:bg-rude-pink disabled:cursor-not-allowed disabled:opacity-70"
                  style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
                >
                  {state === 'idle' ? t.sections.newsletter.cta : null}
                  {state === 'loading' ? '…' : null}
                  {state === 'done' ? '✓' : null}
                </button>
              </div>
              {state === 'done' && (
                <p className="mt-3 font-mono text-micro uppercase tracking-[0.18em] text-rude-ink">
                  {locale === 'he' ? 'נרשמת. נסתפק בקצת.' : 'Signed up. We will be brief.'}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
