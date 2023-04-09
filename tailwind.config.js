/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors:{
        purple:"#FFE3EB",
        darkRed:"#AC6572",
        orange:"#FFBB66",
        hoverBtn:"#00C9C8",
        detailCardBg:"#4B4A54",
      }
    },
  },
  plugins: [],
}
