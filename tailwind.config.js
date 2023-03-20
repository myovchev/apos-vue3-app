const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './modules/**/*.{html,vue}',
    './views/**/*.html',
    'node_modules/@myovchev/todo-vue3/dist/**/*'
  ],
  theme: {
    fontFamily: {
      // the below Montserrat font is also a sans-serif
      sans: [ '"Montserrat"', ...defaultTheme.fontFamily.sans ]
    },
    extend: {}
  },
  plugins: []
};
