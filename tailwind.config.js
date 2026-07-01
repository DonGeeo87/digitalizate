/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}', './src/**/*.css'],
  theme: {
    extend: {
      colors: {
        brand: '#10b981',
        'brand-dark': '#059669',
        'brand-light': '#34d399',
        'brand-bg': '#ecfdf5',
      },
    },
  },
  plugins: [],
}
