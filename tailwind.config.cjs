/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          main: "#303236",
          200: "#282828",
          300: "#25272b",
        },
        highlight: "#f6932d",
        text: {
          100: "#ffffff",
          200: "#9f9fa2",
          300: "#8f9091",
        },
      },
    },
  },
  plugins: [],
};
