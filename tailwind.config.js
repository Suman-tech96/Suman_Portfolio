/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '400px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#080808',
          900: '#050505',
          800: '#0d0d0f',
          700: '#141417',
          600: '#1c1c21',
        },
        ivory: {
          DEFAULT: '#F5F2EB',
          muted: '#A29E97',
          dark: '#73706B',
        },
        flame: {
          DEFAULT: '#FF4D00',
          hover: '#FF6420',
          glow: 'rgba(255, 77, 0, 0.35)',
          muted: '#9E3200',
        },
        cyanGlow: {
          DEFAULT: '#00F0FF',
          muted: 'rgba(0, 240, 255, 0.2)',
        }
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        serifDisplay: ['"Instrument Serif"', '"Playfair Display"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', '"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Space Mono', 'monospace'],
      },
      letterSpacing: {
        widestEditorial: '0.25em',
        ultra: '0.35em',
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
