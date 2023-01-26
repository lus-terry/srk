/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        'black-300': '#161B22',
        'black-400': '#242C38',
        'black-100': '#0D1117',
        'white-800': '#D0DFFF',
        'white-400': '#A3B3BC',
        'primary-blue': '#2190FF',
        'secondary-purple': '#8C7CFF',
        'secondary-red': '#F16565',
        'secondary-pink': '#ED5FBD',
        'secondary-orange': '#FF964B',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
