/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Dark Theme (Reddit Black)
        redditBlack: "rgb(14, 17, 19)",
        trailRed: "rgb(230, 57, 70)",
        darkSecondary: "rgb(42, 157, 143)", // teal-green accent
        darkText: "rgb(245, 245, 245)",
        darkMutedText: "rgb(160, 160, 160)",
        darkCard: "rgb(24, 27, 29)",
        darkBorder: "rgb(50, 50, 50)",

        // Light Theme
        lightBackground: "rgb(250, 250, 250)",
        lightPrimary: "rgb(230, 57, 70)", // same red for brand consistency
        lightSecondary: "rgb(38, 70, 83)", // deep teal-blue accent
        lightText: "rgb(20, 20, 20)",
        lightMutedText: "rgb(90, 90, 90)",
        lightCard: "rgb(255, 255, 255)",
        lightBorder: "rgb(225, 225, 225)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
});
