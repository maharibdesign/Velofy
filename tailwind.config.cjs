/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#007aff', light: '#3395ff', dark: '#005fcc' },
        gray: { 50: '#f8f9fa', 100: '#e9ecef', 200: '#dee2e6', 300: '#ced4da', 400: '#adb5bd', 500: '#6c757d', 600: '#495057', 700: '#343a40', 800: '#212529', 900: '#1a1d20' },
      },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      boxShadow: { 'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', 'soft-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.02)' }
    },
  },
  plugins: [],
}