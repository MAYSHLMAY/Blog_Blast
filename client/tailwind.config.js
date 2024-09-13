/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      animation: {
        slideIn: 'slideIn 0.3s ease-out',
        fadeIn: 'fadeIn 0.3s ease-out',
        loading: 'loading 1s infinite alternate',
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        loading: {
          '0%': { opacity: '0.3', transform: 'scale(1)' },
          '100%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
      height: {
        '80vh': '80vh',
      },
      colors: {
        'primary': '#1e375a',
        'secondary': '#0056b3',
        'error': '#ff4d4d',
        'error-dark': '#e60000',
        'message-user-bg': '#d1e7dd',
        'message-bot-bg': '#f1f1f1',
      },
      borderRadius: {
        'lg': '12px',
        'xl': '20px',
      },
      spacing: {
        'input-padding': '10px',
        'button-padding': '10px 20px',
        'modal-padding': '15px',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
}
