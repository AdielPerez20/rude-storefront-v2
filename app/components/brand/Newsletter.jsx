import {useState} from 'react';
import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

/**
 * Email capture — full-bleed park-family imagery with a centered email
 * form. Mirrors dailyrude.com's EmailCapture treatment.
 *
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
    setTimeout(() => setState('done'), 700);
  }

  return (
    <section className="relative isolate overflow-hidden text-rude-cream">
      <img
        src="/images/rude-park-family.jpg"
        alt=""
        className="absolute inset-0 -z-10 size-full object-cover object-top"
        loading="lazy"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,10,10,0.68) 0%, rgba(10,10,10,0.85) 100%)',
        }}
        aria-hidden
      />

      <div className="container-rude py-section">
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <h2 className="display-text text-display-2xl text-balance">
              {t.email.title}
            </h2>
            <p
              className={cn(
                'mt-3 font-display text-display-lg italic text-rude-pink',
                isHe && 'font-hebrew',
              )}
            >
              {t.email.sub}
            </p>
          </Reveal>

          <Reveal delay={1}>
            <form
              onSubmit={onSubmit}
              className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row"
            >
              <label className="sr-only" htmlFor="newsletter-email">
                {t.email.placeholder}
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                placeholder={t.email.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full flex-1 rounded-pill border border-rude-cream/25 bg-rude-cream/10 px-6 py-4 font-sans text-body text-rude-cream placeholder:text-rude-cream/50 backdrop-blur-md transition-colors focus:border-rude-pink focus:outline-none"
                disabled={state !== 'idle'}
              />
              <button
                type="submit"
                disabled={state !== 'idle'}
                className="btn-rude-neon justify-center disabled:cursor-not-allowed disabled:opacity-70"
              >
                {state === 'idle' ? t.email.cta : null}
                {state === 'loading' ? '…' : null}
                {state === 'done' ? '✓' : null}
              </button>
            </form>
            <p className="mt-4 font-mono text-micro uppercase tracking-[0.18em] text-rude-cream/60">
              {state === 'done'
                ? locale === 'he'
                  ? 'נרשמת. נסתפק בקצת.'
                  : 'Signed up. We will be brief.'
                : t.email.smallPrint}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
