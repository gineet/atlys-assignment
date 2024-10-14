/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: 'Inter, sans-serif',
      },
      lineHeight: {
        'atlys-regular': 1.21,
      },
      boxShadow: {
        'function-card': '0px 0px 6px 0px #0000000D',
      },
      colors: {
        'atlys-yellow-100': '#FFEED5',
        'atlys-yellow-200': '#FFC267',
        'atlys-yellow-800': '#E29A2D',

        'atlys-white': '#F5F5F5',
        'atlys-white-200': '#A5A5A5',

        'atlys-grey-100': '#DBDBDB',
        'atlys-grey-200': '#D3D3D3',
        'atlys-grey-300': '#DFDFDF',
        'atlys-grey-400': '#585757',
        'atlys-grey-500': '#252525',

        'atlys-green-100': '#C5F2DA',
        'atlys-green-200': '#2DD179',
        'atlys-green-800': '#4CAF79',

        'atlys-blue-100': '#0066FF4D',
        'atlys-blue-300': '#0066FF',

      },
      fontSize: {
        'xxs': '0.625rem',
      }
    },
  },
  plugins: [],
}

