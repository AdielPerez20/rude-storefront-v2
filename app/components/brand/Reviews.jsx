import {Reveal} from './Reveal';
import {cn} from '~/lib/cn';

const REVIEWS = [
  {
    he: '״לא חזרה לסקוויש בלי. סוף סוף משהו שלא טעם של תרופה.״',
    en: '"I will not show up to squash without it. Finally, something that does not taste like medicine."',
    name: 'יעל ב.',
    role_he: 'תל אביב · משחקנית סקוויש חובבת',
    role_en: 'Tel Aviv · amateur squash player',
  },
  {
    he: '״הסבא שלי שתה את זה בגיל 78. אמר לי: זה תוצרת ישראל?״',
    en: '"My grandfather drank it at 78. He told me: this is made in Israel?"',
    name: 'אורי ש.',
    role_he: 'הוד השרון · ראש מותג',
    role_en: 'Hod HaSharon · brand director',
  },
  {
    he: '״התחלתי עם ליים. לא חוזרת לג׳ל. לא חוזרת לסוכר.״',
    en: '"Started with lime. Not going back to gel. Not going back to sugar."',
    name: 'מאיה ק.',
    role_he: 'אילת · רוכבת אופניים',
    role_en: 'Eilat · road cyclist',
  },
  {
    he: '״הם לא חוסכים בתבלינים. החיתוך הזה — נדיר.״',
    en: '"They do not skimp on the spices. This bite — rare."',
    name: 'תומר ל.',
    role_he: 'הרצליה · שף',
    role_en: 'Herzliya · chef',
  },
];

/**
 * @param {{
 *   t: ReturnType<import('~/lib/i18n').useTranslation>,
 *   locale: 'he' | 'en',
 * }} props
 */
export function Reviews({t, locale}) {
  const isHe = locale === 'he';
  return (
    <section className="relative overflow-hidden bg-rude-pink py-section text-rude-ink">
      <div className="container-rude">
        <Reveal>
          <span className="label-eyebrow !text-rude-ink/70">
            {t.sections.reviews.eyebrow}
          </span>
          <h2 className="display-text mt-4 max-w-3xl text-display-xl text-balance">
            {t.sections.reviews.title}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={Math.min(i, 4)}>
              <article className="group relative flex h-full flex-col gap-8 rounded-rude border border-rude-ink/10 bg-rude-cream p-7 md:p-9">
                <div className="flex items-center gap-2">
                  {Array.from({length: 5}).map((_, idx) => (
                    <Star key={idx} />
                  ))}
                </div>
                <blockquote
                  className={cn(
                    'font-display text-2xl leading-tight text-balance md:text-3xl',
                    isHe && 'font-hebrew',
                  )}
                >
                  {isHe ? r.he : r.en}
                </blockquote>
                <footer className="mt-auto flex items-center gap-3 border-t border-rude-ink/10 pt-5">
                  <span className="flex size-10 items-center justify-center rounded-full bg-rude-ink font-display text-rude-cream">
                    {r.name.split('').filter((c) => /\S/.test(c))[0]}
                  </span>
                  <div>
                    <p className="font-display text-base">{r.name}</p>
                    <p className="font-mono text-micro uppercase tracking-[0.16em] text-rude-ink/60">
                      {isHe ? r.role_he : r.role_en}
                    </p>
                  </div>
                </footer>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
      <path
        d="M7 1l1.7 4 4.3.4-3.3 2.9 1 4.2L7 10.4 3.3 12.5l1-4.2L1 5.4l4.3-.4L7 1z"
        fill="currentColor"
      />
    </svg>
  );
}
