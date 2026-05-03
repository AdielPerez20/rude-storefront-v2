import {useCallback, useEffect, useRef, useState} from 'react';
import {Link} from 'react-router';
import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

/**
 * Mock product cards. Once `loadDeferredData` returns real Shopify data,
 * `<ProductsLineup products={...} />` will replace these with the real
 * line-up while keeping the same card layout.
 */
const MOCK_PRODUCTS = [
  {
    handle: 'pomegranate-berry',
    titleHe: 'רימון ופירות יער',
    titleEn: 'Pomegranate Berry',
    image: '/images/flavor-pomegranate-texture.jpg',
    price: 159,
    compareAt: 189,
  },
  {
    handle: 'pink-lemonade',
    titleHe: 'לימונדה ורודה',
    titleEn: 'Pink Lemonade',
    image: '/images/flavor-lemon-texture.jpg',
    price: 159,
    compareAt: null,
  },
  {
    handle: 'lime-electric',
    titleHe: 'ליים שורק',
    titleEn: 'Electric Lime',
    image: '/images/flavor-lime-macro.jpg',
    price: 159,
    compareAt: null,
  },
  {
    handle: 'creatine-monohydrate',
    titleHe: 'קריאטין מונוהידראט',
    titleEn: 'Creatine Monohydrate',
    image: '/images/rude-creatine-tennis.jpg',
    price: 189,
    compareAt: null,
  },
];

const CURRENCY_HE = '₪';
const CURRENCY_EN = '₪';

/**
 * Products grid — white cards on cream, snap-carousel on mobile with dot
 * indicators, 4-up grid on desktop, plus a "view all" tile. Mirrors the
 * dailyrude.com ProductsGridSection visually.
 *
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 *   products?: Array<{handle:string;title:string;featuredImage?:{url:string;altText?:string};priceRange?:{minVariantPrice:{amount:string;currencyCode:string}};compareAtPriceRange?:{minVariantPrice?:{amount:string;currencyCode:string}}}>,
 * }} props
 */
