import {Link} from 'react-router';
import {Marquee} from './Marquee';
import {cn} from '~/lib/cn';

/**
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function SiteFooter({t, locale}) {
  const isHe = locale === 'he';
  const cols = [
    {
      heading: t.footer.shop,
      items: [
        {label: t.nav.products, to: '/collections/all'},
        {label: t.nav.bundles, to: '/collections/bundles'},
        {label: locale === 'he' ? 'מנוי' : 'Subscribe', to: '/pages/subscribe'},
      ],
    },
    {
      heading: t.footer.brand,
      items: [
        {label: t.nav.story, to: '/pages/story'},
        {label: locale === 'he' ? 'רכיבים' : 'Ingredients', to: '/pages/ingredients'},
        {label: locale === 'he' ? 'גלריה' : 'Lookbook', to: '/pages/lookbook'},
      ],
    },
    {
      heading: t.footer.support,
      items: [
        {label: t.nav.faq, to: '/pages/faq'},
        {label: locale === 'he' ? 'משלוחים' : 'Shipping', to: '/policies/shipping-policy'},
        {label: locale === 'he' ? 'יצירת קשר' : 'Contact', to: '/pages/contact'},
      ],
    },
    {
      heading: t.footer.legal,
      items: [
        {label: locale === 'he' ? 'תנאי שירות' : 'Terms', to: '/policies/terms-of-service'},
        {label: locale === 'he' ? 'פרטיות' : 'Privacy', to: '/policies/privacy-policy'},
        {label: locale === 'he' ? 'החזרות' : 'Returns', to: '/policies/refund-policy'},
      ],
    },
  ];

  return (
    <footer className="relative bg-rude-ink text-rude-cream">
      <div className="border-y border-rude-cream/10 py-6 md:py-8">
        <Marquee
          items={Array.from({length: 6}).flatMap(() => [
            'RUDE',
            'NO SUGAR',
            'STAY HYDRATED',
            'MADE IN ISRAEL',
            'NEVER ORDINARY',
            'הידרציה בלי תירוצים',
          ])}
          itemClassName="text-display-lg leading-none px-2 text-rude-cream"
          separator={
            <span aria-hidden className="mx-8 inline-block h-3 w-3 -translate-y-1 rotate-45 bg-rude-pink" />
          }
        />
      </div>

      <div className="container-rude py-section-sm">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link to="/" className="font-display text-display-lg leading-none">
              RUDE<span className="text-rude-pink">.</span>
            </Link>
            <p
              className={cn(
                'mt-6 max-w-md text-body-lg text-rude-cream/70',
                isHe && 'font-hebrew',
              )}
            >
              {t.footer.tagline}
            </p>

            <div className="mt-10 flex items-center gap-3">
              <SocialIcon label="Instagram" href="https://instagram.com" />
              <SocialIcon label="TikTok" href="https://tiktok.com" />
              <SocialIcon label="YouTube" href="https://youtube.com" />
            </div>
          </div>

          <nav className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-4 md:gap-12">
            {cols.map((c) => (
              <div key={c.heading}>
                <h3 className="font-mono text-micro uppercase tracking-[0.18em] text-rude-cream/60">
                  {c.heading}
                </h3>
                <ul className="mt-5 space-y-3">
                  {c.items.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        prefetch="intent"
                        className={cn(
                          'group inline-flex items-center gap-2 text-body text-rude-cream/85 transition hover:text-rude-pink',
                          isHe && 'font-hebrew',
                        )}
                      >
                        <span className="size-1 rounded-full bg-current opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-6 border-t border-rude-cream/10 pt-8 md:flex-row md:items-center">
          <p className="font-mono text-micro uppercase tracking-[0.18em] text-rude-cream/60">
            © {new Date().getFullYear()} RUDE — {t.footer.rights}.
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-micro uppercase tracking-[0.18em] text-rude-cream/60">
              {locale === 'he' ? 'עיצוב ונכסים: ישראל' : 'Designed in Israel'}
            </span>
            <span className="size-1.5 rounded-full bg-rude-neon" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({label, href}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-rude-cream/15 transition-colors duration-500 hover:border-rude-pink hover:text-rude-pink"
    >
      <span className="font-mono text-micro uppercase tracking-[0.18em]">
        {label.slice(0, 2)}
      </span>
    </a>
  );
}
