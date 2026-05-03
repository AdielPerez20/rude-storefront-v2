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
    <section className="relative isolate -mt-px bg-rude-ink py-3 text-rude-cream md:py-4">
      <Marquee
        items={items}
        itemClassName="font-display text-base leading-none px-1.5 text-rude-cream md:text-lg"
        separator={
          <span
            aria-hidden
            className="mx-5 inline-block h-1.5 w-1.5 rotate-45 bg-rude-pink md:mx-6"
          />
        }
      />
    </section>
  );
}
