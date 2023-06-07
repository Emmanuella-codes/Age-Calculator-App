/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/flowbite/**/*.js',
  ],
  theme: {
    extend: {},
    screens: {
      lg: '992px',
      md: '768px',
      sm: '480px',
    },
  },
  plugins: [require('flowbite/plugin')],
};
