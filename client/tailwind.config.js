/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        overlay: "rgba(0, 0, 0, 0.38)",
        red: "#EB5757",
        green: "#3DB46D",
        grey: "#BDBDBD",
      },
      boxShadow: {
        buttonShadow: "0px 1px 6px rgba(0, 0, 0, 0.1)",
      },
      dropShadow: {
        inputShadow: "0px 1px 6px rgba(0, 0, 0, 0.1)",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        "noto-sans": ["Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
