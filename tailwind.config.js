/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2C5F5D",
        secondary: "#66AAA6",
        accent: "#4fc08d",
      },
    },
  },
  plugins: [],
};
