/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],

  theme: {



    extend: {
      spacing: {
        '30r': '30rem',
        '36r': '36rem',
        '88': '22rem',
        '104':'26rem',
        '30.5r':'30.5rem',
        "30r":'30rem'
      },
      colors: {
        'primary': '#3bacfb',
      },
      fontSize: {
        xss: ['0.25rem', '0.5rem'],

      },
      height: {
        '1.1r':'1.1rem'
       }
    },
  },

}
