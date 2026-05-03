import {Marquee} from './Marquee';

/**
 * Bold marquee strip used between sections. Two contrasting bands:
 *  - Top: ink/neon
 *  - Bottom: cream/cherry
 *
 * @param {{ items: string[] }} props
 */
export function MarqueeStrip({items}) {
  return (
    <section className="relative isolate -mt-px bg-rude-ink py-8 text-rude-cream md:py-10">
      <Marquee
        items={items}
        itemClassName="text-display-lg leading-none px-2 text-rude-cream"
        separator={
          <span
            aria-hidden
            className="mx-8 inline-block h-3 w-3 -translate-y-1 rotate-45 bg-rude-neon"
          />
        }
      />
    </section>
  );
}
