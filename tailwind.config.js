/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      kami: "#DFE0E8",
      gure: "#373f42",
      katsu: "#1B1F21",
      ki: "#EAB308",
      aka: "#F43F5E",
      midori: "#59C274",
      aoi: "#0b9bd0",
    },
    fontFamily: {
      garamond: "EB Garamond, serif",
      inter: "Inter, sans-serif",
      jetbrains: "JetBrains Mono, monospace",
    },
  },
  plugins: [],
};
