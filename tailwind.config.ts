/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '.body--dark'],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  theme: {
    screens: {
      xs: '0px',
      sm: '600px',
      md: '1024px',
      lg: '1440px',
      xl: '1920px',
    },
    extend: {
      colors: {
        foreground: {
          DEFAULT: 'var(--foreground)',
          secondary: 'var(--foreground-secondary)',
        },

        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',

        background: 'var(--background)',

        surface: 'var(--surface)',

        border: 'var(--border)',
        dark: 'var(--dark)',
      },
    },
  },

  plugins: [],
};
