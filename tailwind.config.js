/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF6EE",
        vanilla: "#FFFDF9",
        ink: "#231712",
        cherry: "#E0284F",
        ballet: "#F7C6D3",
        lilac: "#C9B6F2",
        peach: "#FFD9B8",
        pearl: "#F1E7F8",
      },
      fontFamily: {
        display: ['"Fraunces"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "-apple-system", '"Segoe UI"', "sans-serif"],
      },
      boxShadow: {
        tactile: "5px 5px 0 #231712",
        "tactile-sm": "3px 3px 0 #231712",
        "tactile-lg": "7px 7px 0 #231712",
        pearl: "inset 0 1px 0 rgba(255,255,255,.9), 0 1px 0 rgba(35,23,18,.12)",
      },
      borderRadius: { card: "26px" },
      transitionTimingFunction: { out: "cubic-bezier(.16,1,.3,1)" },
    },
  },
  plugins: [],
};
