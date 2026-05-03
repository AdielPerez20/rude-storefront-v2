import {Await, Link} from 'react-router';
import {Suspense, useId} from 'react';
import {Aside} from '~/components/Aside';
import {CartMain} from '~/components/CartMain';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/SearchFormPredictive';
import {SearchResultsPredictive} from '~/components/SearchResultsPredictive';
import {SiteHeader} from '~/components/brand/SiteHeader';
import {SiteFooter} from '~/components/brand/SiteFooter';
import {useTranslation} from '~/lib/i18n';

/**
 * @param {PageLayoutProps & { locale?: 'he' | 'en' }}
 */
export function PageLayout({
  cart,
  children = null,
  isLoggedIn,
  publicStoreDomain,
  locale = 'he',
}) {
  const t = useTranslation(locale);
  return (
    <Aside.Provider>
      <CartAside cart={cart} t={t} />
      <SearchAside t={t} locale={locale} />
      <MobileMenuAside locale={locale} t={t} />
      <SiteHeader cart={cart} isLoggedIn={isLoggedIn} t={t} locale={locale} />
      <main className="min-h-[100svh]">{children}</main>
      <SiteFooter t={t} locale={locale} />
    </Aside.Provider>
  );
}

function CartAside({cart, t}) {
  return (
    <Aside type="cart" heading={t.nav.cart}>
      <Suspense fallback={<p className="p-6 text-rude-ink/70">…</p>}>
        <Await resolve={cart}>
          {(cart) => <CartMain cart={cart} layout="aside" />}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside({t}) {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading={t.nav.search}>
      <div className="flex flex-col gap-6 p-6">
        <SearchFormPredictive>
          {({fetchResults, goToSearch, inputRef}) => (
            <div className="flex items-center gap-2 rounded-pill border border-rude-ink/15 bg-rude-cream/60 px-5 py-3">
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder={t.nav.search}
                ref={inputRef}
                type="search"
                list={queriesDatalistId}
                className="w-full bg-transparent text-body focus:outline-none"
              />
              <button
                type="button"
                onClick={goToSearch}
                className="font-mono text-micro uppercase tracking-[0.18em] text-rude-pink hover:text-rude-ink"
              >
                Go
              </button>
            </div>
          )}
        </SearchFormPredictive>

        <SearchResultsPredictive>
          {({items, total, term, state, closeSearch}) => {
            const {articles, collections, pages, products, queries} = items;
            if (state === 'loading' && term.current) return <div>…</div>;
            if (!total) return <SearchResultsPredictive.Empty term={term} />;

            return (
              <>
                <SearchResultsPredictive.Queries
                  queries={queries}
                  queriesDatalistId={queriesDatalistId}
                />
                <SearchResultsPredictive.Products
                  products={products}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Collections
                  collections={collections}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Pages
                  pages={pages}
                  closeSearch={closeSearch}
                  term={term}
                />
                <SearchResultsPredictive.Articles
                  articles={articles}
                  closeSearch={closeSearch}
                  term={term}
                />
                {term.current && total ? (
                  <Link
                    onClick={closeSearch}
                    to={`${SEARCH_ENDPOINT}?q=${term.current}`}
                    className="font-display text-body uppercase tracking-tight text-rude-pink"
                  >
                    View all results for <q>{term.current}</q> →
                  </Link>
                ) : null}
              </>
            );
          }}
        </SearchResultsPredictive>
      </div>
    </Aside>
  );
}

function MobileMenuAside({t, locale}) {
  const links = [
    {to: '/collections', label: t.nav.shop},
    {to: '/collections/all', label: t.nav.products},
    {to: '/pages/story', label: t.nav.story},
    {to: '/pages/faq', label: t.nav.faq},
    {to: '/account', label: t.nav.account},
  ];
  return (
    <Aside type="mobile" heading={t.nav.menu}>
      <nav className="flex flex-col gap-1 p-4">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="group flex items-center justify-between border-b border-rude-ink/10 py-5 font-display text-3xl uppercase tracking-tight text-rude-ink transition hover:text-rude-pink"
          >
            {l.label}
            <span className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        ))}
        <Link
          to={locale === 'he' ? '?lang=en' : '?lang=he'}
          reloadDocument
          className="mt-6 inline-flex items-center gap-2 self-start rounded-pill border border-rude-ink/15 px-4 py-2 font-mono text-micro uppercase tracking-[0.18em]"
        >
          {locale === 'he' ? 'English' : 'עברית'}
        </Link>
      </nav>
    </Aside>
  );
}

/**
 * @typedef {Object} PageLayoutProps
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<FooterQuery|null>} [footer]
 * @property {HeaderQuery} [header]
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 * @property {React.ReactNode} [children]
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
