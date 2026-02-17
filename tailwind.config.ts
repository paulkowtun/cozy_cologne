import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          'warm-dark': '#9D8D76',
          'warm-light': '#EDE6CF',
        },
        neutral: {
          dark: '#7A7E81',
          light: '#A6A8A5',
        },
        page: {
          white: '#FAFAF8',
          black: '#2C2C2C',
        },
      },
      fontFamily: {
        heading: ['Comfortaa', 'cursive'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        brand: '10px',
      },
    },
  },
  plugins: [],
} satisfies Config;
