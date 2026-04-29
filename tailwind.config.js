/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f5f5f3',
          100: '#e8e8e3',
          300: '#a8a89f',
          500: '#6c6c63',
          700: '#2a2a26',
          900: '#0a0a09',
          950: '#050504',
        },
        accent: {
          gold: '#d9b26f',
          copper: '#c08457',
          crimson: '#c0392b',
          teal: '#0f766e',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        'marquee': 'marquee 40s linear infinite',
        'shimmer': 'shimmer 2.4s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(110deg, #d9b26f 0%, #f4d99a 40%, #d9b26f 80%)',
      },
    },
  },
  plugins: [],
}
