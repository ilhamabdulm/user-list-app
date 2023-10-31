/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      screens: { xs: "512px" },
      colors: {
        g: {
          800: "#fc9c2d",
          700: "#CB3029",
          100: "#EA5B55",
          50: "#FFA4A0",
          10: "#FFE9E8",
        },
        neutral: {
          1: "#FFFFFF",
          2: "#E7E7E7",
          3: "#B6B6B6",
          4: "#9D9D9D",
          5: "#858585",
          6: "#6C6C6C",
          7: "#545454",
          8: "#3B3B3B",
          9: "#232323",
          10: "#0A0A0A",
        },
        danger: {
          300: "#E03F34",
          50: "#F6D8D6",
        },
        warning: {
          300: "#E07324",
          50: "#F8DECB",
        },
        success: {
          300: "#1B9F60",
          50: "#C5E9D7",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
