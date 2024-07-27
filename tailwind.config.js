/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A1A1A',
          hover: '#303030',
        },
        background: {
          lighter: '#FBFBFB',
          DEFAULT: '#FAFAFA',
          dark: '#F8F8F8',
          darker: '#F5F5F5',
        },
        border: {
          DEFAULT: '#E1E1E1',
          lighter: '#EAEAEA',
        },
        text: {
          DEFAULT: '#000000',
          light: '#707070',
          lighter: '#8A8A8A',
        },
      },
    },
  },
  plugins: [],
}
