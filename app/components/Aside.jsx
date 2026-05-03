import {createContext, useContext, useEffect, useId, useState} from 'react';
import {cn} from '~/lib/cn';

/**
 * Brand-styled side drawer with overlay. Supports cart, search, mobile menu.
 *
 * @param {{
 *   children?: React.ReactNode;
 *   type: AsideType;
 *   heading: React.ReactNode;
 * }}
 */
export function Aside({children, heading, type}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;
  const id = useId();

  useEffect(() => {
    const abortController = new AbortController();
    if (expanded) {
      document.body.style.overflow = 'hidden';
      document.addEventListener(
        'keydown',
        (event) => event.key === 'Escape' && close(),
        {signal: abortController.signal},
      );
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      abortController.abort();
      document.body.style.overflow = '';
    };
  }, [close, expanded]);

  return (
    <div
      aria-modal
      role="dialog"
      aria-labelledby={id}
      className={cn(
        'pointer-events-none fixed inset-0 z-[80]',
        expanded && 'pointer-events-auto',
      )}
    >
      {/* Overlay */}
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className={cn(
          'absolute inset-0 bg-rude-ink/40 backdrop-blur-sm transition-opacity duration-500',
          expanded ? 'opacity-100' : 'opacity-0',
        )}
        style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
      />

      {/* Drawer — sits at the inline-end edge. CSS `translateX` is not
          flipped by `dir="rtl"`, so we hide it with +100% in LTR but
          -100% in RTL (where end-0 == left:0). */}
      <aside
        className={cn(
          'absolute end-0 top-0 flex h-full w-full max-w-[var(--aside-width)] flex-col bg-rude-cream text-rude-ink shadow-2xl transition-transform duration-500',
          expanded
            ? 'translate-x-0'
            : 'ltr:translate-x-full rtl:-translate-x-full',
        )}
        style={{transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'}}
      >
        <header className="flex items-center justify-between border-b border-rude-ink/10 px-6 py-5">
          <h3
            id={id}
            className="font-display text-xl uppercase tracking-tight"
          >
            {heading}
          </h3>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="flex size-9 items-center justify-center rounded-pill text-rude-ink/70 transition hover:bg-rude-ink/10 hover:text-rude-ink"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
              <path
                d="M1 1l12 12M13 1L1 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </aside>
    </div>
  );
}

const AsideContext = createContext(null);

Aside.Provider = function AsideProvider({children}) {
  const [type, setType] = useState('closed');
  return (
    <AsideContext.Provider
      value={{type, open: setType, close: () => setType('closed')}}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}

/** @typedef {'search' | 'cart' | 'mobile' | 'closed'} AsideType */
