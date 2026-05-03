import {clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

/**
 * Merge classnames with Tailwind conflict resolution.
 * @param  {...any} inputs
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
