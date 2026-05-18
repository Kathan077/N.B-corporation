/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Outfit', 'sans-serif'],
        mono: ['Outfit', 'sans-serif'],
        serif: ['Outfit', 'sans-serif'],
      },
      colors: {
        brand: {
          red: '#DC2626', // Vibrant Pro Red
          dark: '#991B1B',
          soft: '#FEF2F2',
        }
      },
      animation: {
        'slow-bounce': 'bounce 3s infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
