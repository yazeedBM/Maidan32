/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-tajawal)", "Tajawal", "sans-serif"],
      },
      colors: {
        navy: {
          950: "#070b14",
          900: "#0b1220",
          800: "#111a2e",
          700: "#182338",
          600: "#22304a",
        },
        brand: {
          orange: "#f5a623",
          "orange-dark": "#dd910f",
          blue: "#2456c9",
          "blue-dark": "#1c45a8",
        },
      },
      boxShadow: {
        card: "0 4px 20px rgba(11, 18, 32, 0.08)",
      },
    },
  },
  plugins: [],
};
