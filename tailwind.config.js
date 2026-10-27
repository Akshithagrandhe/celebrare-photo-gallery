/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Georgia', 'serif'],
      },
      colors: {
        ink: '#252722',
        paper: '#f7f7f5',
        moss: '#65715a',
      },
      boxShadow: {
        card: '0 10px 32px -18px rgba(35, 38, 30, 0.25)',
      },
    },
  },
  plugins: [],
}
