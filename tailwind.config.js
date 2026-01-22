/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palo Alto Networks brand colors
        'pan-blue': '#006DCC',
        'pan-dark': '#1a1a2e',
        'pan-gray': '#4a4a68',
      },
    },
  },
  plugins: [],
}
