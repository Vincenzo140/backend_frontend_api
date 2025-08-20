/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'purple-dark': '#5D3FD3',
        'orange-burnt': '#FF6B35',
        'yellow-soft': '#FFD23F',
        'gray-hot': '#2E2E2E',
        'gray-light': '#F4F4F4',
      },
    },
  },
  plugins: [],
}