export function ProductsLineup({t, locale, products}) {
  const isHe = locale === 'he';

  // Map real Shopify products into the same shape as MOCK_PRODUCTS, or
  // fall back to mock data when the storefront isn't wired yet.
  const items = (products && products.length ? products : MOCK_PRODUCTS).slice(
    0,
    4,
  );

  const carouselRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);
  const total = items.length + 1; // +1 for "view all" tile

  const onScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / total;
    if (!cardWidth) return;
    setActiveDot(
      Math.min(total - 1, Math.max(0, Math.round(el.scrollLeft / cardWidth))),
    );
  }, [total]);

  function scrollToCard(i) {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / total;
    el.scrollTo({left: cardWidth * i, behavior: 'smooth'});
  }

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener('scroll', onScroll, {passive: true});
    return () => el.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  return (
    <section className="relative bg-rude-cream py-section-sm text-rude-ink md:py-section">
      <div className="container-rude">
        {/* Header row — title + tagline + "shop all" */}
        <Reveal className="mb-8 flex items-end justify-between gap-6 md:mb-10">
          <div>
            <h2 className="display-text text-display-lg leading-none md:text-display-xl">
              {locale === 'he' ? 'המוצרים שלנו' : 'THE COLLECTION'}
            </h2>
            <p
              className={cn(
                'mt-1 text-body text-rude-ink/60',
                isHe && 'font-hebrew',
              )}
            >
              {locale === 'he'
                ? 'ללא סוכר. רכיבים טבעיים. תוצרת ישראל.'
                : 'No sugar. Natural ingredients. Made in Israel.'}
            </p>
          </div>
          <Link
            to="/collections/all"
            prefetch="intent"
            className="hidden items-center gap-2 font-mono text-micro uppercase tracking-[0.18em] text-rude-ink transition-colors hover:text-rude-pink md:inline-flex"
          >
            {locale === 'he' ? 'לכל המוצרים' : 'Shop all'}
            <span className="text-base rtl:rotate-180">→</span>
          </Link>
        </Reveal>

        {/* Card track — mobile snap-carousel, desktop grid */}
        <div
          ref={carouselRef}
          className={cn(
            '-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth scrollbar-none px-5 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-5',
          )}
        >
          {items.map((item) => (
            <ProductCard key={item.handle} item={item} locale={locale} />
          ))}

          {/* View-all tile */}
          <Link
            to="/collections/all"
            prefetch="intent"
            className="group flex w-[72vw] max-w-[260px] shrink-0 snap-start flex-col items-center justify-center rounded-rude bg-white p-6 text-center shadow-sm transition-all duration-500 hover:bg-rude-ink hover:shadow-md md:w-auto md:max-w-none md:shrink"
            style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
          >
            <span className="mb-4 inline-flex size-12 items-center justify-center rounded-full bg-rude-pink text-rude-cream transition-colors duration-500 group-hover:bg-rude-cream group-hover:text-rude-ink">
              <span className="text-xl rtl:rotate-180">→</span>
            </span>
            <span className="font-display text-sm uppercase tracking-[0.18em] text-rude-ink transition-colors group-hover:text-rude-cream">
              {locale === 'he' ? 'כל המוצרים' : 'View all'}
            </span>
          </Link>
        </div>

        {/* Mobile dot indicators */}
        <div className="mt-5 flex justify-center gap-2 md:hidden">
          {Array.from({length: total}).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToCard(i)}
              aria-label={`Go to card ${i + 1}`}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                activeDot === i
                  ? 'w-6 bg-rude-ink'
                  : 'w-2 bg-rude-ink/25 hover:bg-rude-ink/50',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Individual card — supports both the mock shape (numeric `price` /
 * `compareAt`) and the live Shopify shape (`priceRange`, `featuredImage`).
 */
function ProductCard({item, locale}) {
  const isHe = locale === 'he';
  const title = isHe
    ? (item.titleHe ?? item.title)
    : (item.titleEn ?? item.title);
  const handle = item.handle;
  const imageUrl = item.image ?? item.featuredImage?.url;
  const imageAlt = item.featuredImage?.altText ?? title;

  // Pull price out of either shape
  let price = item.price;
  let compareAt = item.compareAt;
  let currency = isHe ? CURRENCY_HE : CURRENCY_EN;
  if (item.priceRange?.minVariantPrice) {
    price = parseFloat(item.priceRange.minVariantPrice.amount);
    currency = item.priceRange.minVariantPrice.currencyCode === 'ILS' ? '₪' : item.priceRange.minVariantPrice.currencyCode;
  }
  if (item.compareAtPriceRange?.minVariantPrice?.amount) {
    const c = parseFloat(item.compareAtPriceRange.minVariantPrice.amount);
    if (c > price) compareAt = c;
  }

  const discountPct =
    compareAt && compareAt > price
      ? Math.round((1 - price / compareAt) * 100)
      : null;

  return (
    <div className="w-[72vw] max-w-[260px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink">
      <Link
        to={`/products/${handle}`}
        prefetch="intent"
        className="group block h-full overflow-hidden rounded-rude bg-white shadow-sm transition-all duration-500 hover:shadow-md"
        style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
      >
        <div className="aspect-square overflow-hidden bg-rude-cream/60">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={imageAlt}
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <span className="font-display text-3xl text-rude-ink/15">
                RUDE
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3
            className={cn(
              'mb-2 line-clamp-2 font-display text-sm uppercase leading-tight tracking-tight text-rude-ink',
              isHe && 'font-hebrew',
            )}
          >
            {title}
          </h3>

          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            {compareAt && discountPct ? (
              <>
                <span className="text-xs text-rude-ink/40 line-through">
                  {currency}
                  {compareAt}
                </span>
                <span className="inline-flex items-center rounded-full bg-rude-pink px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-rude-cream">
                  −{discountPct}%
                </span>
              </>
            ) : null}
            <span className="text-sm font-bold text-rude-pink">
              {currency}
              {price}
            </span>
          </div>

          <span
            className={cn(
              'relative block overflow-hidden rounded-pill bg-rude-ink py-2 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-rude-cream transition-all duration-500',
              'group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-rude-ink/30',
              "before:absolute before:inset-0 before:-translate-x-full before:skew-x-12 before:bg-rude-cream/15 before:transition-transform before:duration-700 group-hover:before:translate-x-[200%]",
            )}
            style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
          >
            {locale === 'he' ? 'לרכישה' : 'Shop now'}
          </span>
        </div>
      </Link>
    </div>
  );
}
