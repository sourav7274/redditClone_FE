/** @type {import('tailwindcss').Config} */


const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        redditBlack: "rgb(14, 17, 19)",
        trailRed: "rgb(230, 57, 70)"
      }
    },
  },
  plugins: [],
});
