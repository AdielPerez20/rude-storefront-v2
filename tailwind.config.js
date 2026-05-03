/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        rude: {
          berry: '#811A35',
          'berry-deep': '#5C0F23',
          cherry: '#C8102E',
          pink: '#FF1E7A',
          'pink-soft': '#FFB8D6',
          cream: '#F5F2EC',
          bone: '#F8F5F0',
          lilac: '#DAD6FF',
          yellow: '#DCE68D',
          neon: '#DBFF00',
          'neon-soft': '#E8FF66',
          olive: '#2D5A1E',
          sky: '#1A6CC8',
          ink: '#0A0A0A',
          shadow: '#1A1A1A',
        },
      },
      fontFamily: {
        display: ['"Anton"', '"Heebo"', 'sans-serif'],
        sans: ['"Inter"', '"Heebo"', 'system-ui', 'sans-serif'],
        hebrew: ['"Rubik"', '"Heebo"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Tightened editorial scale — large but no longer billboard-sized.
        'display-3xl': [
          'clamp(2.75rem, 8vw, 6.5rem)',
          { lineHeight: '0.92', letterSpacing: '-0.03em' },
        ],
        'display-2xl': [
          'clamp(2.25rem, 6vw, 5rem)',
          { lineHeight: '0.95', letterSpacing: '-0.025em' },
        ],
        'display-xl': [
          'clamp(1.75rem, 4.25vw, 3.5rem)',
          { lineHeight: '1', letterSpacing: '-0.02em' },
        ],
        'display-lg': [
          'clamp(1.5rem, 3.25vw, 2.5rem)',
          { lineHeight: '1.05', letterSpacing: '-0.018em' },
        ],
        heading: [
          'clamp(1.4rem, 2.4vw, 2rem)',
          { lineHeight: '1.1', letterSpacing: '-0.015em' },
        ],
        subheading: [
          'clamp(1.125rem, 1.6vw, 1.375rem)',
          { lineHeight: '1.25', letterSpacing: '-0.01em' },
        ],
        'body-lg': ['1.0625rem', { lineHeight: '1.6' }],
        body: ['0.9375rem', { lineHeight: '1.6' }],
        caption: ['0.8125rem', { lineHeight: '1.5' }],
        micro: [
          '0.6875rem',
          { lineHeight: '1.4', letterSpacing: '0.12em' },
        ],
      },
      spacing: {
        section: 'clamp(3rem, 7vh, 5.5rem)',
        'section-sm': 'clamp(2rem, 4vh, 3rem)',
      },
      borderRadius: {
        rude: '2px',
        pill: '999px',
      },
      transitionTimingFunction: {
        'rude-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'rude-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'rude-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { filter: 'brightness(1) saturate(1)' },
          '50%': { filter: 'brightness(1.15) saturate(1.2)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'marquee-fast': 'marquee 18s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'scale-in': 'scale-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-down': 'fade-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        glow: 'glow 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      backgroundImage: {
        'noise-texture':
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.45'/></svg>\")",
        'grain-light':
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.18'/></svg>\")",
        'rude-gradient':
          'radial-gradient(ellipse at top, #FF1E7A 0%, #811A35 45%, #0A0A0A 100%)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-none': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-none::-webkit-scrollbar': { display: 'none' },
        '.text-balance': { 'text-wrap': 'balance' },
        '.text-pretty': { 'text-wrap': 'pretty' },
        '.mask-fade-r': {
          'mask-image':
            'linear-gradient(to right, black 0%, black 80%, transparent 100%)',
        },
        '.mask-fade-b': {
          'mask-image':
            'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
        },
      });
    },
  ],
};
