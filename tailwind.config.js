/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',

  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  theme: {
    screens: {
      xs: '300px',
      sm: '640px',
      md: '1024px',
      lg: '1280px',
      xl: '1536px',
    },
    extend: {
      colors: {
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',

        background: 'var(--background)',

        surface: 'var(--surface)',

        textPrimary: 'var(--text-primary)',
        textSecondary: 'var(--text-secondary)',

        dark: 'var(--dark)',
      },

      borderRadius: {
        card: '16px',
      },

      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.08)',
      },
    },
  },

  plugins: [],
};
