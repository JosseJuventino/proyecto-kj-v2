import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-custom": "#1B1B1B;",
        "hover-black-custom": "#F5F7F2",
        "text-secondary": "#686868",
        "background-primary": "#F5F7F2;",
        "bg-inputs": "#D9D9D9",
        "bg-hover-on-black": "#202123",
      },
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
        secondary: ["Pontano Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
