import {cn} from '~/lib/cn';

/**
 * Infinite horizontal marquee. Duplicates children for seamless loop.
 *
 * @param {{
 *   items: (string | React.ReactNode)[],
 *   speed?: 'slow' | 'normal' | 'fast',
 *   reverse?: boolean,
 *   separator?: React.ReactNode,
 *   className?: string,
 *   itemClassName?: string,
 * }} props
 */
export function Marquee({
  items,
  speed = 'normal',
  reverse = false,
  separator,
  className,
  itemClassName,
}) {
  const animationClass = reverse
    ? 'animate-marquee-reverse'
    : speed === 'fast'
      ? 'animate-marquee-fast'
      : 'animate-marquee';

  const sep = separator ?? (
    <span className="mx-8 inline-block size-1.5 rounded-full bg-current opacity-40" />
  );

  // Duplicate items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <div className={cn('marquee-track', animationClass)}>
        {doubled.map((item, i) => (
          <span
            key={i}
            className={cn(
              'inline-flex shrink-0 items-center font-display uppercase tracking-tight',
              itemClassName,
            )}
          >
            {item}
            {sep}
          </span>
        ))}
      </div>
    </div>
  );
}
