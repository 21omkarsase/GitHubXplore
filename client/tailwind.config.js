/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html,css}"],
  theme: {
    extend: {},
  },
  variants: {
    scrollbar: ['rounded']
  },
  plugins: [
    require('tailwind-scrollbar')
  ],
}
