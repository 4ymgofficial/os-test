/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#9B1B1B',
          dark: '#7A1515',
          light: '#C0392B',
          accent: '#F5A623',
          'accent-hover': '#E09212',
          bg: '#0A0A0A',
          card: '#141414',
          elevated: '#1C1C1C',
          border: '#282828',
          text: '#F0F0F0',
          muted: '#9A9A9A',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
