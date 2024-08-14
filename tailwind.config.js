/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        red: {
          1: "#E60023", //default color of the website
          2: "#ba001d", // Slightly darker shade
        },
        blue: {
          1: "#0076D3", //for animated headings
        },
        green: {
          1: "#507A57",
        },
        yellow: {
          1: "#C28B00",
        },
      },
      fontFamily: {
        mbold: ["Montserrat-Bold", "sans-serif"],
        mmedium: ["Montserrat-Medium", "sans-serif"],
        nbold: ["Nunito-Bold", "sans-serif"],
        nregular: ["Nunito-Regular", "sans-serif"],
        ubold: ["Ubuntu-Bold", "sans-serif"],
        uregular: ["Ubuntu-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
