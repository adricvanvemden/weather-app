/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        main: "url('/background.jpg')",
      },
      fontFamily: {
        main: ["Open sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
