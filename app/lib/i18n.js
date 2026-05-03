/**
 * Lightweight i18n: Hebrew is primary (RTL), English available.
 * Locale is set via path prefix `/en/...` or query `?lang=en`. Default: he.
 */

const TRANSLATIONS = {
  he: {
    nav: {
      shop: 'חנות',
      products: 'מוצרים',
      story: 'הסיפור',
      bundles: 'באנדלים',
      reviews: 'ביקורות',
      faq: 'שאלות',
      cart: 'סל',
      account: 'חשבון',
      search: 'חיפוש',
      menu: 'תפריט',
    },
    hero: {
      eyebrow: 'אלקטרוליטים. קריאטין. אטיטיוד.',
      titleLine1: 'אל תהיה',
      titleLine2: 'רגיל.',
      tagline: 'הידרציה ישראלית. מוטיבציה מלוכלכת.',
      ctaPrimary: 'תקנו עכשיו',
      ctaSecondary: 'ראו את הסיפור',
    },
    marquee: ['ללא סוכר', 'תוצרת ישראל', 'נטרליום ומגנזיום', 'משלוח חינם מ־250 ₪', 'מנוי בכל חודש'],
    sections: {
      products: {
        eyebrow: '03 / קולקציה',
        title: 'הקולקציה',
        sub: 'בחרו את הטעם. בחרו את הקצב.',
      },
      manifesto: {
        eyebrow: '02 / מניפסט',
        title: 'אנחנו לא חוסכים מילים.',
        body: 'ההורים שלנו אמרו לנו לעצור לרגע, להתבייש, לא להבליט את עצמנו. אנחנו אומרים: תשתו, תזוזו, תהיו על־טבעיים. RUDE זה לא רק שתיה — זו עמדה. נטרליום, מגנזיום, אשלגן, אבץ ואטיטיוד.',
        cta: 'הסיפור המלא',
      },
      ingredients: {
        eyebrow: '04 / רכיבים',
        title: 'מה בפנים, חוץ מאטיטיוד.',
        sub: 'חמישה אלקטרוליטים בריכוז קליני. בלי סוכר. בלי תירוצים.',
      },
      lifestyle: {
        eyebrow: '05 / שטח',
        title: 'אנשים אמיתיים. ישראלים אמיתיים.',
        sub: 'בים, במגרש פאדל, על הקייטבורד, בסבב סבים — RUDE איתם.',
      },
      reviews: {
        eyebrow: '06 / קוראים אותנו',
        title: 'הם כותבים. אנחנו לא מתערבבים.',
      },
      newsletter: {
        eyebrow: '07 / היכנסו לקהילה',
        title: 'הירשמו ותקבלו 15% הנחה.',
        sub: 'דיוורים מצומצמים. השקות ראשונות. בלי ספאם.',
        placeholder: 'האימייל שלך',
        cta: 'הירשם/י',
      },
      finalCta: {
        title: 'מספיק עם החלשים.',
        subtitle: 'הצטרפו ל־RUDE.',
        cta: 'אל החנות',
      },
    },
    footer: {
      tagline: 'הידרציה לאנשים על־טבעיים.',
      shop: 'חנות',
      brand: 'מותג',
      support: 'תמיכה',
      legal: 'משפטי',
      newsletter: 'דיוור',
      rights: 'כל הזכויות שמורות',
    },
  },
  en: {
    nav: {
      shop: 'Shop',
      products: 'Products',
      story: 'Story',
      bundles: 'Bundles',
      reviews: 'Reviews',
      faq: 'FAQ',
      cart: 'Cart',
      account: 'Account',
      search: 'Search',
      menu: 'Menu',
    },
    hero: {
      eyebrow: 'Electrolytes. Creatine. Attitude.',
      titleLine1: "Don't be",
      titleLine2: 'usual.',
      tagline: 'Israeli hydration. Filthy motivation.',
      ctaPrimary: 'Shop now',
      ctaSecondary: 'Watch the story',
    },
    marquee: [
      'Sugar-free',
      'Made in Israel',
      'Sodium + Magnesium',
      'Free shipping over 250₪',
      'Subscribe & save',
    ],
    sections: {
      products: {
        eyebrow: '03 / Collection',
        title: 'The line-up',
        sub: 'Pick a flavour. Pick a pace.',
      },
      manifesto: {
        eyebrow: '02 / Manifesto',
        title: "We don't sugar-coat.",
        body: 'They told us to keep quiet. We say: drink up, move louder, be unreasonable. RUDE is not a beverage — it is a posture. Sodium, magnesium, potassium, zinc and attitude.',
        cta: 'Read the story',
      },
      ingredients: {
        eyebrow: '04 / Ingredients',
        title: 'What is inside, besides attitude.',
        sub: 'Five electrolytes at clinical doses. No sugar. No excuses.',
      },
      lifestyle: {
        eyebrow: '05 / In the field',
        title: 'Real people. Real Israelis.',
        sub: 'On the beach, the padel court, the kiteboard, the grandparents tour — RUDE rides along.',
      },
      reviews: {
        eyebrow: '06 / They talk',
        title: 'They write. We do not interrupt.',
      },
      newsletter: {
        eyebrow: '07 / Join the crew',
        title: 'Sign up. Get 15% off.',
        sub: 'Few emails. Early drops. Zero spam.',
        placeholder: 'Your email',
        cta: 'Subscribe',
      },
      finalCta: {
        title: 'Enough with the meek.',
        subtitle: 'Join RUDE.',
        cta: 'Shop the line',
      },
    },
    footer: {
      tagline: 'Hydration for the unreasonable.',
      shop: 'Shop',
      brand: 'Brand',
      support: 'Support',
      legal: 'Legal',
      newsletter: 'Newsletter',
      rights: 'All rights reserved',
    },
  },
};

export const SUPPORTED_LOCALES = ['he', 'en'];
export const DEFAULT_LOCALE = 'he';

/**
 * Resolve locale from a Request: path prefix `/en/...` wins, else `?lang=en`, else default.
 * @param {Request} request
 */
export function getLocaleFromRequest(request) {
  const url = new URL(request.url);
  const segments = url.pathname.split('/').filter(Boolean);
  const first = segments[0];

  let locale = DEFAULT_LOCALE;
  if (first && SUPPORTED_LOCALES.includes(first)) {
    locale = first;
  } else {
    const q = url.searchParams.get('lang');
    if (q && SUPPORTED_LOCALES.includes(q)) locale = q;
  }

  return {
    locale,
    direction: locale === 'he' ? 'rtl' : 'ltr',
    isRTL: locale === 'he',
  };
}

/** @param {'he' | 'en'} locale */
export function useTranslation(locale) {
  return TRANSLATIONS[locale] ?? TRANSLATIONS[DEFAULT_LOCALE];
}

/** @param {'he' | 'en'} locale */
export function getDictionary(locale) {
  return TRANSLATIONS[locale] ?? TRANSLATIONS[DEFAULT_LOCALE];
}
