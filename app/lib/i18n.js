/**
 * Lightweight i18n: Hebrew is primary (RTL), English available.
 * Locale resolves via `?lang=…` query, else default. Copy mirrors the
 * production dailyrude.com voice.
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
      eyebrow: 'ללא סוכר · רכיבים טבעיים · תוצרת ישראל',
      tagline:
        'משקה האלקטרוליטים הראשון שבאמת תרצו לשתות. פרימיום. ללא סוכר. ללא פשרות.',
      ctaPrimary: 'קנו עכשיו',
      ctaSecondary: 'מידע נוסף',
    },
    valueStrip: ['ללא סוכר', 'רכיבים טבעיים', 'תוצרת ישראל'],
    marquee: [
      'ללא סוכר',
      'תוצרת ישראל',
      'נתרן · מגנזיום · אשלגן',
      'משלוח חינם מ־250 ₪',
      'מנוי וחיסכון',
    ],
    productsLineup: {
      eyebrow: 'הקולקציה',
      title: 'בחרו את שלכם.',
      sub: 'אלקטרוליטים, קריאטין, ובאנדלים. כולם תוצרת ישראל.',
    },
    featuredElectrolytes: {
      kicker: 'הכירו את',
      titleA: 'RUDE',
      titleB: 'אלקטרוליטים.',
      desc: 'המשקה הראשון שבאמת תרצו לשתות. פרימיום. ללא סוכר. ללא פשרות.',
      bullets: ['ללא סוכר', 'רכיבים טבעיים', 'תוצרת ישראל', '20 סטיקים לקופסה'],
      ctaPrimary: 'קנו עכשיו',
      ctaSecondary: 'מידע נוסף',
    },
    featuredCreatine: {
      kicker: 'הכירו את',
      titleA: 'RUDE',
      titleB: 'קריאטין.',
      desc: 'קריאטין מונוהידראט טהור 100%. יותר כוח, יותר מסה, התאוששות מהירה — בלי שטויות.',
      bullets: [
        'קריאטין מונוהידראט טהור 100%',
        'מגביר כוח ומסת שריר',
        'מאיץ התאוששות',
        'ללא תוספים מיותרים',
      ],
      ctaPrimary: 'קנו עכשיו',
      ctaSecondary: 'מידע נוסף',
    },
    benefits: {
      title: 'למה RUDE?',
      sub: 'כי מגיע לכם יותר מהרגיל.',
      items: [
        {
          title: 'הידרציה.',
          desc: 'איזון אלקטרוליטים שישמור עליכם בשיא. בלי קריסות, בלי פשרות.',
        },
        {
          title: 'אנרגיה.',
          desc: 'אנרגיה טבעית שבאמת עובדת. תרגישו תוך דקות, לא בפרסומות.',
        },
        {
          title: 'התאוששות.',
          desc: 'חוזרים מהר יותר. אחרי אימון, אחרי לילה ארוך, או סתם יום כבד.',
        },
      ],
    },
    howto: {
      title: 'איך משתמשים',
      sub: 'פשוט בטירוף.',
      steps: [
        {n: '01', label: 'קורעים סטיק אחד'},
        {n: '02', label: 'שופכים לתוך מים'},
        {n: '03', label: 'מערבבים ושותים'},
      ],
      note: 'סטיק אחד ביום. או כשצריך. אין חוקים.',
    },
    creatineBenefits: {
      title: 'מה קריאטין נותן לכם?',
      sub: 'הוכח קלינית. בלי הבטחות שווא.',
      items: [
        {title: 'יותר כוח', desc: 'הגדלת ביצועים אנאירוביים בעד 15%.'},
        {title: 'מסת שריר', desc: 'תמיכה בבניית שריר רזה לאורך זמן.'},
        {title: 'התאוששות', desc: 'הפחתת נזק שרירי ושיפור ההתאוששות.'},
        {title: 'פוקוס מנטלי', desc: 'תמיכה בתפקוד קוגניטיבי תחת עומס.'},
      ],
    },
    ingredients: {
      eyebrow: 'מה בפנים',
      title: 'חמישה אלקטרוליטים. אטיטיוד אחד.',
      sub: 'ריכוז קליני. בלי סוכר. בלי תירוצים.',
    },
    subscription: {
      title: 'אף פעם לא תיגמרו.',
      sub: 'הצטרפו למועדון רוּד.',
      desc: 'משלוח חודשי לבית. ביטול בכל זמן. חברי מועדון מקבלים הטבות שאחרים לא.',
      benefits: ['משלוח חינם', 'ביטול בכל זמן', 'השקות בלעדיות'],
      cta: 'הירשמו וחסכו',
    },
    bundle: {
      title: 'ארזו ביחד.',
      sub: 'יותר קופסאות, פחות לשלם.',
      tiers: [
        {boxes: 1, label: 'קופסה אחת', save: null},
        {boxes: 2, label: '2 קופסאות', save: '10%'},
        {boxes: 3, label: '3 קופסאות', save: '15%', best: true},
        {boxes: 4, label: '4 קופסאות', save: '20%'},
      ],
      cta: 'בנו את החבילה',
    },
    reviews: {
      eyebrow: 'העם דיבר',
      title: 'הם כותבים. אנחנו לא מתערבבים.',
    },
    faq: {
      title: 'יש שאלות?',
      sub: 'יש לנו תשובות.',
      items: [
        {
          q: 'כמה סטיקים צריך לקחת ביום?',
          a: 'סטיק אחד ביום מספיק. אפשר גם יותר בימים אקטיביים.',
        },
        {q: 'יש סוכר במוצר?', a: 'אפס סוכר. לגמרי.'},
        {
          q: 'מתי אפשר לקחת את זה?',
          a: 'בכל זמן. בוקר, אחרי אימון, אחרי מסיבה. אין חוקים.',
        },
        {
          q: 'איך משתלב בתזונה קטוגנית או צמחונית?',
          a: 'מתאים לתזונה קטוגנית, ללא גלוטן וצמחונית. ללא תוספים מן החי.',
        },
      ],
      ctaAll: 'כל השאלות',
    },
    email: {
      title: 'תישארו רוּד.',
      sub: 'מבצעים, השקות, בלי ספאם.',
      placeholder: 'האימייל שלכם',
      cta: 'הצטרפו',
      smallPrint: 'בלי ספאם. מבטיחים.',
    },
    finalCta: {
      title: 'מוכנים',
      titleAccent: 'להרגיש?',
      cta: 'קנו RUDE',
    },
    footer: {
      tagline: 'תרגישו את ההבדל.',
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
      eyebrow: 'No sugar · Natural ingredients · Made in Israel',
      tagline:
        'The first electrolyte drink you actually want to drink. Premium. Zero sugar. Zero compromise.',
      ctaPrimary: 'Shop now',
      ctaSecondary: 'Learn more',
    },
    valueStrip: ['No sugar', 'Natural ingredients', 'Made in Israel'],
    marquee: [
      'Sugar-free',
      'Made in Israel',
      'Sodium · Magnesium · Potassium',
      'Free shipping over 250₪',
      'Subscribe & save',
    ],
    productsLineup: {
      eyebrow: 'The line-up',
      title: 'Pick yours.',
      sub: 'Electrolytes, creatine, and bundles. All made in Israel.',
    },
    featuredElectrolytes: {
      kicker: 'Introducing.',
      titleA: 'RUDE',
      titleB: 'ELECTROLYTES.',
      desc: 'The first electrolyte drink you actually want to drink. Premium. Zero sugar. Zero compromise.',
      bullets: ['Zero sugar', 'Natural ingredients', 'Made in Israel', '20 sticks per box'],
      ctaPrimary: 'Shop now',
      ctaSecondary: 'Learn more',
    },
    featuredCreatine: {
      kicker: 'Introducing.',
      titleA: 'RUDE',
      titleB: 'CREATINE.',
      desc: '100% pure creatine monohydrate. More strength, more mass, faster recovery — no BS.',
      bullets: [
        '100% pure creatine monohydrate',
        'Increases strength & muscle mass',
        'Speeds up recovery',
        'No unnecessary additives',
      ],
      ctaPrimary: 'Shop now',
      ctaSecondary: 'Learn more',
    },
    benefits: {
      title: 'WHY RUDE?',
      sub: 'because you deserve better than basic.',
      items: [
        {
          title: 'HYDRATE.',
          desc: 'Optimal electrolyte balance to keep you performing at your peak. No crash, no junk.',
        },
        {
          title: 'RECHARGE.',
          desc: 'Natural energy support that actually works. Feel it in minutes, not marketing.',
        },
        {
          title: 'RECOVER.',
          desc: 'Bounce back faster. After workouts, late nights, or just a long day.',
        },
      ],
    },
    howto: {
      title: 'HOW TO USE',
      sub: 'dead simple.',
      steps: [
        {n: '01', label: 'Tear open one stick'},
        {n: '02', label: 'Pour into water'},
        {n: '03', label: 'Mix and drink'},
      ],
      note: 'One stick per day. Or whenever you need it. No rules.',
    },
    creatineBenefits: {
      title: 'WHAT CREATINE DOES.',
      sub: 'Clinically proven. No empty promises.',
      items: [
        {title: 'More strength', desc: 'Up to 15% improvement in anaerobic performance.'},
        {title: 'Lean mass', desc: 'Supports lean muscle growth over time.'},
        {title: 'Recovery', desc: 'Reduced muscle damage, faster bounce-back.'},
        {title: 'Mental focus', desc: 'Cognitive support under load.'},
      ],
    },
    ingredients: {
      eyebrow: 'WHAT IS INSIDE',
      title: 'Five electrolytes. One attitude.',
      sub: 'Clinical doses. No sugar. No excuses.',
    },
    subscription: {
      title: 'NEVER RUN OUT.',
      sub: 'join the rude club.',
      desc: 'Monthly delivery. Cancel anytime. Members get exclusive perks.',
      benefits: ['Free shipping', 'Cancel anytime', 'Exclusive drops'],
      cta: 'SUBSCRIBE & SAVE',
    },
    bundle: {
      title: 'BUNDLE UP.',
      sub: 'stock up, save more.',
      tiers: [
        {boxes: 1, label: '1 box', save: null},
        {boxes: 2, label: '2 boxes', save: '10%'},
        {boxes: 3, label: '3 boxes', save: '15%', best: true},
        {boxes: 4, label: '4 boxes', save: '20%'},
      ],
      cta: 'BUILD YOUR BUNDLE',
    },
    reviews: {
      eyebrow: 'They talked',
      title: 'They write. We do not interrupt.',
    },
    faq: {
      title: 'GOT QUESTIONS?',
      sub: "we've got answers.",
      items: [
        {
          q: 'How many sticks should I take per day?',
          a: 'One stick per day is plenty. You can take more on active days.',
        },
        {q: 'Is there sugar in it?', a: 'Zero sugar. Period.'},
        {
          q: 'When should I take it?',
          a: 'Anytime. Morning, post-workout, post-party. No rules.',
        },
        {
          q: 'Does it fit a keto or vegetarian diet?',
          a: 'Suits keto, gluten-free and vegetarian diets. No animal-derived ingredients.',
        },
      ],
      ctaAll: 'ALL FAQs',
    },
    email: {
      title: 'STAY RUDE.',
      sub: 'drops, deals, and no spam.',
      placeholder: 'your@email.com',
      cta: 'JOIN',
      smallPrint: 'No spam. We promise.',
    },
    finalCta: {
      title: 'READY TO',
      titleAccent: 'FEEL IT?',
      cta: 'SHOP RUDE',
    },
    footer: {
      tagline: 'feel the difference.',
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

/** @param {Request} request */
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
