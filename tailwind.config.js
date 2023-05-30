/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f7f4ef",
        secondary: "#161616",
        accent: "rgb(60, 128, 254)",
        "accent-dark": "#1f6ab5", // Added accent-dark color
      },
    },
  },
  plugins: [],
};
