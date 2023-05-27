/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        custom: ["VT323", "monospace"],
      },
      colors: {
        primary: "#36BA01", // Define your primary color here
        secondary: "#0A0A0A", // Define your secondary color here
      },
    },
  },
  plugins: [],
};

