/** @type {import('tailwindcss').Config} */

export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#F0F9FF',
          200: '#E0F2FE',
          300: '#BAE6FD',
          400: '#7DD3FC',
          500: '#38BDF8',
          600: '#0EA5E9',
          700: '#0284C7',
          800: '#0369A1',
          900: '#075985',
        },
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
}