import {nextui} from "@nextui-org/react";

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
        "Accent-sky": "#E3F2FD",
        blue: "#2563EB",
        "shadow-100": "#0F1117",
        "shadow-200": "#151821",
        "shadow-300": "#212734",
        "shadow-400": "#21273",
        "shadow-500": "#3F4354",
        white: "#FFFFFF",
        "lite-850": "#FDFDFD",
        "lite-800": "#F4F6F8",
        "lite-700": "#DCE3F1",
        "lite-500": "#7B8EC8",
        "lite-400": "#858EAD",
        primary: {
          500: "#2563EB",
          400: "#2196F3",
        },
        darkColor: {
          100: "#000000",
          150: "#0F1014",
          200: "#0F1116",
          300: "#13151A",
          400: "#212734",
          500: "#101012",
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
        "blue-600-to-sky-500": "linear-gradient(145deg, #2563EB, #2196F3)",
        "gray-900-to-Zing-900": "linear-gradient(232deg, #171c2369, #13161cb3)",
        "gray-900-to-Zing-9001":
          "linear-gradient(232deg, #171c2336, #13161c80)",
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
    nextui(),
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
