/**
 * Full-bleed 4-up campaign image band. Mirrors dailyrude.com's
 * EditorialBand: TLV street, grandma suit, tennis, hydration summer.
 * No copy — pure visual punctuation between sections.
 */
const TILES = [
  {src: '/images/rude-tlv-street.jpg', alt: 'RUDE — Tel Aviv street'},
  {src: '/images/rude-grandma-suit.jpg', alt: 'RUDE — style'},
  {src: '/images/rude-tennis-raining.jpg', alt: 'RUDE — tennis vibes'},
  {src: '/images/rude-hydration-summer.jpg', alt: 'RUDE — summer hydration'},
];

export function EditorialBand() {
  return (
    <section
      aria-label="campaign band"
      className="relative grid grid-cols-2 md:grid-cols-4"
    >
      {TILES.map((tile) => (
        <figure key={tile.src} className="group relative overflow-hidden">
          <img
            src={tile.src}
            alt={tile.alt}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover object-top transition-transform duration-[1400ms] group-hover:scale-[1.06]"
            style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
          />
          <div
            className="absolute inset-0 bg-rude-ink/0 transition-colors duration-700 group-hover:bg-rude-ink/25"
            aria-hidden
          />
        </figure>
      ))}
    </section>
  );
}
