/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/*.{html,ts,js}',
    './src/scripts/*.{html,ts,js}',
  ],
  theme: {
    extend: {
      colors: {
        'tooltip-black': 'rgba(0, 0, 0, 0.65)',
      },
      spacing: {
        '9.5': '2.375rem',
        '16': '4rem',
        '18': '4.5rem',
        '3/10': '30%',
        '4/10': '40%',
        '17/40': '42.5%',
        '44': '44%',
        '9/20': '45%',
        '47.5': '47.5%',
        '48': '48%',
        '52.5': '52.5%',
        '11/20': '55%',
        '3/5': '60%',
        '13/20': '65%',
        '7/10': '70%',
        '8/10': '80%',
        '17/20': '85%',
        '9/10': '90%',
        '180': '180px',
        '260': '260px',
      },
    },
  },
  plugins: [],
}
