/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lavender: {
          light: '#f3e8ff',
          DEFAULT: '#e9d5ff',
          dark: '#c084fc',
        },
      },
    },
  },
  plugins: [],
}