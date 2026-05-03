import {Await, useLoaderData, useRouteLoaderData} from 'react-router';
import {Suspense} from 'react';

import {Hero} from '~/components/brand/Hero';
import {MarqueeStrip} from '~/components/brand/MarqueeStrip';
import {ProductsLineup} from '~/components/brand/ProductsLineup';
import {FeaturedSpotlight} from '~/components/brand/FeaturedSpotlight';
import {Benefits} from '~/components/brand/Benefits';
import {HowToUse} from '~/components/brand/HowToUse';
import {CreatineBenefits} from '~/components/brand/CreatineBenefits';
import {Ingredients} from '~/components/brand/Ingredients';
import {EditorialBand} from '~/components/brand/EditorialBand';
import {Subscription} from '~/components/brand/Subscription';
import {Bundle} from '~/components/brand/Bundle';
import {Reviews} from '~/components/brand/Reviews';
import {FAQ} from '~/components/brand/FAQ';
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
      {/* 01 — Cinematic hero */}
      <Hero t={t} locale={locale} />

      {/* 02 — Brand-claims marquee band */}
      <MarqueeStrip items={t.marquee} />

      {/* 03 — Products line-up (Electrolytes / Creatine / Bundles) */}
      <Suspense fallback={<ProductsLineup t={t} locale={locale} />}>
        <Await resolve={data.recommendedProducts}>
          {(resp) => (
            <ProductsLineup
              t={t}
              locale={locale}
              products={resp?.products?.nodes ?? null}
            />
          )}
        </Await>
      </Suspense>

      {/* 04 — Electrolytes spotlight */}
      <FeaturedSpotlight
        t={t}
        locale={locale}
        data="featuredElectrolytes"
        image="/images/rude-grandpa-kick-beach.jpg"
        imageAlt="RUDE Electrolytes — campaign"
        bg="bg-rude-bone"
        accentColor="text-rude-sky"
      />

      {/* 05 — Creatine intro spotlight (mirrored) */}
      <FeaturedSpotlight
        t={t}
        locale={locale}
        data="featuredCreatine"
        image="/images/rude-creatine-tennis.jpg"
        imageAlt="RUDE Creatine — campaign"
        reverse
        bg="bg-rude-bone"
        accentColor="text-rude-pink"
      />

      {/* 06 — Why RUDE? benefits */}
      <Benefits t={t} locale={locale} />

      {/* 07 — How to use ritual */}
      <HowToUse t={t} locale={locale} />

      {/* 08 — Creatine deep-dive benefits */}
      <CreatineBenefits t={t} locale={locale} />

      {/* 09 — Ingredients grid */}
      <Ingredients t={t} locale={locale} />

      {/* 10 — Full-bleed campaign band */}
      <EditorialBand />

      {/* 11 — Subscription pitch */}
      <Subscription t={t} locale={locale} />

      {/* 12 — Bundle pricing */}
      <Bundle t={t} locale={locale} />

      {/* 13 — Reviews */}
      <Reviews t={t} locale={locale} />

      {/* 14 — FAQ accordion */}
      <FAQ t={t} locale={locale} />

      {/* 15 — Email capture */}
      <Newsletter t={t} locale={locale} />

      {/* 16 — Final CTA */}
      <FinalCTA t={t} locale={locale} />

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
