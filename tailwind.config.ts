import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Quicksand', ...defaultTheme.fontFamily.sans],
        'retro': ['"Press Start 2P"', 'cursive'],
        'retro-text': ['VT323', 'monospace'],
        'retro-alt': ['Silkscreen', 'cursive'],
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
          950: 'rgb(var(--tw-color-primary-950) / <alpha-value>)',
        },
        dark: '#222222',
        retro: {
          'purple': '#7b00ff',
          'cyan': '#00f0ff',
          'pink': '#ff00ff',
          'yellow': '#ffff00',
          'blue': '#0080ff',
          'green': '#33ff33',
          'orange': '#ff8000',
          'black': '#000033',
          'bg': '#000440',
        },
        'retro-bg': 'var(--color-retro-bg)',
        'retro-black': 'var(--color-retro-black)',
        'retro-cyan': 'var(--color-cyan-neon)',
        'retro-pink': 'var(--color-pink-neon)',
        'retro-purple': 'var(--color-purple-neon)',
        'retro-yellow': 'var(--color-yellow-neon)',
        'retro-blue': 'var(--color-retro-blue)',
        'retro-green': 'var(--color-retro-green)',
        'retro-orange': 'var(--color-retro-orange)',
        'retro-teal': 'var(--color-retro-teal)',
      },
      backgroundImage: () => ({
        'grid-lines':
          'linear-gradient(var(--color-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid-line) 1px, transparent 1px)',
      }),
      backgroundSize: {
        'grid-30': '30px 30px',
      },
      fontSize: {
        '2xs': '0.625rem', // 10px
      },
      lineHeight: {
        'extra-loose': '2.5',
      },
      spacing: {
        '9/16': '56.25%',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-5px, 5px)' },
          '40%': { transform: 'translate(-5px, -5px)' },
          '60%': { transform: 'translate(5px, 5px)' },
          '80%': { transform: 'translate(5px, -5px)' },
        }
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        blink: 'blink 1s step-end infinite',
        glitch: 'glitch 0.5s ease-in-out infinite',
      },
      boxShadow: {
        'retro-neon': '0 0 5px #fff, 0 0 10px #fff, 0 0 15px #00f0ff, 0 0 20px #00f0ff, 0 0 25px #00f0ff',
        'retro-card': '5px 5px 0px #00f0ff',
        'retro-card-hover': '8px 8px 0px #ff00ff',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
