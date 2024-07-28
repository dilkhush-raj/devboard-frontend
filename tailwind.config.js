// const {
//   default: flattenColorPalette,
// } = require("tailwindcss/lib/util/flattenColorPalette");
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */

function addVariablesForColors({addBase, theme}) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#80B0F0",
          200: "#6BA2EE",
          300: "#5597EA",
          400: "#4089E8",
          500: "#2B7DE6",
        },
        dark: {
          100: "#3A4E66",
          200: "#33435A",
          300: "#2D3B50",
          400: "#253243",
          500: "#202B39",
          600: "#1B212D",
          700: "#121A22",
          800: "#0D1118",
          900: "#07090B",
        },
        light: {
          100: "#F4F8FF",
          200: "#E9F2FC",
          300: "#DFEAFC",
          400: "#D5E4FA",
          500: "#C9DFFA",
          600: "#BFD9F7",
          700: "#B6D1F6",
          800: "#ABCBF6",
          900: "#A0C4F4",
        },
        darkColor: {
          100: "#000000",
          150: "#07090B",
          200: "#07090B",
          300: "#0D1118",
          400: "#121A22",
          500: "#1B212D",
        },
        lightColor: {
          900: "#FFFFFF",
          800: "#F4F6F8",
          850: "#FDFDFD",
          750: "#EDF1F9",
          600: "#DCE3F1",
          700: "#DCE3F1",
          500: "#7B8EC8",
          400: "#858EAD",
        },
        border: {
          100: "#C8CBD966",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #2563EB, #2196F3)",
      },
      screens: {
        xl: "1480px",
      },
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        spotlight: "spotlight 2s ease .75s 1 forwards",
      },
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
      },
    },
  },
  plugins: [
    addVariablesForColors,
    function ({addUtilities}) {
      addUtilities({
        ".hide-scrollbar": {
          "::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-overflow-style": "none", // IE and Edge
          "scrollbar-width": "none", // Firefox
        },
      });
    },
  ],
};
