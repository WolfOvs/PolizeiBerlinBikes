/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,scss}'],

  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eefaff',
          100: '#d8f2ff',
          200: '#b9e9ff',
          300: '#89ddff',
          400: '#52c8ff',
          500: '#2aaaff',
          600: '#0f8bfd',
          700: '#0c74e9',
          800: '#115dbc',
          900: '#145094',
          950: '#11315a',
        },
      },
    },
  },
  plugins: [],
  // corePlugins: {
  //   preflight: false,
  // },
};
