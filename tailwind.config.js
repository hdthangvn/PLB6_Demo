/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5F41E4',
        secondary: '#6652BE',
        accent: '#917DE8',
      }
    },
  },
  plugins: [],
}