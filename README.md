# RUDE — storefront v2

Editorial Shopify Hydrogen storefront for the Israeli electrolyte / creatine
brand RUDE. This is a **fresh, opinionated rebuild** of `dailyrude.com` that
leans hard into motion, big typography, dramatic imagery, and bilingual
(Hebrew RTL / English LTR) UX.

The original repo is preserved at `AdielPerez20/rude-hydrogen` and is **not**
touched by this project.

## Stack

| Layer | Choice |
| ----- | ------ |
| Framework | [Hydrogen](https://hydrogen.shopify.dev) `2026.4.x` (Shopify's official storefront framework) |
| Router | React Router 7 |
| Runtime | Oxygen (Cloudflare Workers compatible) |
| Styling | Tailwind CSS 3 with a hand-tuned RUDE token system |
| Motion | CSS-driven (intersection observer + custom cubic-bezier curves), `motion` package available |
| Typography | Anton (display), Inter (LTR body), Heebo / Rubik (Hebrew) — loaded from Google Fonts |
| State | React Router data loaders, Suspense / Await for deferred queries |

## Quick start

```bash
# install — workspace/catalog refs in skeleton template were replaced with
# real semver ranges, so plain npm works.
npm install

# create your env file (see .env.example below)
cp .env.example .env

# run the dev server
npm run dev
```

The app boots against [mock.shop](https://mock.shop) by default — no Shopify
credentials needed to see the homepage, the cart drawer, and the product
showcase. To wire up the real RUDE store, fill in:

```
PUBLIC_STORE_DOMAIN=dailyrude.myshopify.com
PUBLIC_STOREFRONT_API_TOKEN=…
PUBLIC_STOREFRONT_ID=…
PUBLIC_CHECKOUT_DOMAIN=checkout.dailyrude.com
SESSION_SECRET=…
```

## Routes

The skeleton ships with the standard Hydrogen route tree (cart, products,
collections, search, blogs, policies, account flows). The hand-built routes
live at:

- `app/routes/_index.jsx` — bilingual homepage composed from `~/components/brand/*`
- `app/components/PageLayout.jsx` — wraps `<Outlet/>` with the new header,
  footer, and three side drawers (cart, search, mobile menu).

## Design system

All brand tokens live in [`tailwind.config.js`](tailwind.config.js):

- **Colors**: `rude-{ink,cream,bone,berry,berry-deep,cherry,pink,pink-soft,
  lilac,yellow,neon,neon-soft,olive,sky,shadow}`.
- **Type scale**: `display-{lg,xl,2xl,3xl}`, `heading`, `subheading`,
  `body{,-lg}`, `caption`, `micro` — all `clamp()`-driven so they breathe with
  the viewport.
- **Easing**: `rude-out`, `rude-in`, `rude-bounce`.
- **Animations**: `marquee`, `marquee-reverse`, `fade-up`, `scale-in`, `glow`,
  `shimmer`.

Reusable components live under `app/components/brand/`:

| File | Purpose |
| ---- | ------- |
| `Hero.jsx` | Full-bleed cinematic hero with looping video, split-letter intro, parallax. |
| `Marquee.jsx` / `MarqueeStrip.jsx` | Seamless infinite marquee primitive. |
| `Manifesto.jsx` | Editorial split block — copy + 3-up grandparents grid. |
| `ProductShowcase.jsx` | Color-shifting flavour selector with cross-fade product art. |
| `Ingredients.jsx` | 5-up ingredient grid on ink ground with hover hairlines. |
| `Lifestyle.jsx` | Bento gallery of brand photography. |
| `Reviews.jsx` | Pink-on-cream pull quotes. |
| `Newsletter.jsx` | Neon-green email capture (stubbed; wire to Klaviyo). |
| `FinalCTA.jsx` | Closing dramatic call-to-action. |
| `SiteHeader.jsx` / `SiteFooter.jsx` | Fixed glassmorphic header + dark editorial footer. |
| `Reveal.jsx` | IntersectionObserver-driven fade/translate primitive. |

Brand imagery (grandparents, lifestyle shots, flavor textures, hero video)
lives under `public/images` and `public/videos`. These were copied verbatim
from the v1 repo.

## i18n

Hebrew (`he`) is the default and `<html dir="rtl">` is set at the root.
Switching to English uses `?lang=en` (or, in the future, an `/en` path
prefix). All copy lives in `app/lib/i18n.js`. The header has a built-in
language switcher.

## What is intentionally *not* here yet

This commit ships the **homepage + global chrome**. Follow-up tasks:

- [ ] Replace the mock flavor data in `ProductShowcase` with live products
      from the Storefront API.
- [ ] Custom designs for collection grid, product detail page, cart drawer,
      account / login flow.
- [ ] Klaviyo (or equivalent) wiring for `Newsletter.jsx`.
- [ ] Locale path-prefix routing (`/en/products/…`).
- [ ] Lighthouse pass (image sizing, font preload, video poster optimization).

## Why a new repo?

The v1 site is a custom Remix app talking to the Storefront API directly.
This v2 sits on top of Hydrogen, which gives us caching, Oxygen deployment,
React Router 7 data loading, and the `Analytics.Provider` story for free —
all things we would otherwise reinvent. Starting from the skeleton instead
of retrofitting v1 is faster than untangling, and lets us preserve v1 as a
working production reference while we iterate.
