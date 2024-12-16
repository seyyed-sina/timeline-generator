import type { Config } from "tailwindcss";

export default {
  content: [
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(50, 50, 50)",
        "primary-hover": "rgb(30, 30, 30)",
        secondary: "rgb(200, 200, 200)",
        "secondary-hover": "rgb(230, 230, 230)",
        disabled: "rgb(215, 215, 215)",
        dark: "rgb(10, 10, 10)",
        middle: "rgb(125, 125, 125)",
        light: "rgb(240, 240, 240)",
      },
      spacing: {
        25: "6.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
