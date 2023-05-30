/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        orange: "#FE5C3E",
        black: "#040404",
      },
      flex: {
        big: "1 1 60%",
        small: "1 1 40%",
      },
    },
  },
  plugins: [],
};
