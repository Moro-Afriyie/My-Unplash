/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        overlay: "rgba(0, 0, 0, 0.38)",
        red: "#EB5757",
      },
    },
  },
  plugins: [],
};
