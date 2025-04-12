import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "shimmer-slide": {
          to: {
            transform: "translate(100%, 0)",
          },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
      },
      animation: {
        "shimmer-slide": "shimmer-slide 3s ease-in-out infinite alternate",
        "spin-around": "spin-around 6s infinite linear",
      },

      screens: {
        ...Object.fromEntries(
          [2560, 1440, 1024, 768, 425, 375, 320].map((bp) => [
            `max-${bp}`,
            { max: `${bp}px` },
          ])
        ),
      },
    },
  },
  plugins: [],
};

export default config;
