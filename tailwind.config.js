/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#2563EB",
          400: "#2196F3",
        },
        darkColor: {
          100: "#000000",
          200: "#0F1116",
          300: "#13151A",
          400: "#212734",
          500: "#101012",
        },
        lightColor: {
          900: "#FFFFFF",
          800: "#F4F6F8",
          850: "#FDFDFD",
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
        'gradient-primary': 'linear-gradient(to right, #2563EB, #2196F3)',
        'gradient-secondary': 'linear-gradient(to top, #43cea2, #185a9a)',
      },
    },
  },
  plugins: [],
};
