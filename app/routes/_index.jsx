import {Await, useLoaderData, useRouteLoaderData} from 'react-router';
import {Suspense} from 'react';
import {Hero} from '~/components/brand/Hero';
import {MarqueeStrip} from '~/components/brand/MarqueeStrip';
import {Manifesto} from '~/components/brand/Manifesto';
import {ProductShowcase} from '~/components/brand/ProductShowcase';
import {Ingredients} from '~/components/brand/Ingredients';
import {Lifestyle} from '~/components/brand/Lifestyle';
import {Reviews} from '~/components/brand/Reviews';
import {Newsletter} from '~/components/brand/Newsletter';
import {FinalCTA} from '~/components/brand/FinalCTA';
import {useTranslation} from '~/lib/i18n';

/** @type {Route.MetaFunction} */
export const meta = () => [
  {title: 'RUDE — אלקטרוליטים, קריאטין, אטיטיוד | Stay Rude.'},
  {
    name: 'description',
    content:
      'אלקטרוליטים פרימיום וקריאטין מונוהידראט — תוצרת ישראל. נתרן, מגנזיום, אשלגן, אבץ. בלי סוכר. בלי תירוצים.',
  },
];

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData({context}) {
  // Featured collection lookup is fast and cached.
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
  ]);
  return {
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
    featuredCollection: collections.nodes[0] ?? null,
  };
}

function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });
  return {recommendedProducts};
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  const root = useRouteLoaderData('root');
  const locale = root?.i18n?.locale ?? 'he';
  const t = useTranslation(locale);

  return (
    <>
      <Hero t={t} locale={locale} />
      <MarqueeStrip items={t.marquee} />
      <Manifesto t={t} locale={locale} />
      <ProductShowcase t={t} locale={locale} />
      <Ingredients t={t} locale={locale} />
      <Lifestyle t={t} locale={locale} />
      <Reviews t={t} locale={locale} />
      <Newsletter t={t} locale={locale} />
      <FinalCTA t={t} locale={locale} />

      {/* Recommended products placeholder — will replace ProductShowcase mock with real Shopify data once linked */}
      <Suspense fallback={null}>
        <Await resolve={data.recommendedProducts}>
          {/* Intentionally rendered as no-op for the visual layer; data primed for hydration of Showcase variant later. */}
          {() => null}
        </Await>
      </Suspense>
    </>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image { id url altText width height }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes { ...FeaturedCollection }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange { minVariantPrice { amount currencyCode } }
    featuredImage { id url altText width height }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes { ...RecommendedProduct }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {ReturnType<typeof useLoaderData<typeof loader>>} LoaderReturnData */
