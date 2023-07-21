/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],

  
  theme: {
    extend: {
      colors: {
        black: {
          100: "#dfdfdf",
          200: "#bbbcbd",
          300: "#989a9b",
          400: "#77797b",
          500: "#393d40",
          600: "#333739",
          700: "#181819",
          800: "rgb(19,19,19)",
          900: "#0e0e0e",
        },
        yellow: {
          500: "#FAD200",
          600: "#FFDA2A",
          700: "#EAD13D",
          800: "#E8BD00",
          900: "#EA9C00",
        },
        white: {
          900: "#ffffff",
        },
      },
      screens: {
        "wide-tablet": { max: "1450px" },
        tablet: { max: "1100px" },
        mobile: { max: "768px" },
        "min-mobile": { max: "527px" },
      },
      gradientMenu: {
        grad: "linear-gradient(106deg, rgba(51,55,57,1) 0%, rgba(24,24,25,1) 48%, rgba(51,55,57,1) 100%)",
      }
    },
  },
  plugins: [],
};
