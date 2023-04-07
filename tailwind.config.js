import colors from "tailwindcss/colors";
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/renderer/**/*.{html,js,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: colors.red[50],
          100: colors.red[100],
          200: colors.red[200],
          300: colors.red[300],
          400: colors.red[400],
          500: colors.red[500],
          600: colors.red[600],
          700: colors.red[700],
          800: colors.red[800],
          900: colors.red[900],
          950: colors.red[950],
        },
      },
      fontFamily: {
        body: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        login: "url('/assets/img/bg2.png')",
      },
    },
  },
  plugins: [],
};
