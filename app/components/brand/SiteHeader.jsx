import {Suspense, useEffect, useState} from 'react';
import {Await, Link, NavLink} from 'react-router';
import {useAside} from '~/components/Aside';
import {cn} from '~/lib/cn';

/**
 * RUDE site header — fixed, glassmorphic on scroll, with full nav & locale switcher.
 *
 * @param {{
 *   isLoggedIn: Promise<boolean>,
 *   cart: Promise<any>,
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function SiteHeader({isLoggedIn, cart, t, locale}) {
  const {open} = useAside();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHe = locale === 'he';
  const navLinks = [
    {to: '/collections', label: t.nav.shop},
    {to: '/collections/all', label: t.nav.products},
    {to: '/pages/story', label: t.nav.story},
    {to: '/pages/faq', label: t.nav.faq},
  ];

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-rude-cream/85 backdrop-blur-2xl backdrop-saturate-150'
          : 'bg-transparent',
      )}
      style={{transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)'}}
    >
      <div
        className={cn(
          'border-b transition-colors duration-500',
          scrolled ? 'border-rude-ink/10' : 'border-transparent',
        )}
      >
        <div className="container-rude flex items-center justify-between gap-6 py-4 md:py-5">
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-pill text-rude-ink transition hover:bg-rude-ink/10 lg:hidden"
            onClick={() => open('mobile')}
            aria-label={t.nav.menu}
          >
            <MenuIcon />
          </button>

          <Link
            to="/"
            prefetch="intent"
            className="font-display text-2xl tracking-tight text-rude-ink hover:opacity-80 md:text-3xl"
            aria-label="RUDE — home"
          >
            RUDE
            <span className="ms-1 text-rude-pink">.</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                prefetch="intent"
                className={({isActive}) =>
                  cn(
                    'group relative font-mono text-micro uppercase tracking-[0.18em] transition',
                    isActive
                      ? 'text-rude-pink'
                      : 'text-rude-ink hover:text-rude-pink',
                  )
                }
              >
                {({isActive}) => (
                  <>
                    {link.label}
                    <span
                      className={cn(
                        'absolute -bottom-1 start-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100',
                        isActive && 'scale-x-100',
                      )}
                      style={{
                        transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)',
                      }}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <Link
              to={isHe ? '?lang=en' : '?lang=he'}
              reloadDocument
              className="hidden items-center gap-1 rounded-pill px-3 py-2 font-mono text-micro uppercase tracking-[0.18em] transition hover:bg-rude-ink/10 sm:inline-flex"
              aria-label="Switch language"
            >
              {isHe ? 'EN' : 'עב'}
            </Link>

            <button
              type="button"
              onClick={() => open('search')}
              className="flex size-10 items-center justify-center rounded-pill text-rude-ink transition hover:bg-rude-ink/10"
              aria-label={t.nav.search}
            >
              <SearchIcon />
            </button>

            <Suspense fallback={<AccountStub label={t.nav.account} />}>
              <Await
                resolve={isLoggedIn}
                errorElement={<AccountStub label={t.nav.account} />}
              >
                {(loggedIn) => (
                  <Link
                    to={loggedIn ? '/account' : '/account/login'}
                    prefetch="intent"
                    className="hidden size-10 items-center justify-center rounded-pill text-rude-ink transition hover:bg-rude-ink/10 sm:flex"
                    aria-label={t.nav.account}
                  >
                    <AccountIcon active={loggedIn} />
                  </Link>
                )}
              </Await>
            </Suspense>

            <button
              type="button"
              onClick={() => open('cart')}
              className="relative flex h-10 items-center gap-2 rounded-pill bg-rude-ink px-4 font-mono text-micro uppercase tracking-[0.18em] text-rude-cream transition-all duration-500 hover:bg-rude-pink"
              style={{transitionTimingFunction: 'cubic-bezier(0.16,1,0.3,1)'}}
              aria-label={t.nav.cart}
            >
              <span className="hidden sm:inline">{t.nav.cart}</span>
              <Suspense
                fallback={<CartCountBadge count={0} />}
              >
                <Await resolve={cart} errorElement={<CartCountBadge count={0} />}>
                  {(c) => <CartCountBadge count={c?.totalQuantity ?? 0} />}
                </Await>
              </Suspense>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function CartCountBadge({count}) {
  return (
    <span
      className={cn(
        'flex size-6 items-center justify-center rounded-full bg-rude-cream font-display text-[11px] tabular-nums text-rude-ink transition-all',
        count > 0 ? 'scale-100 opacity-100' : 'scale-90 opacity-70',
      )}
    >
      {count}
    </span>
  );
}

function AccountStub({label}) {
  return (
    <Link
      to="/account/login"
      className="hidden size-10 items-center justify-center rounded-pill text-rude-ink transition hover:bg-rude-ink/10 sm:flex"
      aria-label={label}
    >
      <AccountIcon />
    </Link>
  );
}

function MenuIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="9" cy="9" r="6" />
      <path d="m13.5 13.5 4 4" strokeLinecap="round" />
    </svg>
  );
}

function AccountIcon({active}) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="10" cy="7" r="3" />
      <path d="M3.5 17c.7-3.4 3.4-5 6.5-5s5.8 1.6 6.5 5" strokeLinecap="round" />
      {active ? (
        <circle cx="15" cy="5" r="2" fill="#FF1E7A" stroke="none" />
      ) : null}
    </svg>
  );
}
