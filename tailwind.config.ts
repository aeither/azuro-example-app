import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/compositions/**/*.{ts,tsx}",
    "./src/views/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      // see context/device/index
      mb: { max: "801.9px" }, // isMobileView
      ds: "802px", // isDesktopView
      nr: { min: "802px", max: "1279.9px" }, // isNarrowVie
      "-wd": { max: "1280px" },
      wd: { min: "1280px" },
      "2wd": "1366px", // for more control (view where both sidebars are fixed in viewport)
    },
    extend: {
      colors: {
        "brand-70": "#FF6B00",
        "brand-60": "#FF8C00",
        "brand-50": "#FFA500",
        "brand-15": "#4A3C30",
        "brand-10": "#843900",
        "brand-5": "#432000",

        "grey-90": "#F0F0F0",
        "grey-70": "#BDBDBD",
        "grey-60": "#A9A9A9",
        "grey-40": "#8E8E8E",
        "grey-20": "#4B4B4B",
        "grey-15": "#3E3E3E",
        "grey-10": "#2F2F2F",

        "bg-l0": "#0D0D0D",
        "bg-l1": "#1A1A1A",
        "bg-l2": "#2A2A2A",
        "bg-l3": "#3A3A3A",

        "accent-pink": "#FF69B4",
        "accent-pink-5": "#4D2E3A",

        "accent-green": "#00FF7F",
        "accent-green-5": "#1A2E1F",
        "accent-green-10": "#1A6B3A",

        "accent-yellow": "#FFD700",
        "accent-yellow-10": "#4D4000",

        "accent-red": "#FF4500",
        "accent-red-5": "#4D2A1A",
        "accent-red-10": "#7A3C2A",

        "accent-blue": "#00BFFF",
      },
      borderRadius: {
        ssm: "0.375rem",
        min: "0.5rem",
        sm: "0.75rem",
        md: "1rem",
        lg: "1.25rem",
      },
      backgroundImage: ({ theme }) => ({
        "card-border-top":
          "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0) 100%)",
        "card-border-bottom":
          "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.15) 100%)",
        "live-switcher-bg":
          "linear-gradient(90deg, rgba(255, 69, 0, 0.5) 0%, rgba(255, 69, 0, 0) 100%)",
        "betslip-item-bg": `linear-gradient(90.08deg, ${theme("colors.bg-l2")} 0.06%, ${theme("colors.brand-50")} 300%)`,
        "betslip-item-bg-inc": `linear-gradient(90.08deg, ${theme("colors.bg-l2")} 0.06%, ${theme("colors.accent-green")} 300%)`,
        "betslip-item-bg-dec": `linear-gradient(90.08deg, ${theme("colors.bg-l2")} 0.06%, ${theme("colors.accent-red")} 300%)`,
        "live-game-shadow": `linear-gradient(90deg, ${theme("colors.accent-red")} -1000%, ${theme("colors.bg-l2")} 100%)`,
        "live-bet-shadow": `linear-gradient(90deg, ${theme("colors.bg-l3")} 0%, ${theme("colors.accent-red")} 800%)`,
        "result-button-won": `linear-gradient(180deg, ${theme("colors.grey-15")} 0%, ${theme("colors.accent-green")} 1500%)`,
        "result-button-lost": `linear-gradient(90deg, ${theme("colors.grey-15")} 0%, ${theme("colors.accent-red")} 1500%)`,
        "bet-game-won": `linear-gradient(180deg, ${theme("colors.bg-l3")} 0%, ${theme("colors.accent-green")} 1000%)`,
        "bet-game-lost": `linear-gradient(180deg, ${theme("colors.bg-l3")} 0%, ${theme("colors.accent-red")} 1000%)`,
        "casino-gradient":
          "linear-gradient(to right, #4A0E4E, #81124B, #B71E47, #E63B44, #FF6B6B)",
        "neon-glow": "linear-gradient(to right, #FF00FF, #00FFFF)",
      }),
      boxShadow: ({ theme }) => ({
        betslip: `0px -10px 30px ${theme("colors.bg-l1")}`,
        neon: "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de, 0 0 50px #ff00de, 0 0 75px #ff00de",
      }),
      fill: {
        "gradient-azuro-waves-grey": "#c4cfe4",
        "gradient-azuro-waves-mist": "#a5d0e6",
        // ATTN: check /local_modules/svg-provider/SvgSprite.tsx
        "gradient-azuro-waves-sky": "url(#gradient-azuro-waves-sky)",
        "gradient-azuro-waves-blue": "url(#gradient-azuro-waves-blue)",
        "gradient-azuro-waves-ultramarine":
          "url(#gradient-azuro-waves-ultramarine)",
        "gradient-azuro-waves-bright": "url(#gradient-azuro-waves-bright)",
        "gradient-azuro-waves-brilliant":
          "url(#gradient-azuro-waves-brilliant)",
        "gradient-azuro-waves-royal": "url(#gradient-azuro-waves-royal)",
      },
      animation: {
        "neon-pulse": "neon-pulse 1.5s ease-in-out infinite alternate",
      },
      keyframes: {
        "neon-pulse": {
          "0%": { opacity: 0.5 },
          "100%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [
    require("@headlessui/tailwindcss"),
    plugin(({ addComponents, matchUtilities, theme }) => {
      addComponents({
        ".text-heading-h1": {
          fontSize: "1.75rem",
          lineHeight: "2.25rem",
          textShadow: "0 0 10px rgba(255, 255, 255, 0.7)",
        },
        ".text-heading-h2": {
          fontSize: "1.5rem",
          lineHeight: "2rem",
          textShadow: "0 0 8px rgba(255, 255, 255, 0.7)",
        },
        ".text-heading-h3": {
          fontSize: "1.25rem",
          lineHeight: "1.625rem",
          textShadow: "0 0 6px rgba(255, 255, 255, 0.7)",
        },
        ".text-heading-h4": {
          fontSize: "1.125rem",
          lineHeight: "1.5rem",
          textShadow: "0 0 4px rgba(255, 255, 255, 0.7)",
        },
        ".text-heading-h5": {
          fontSize: "1rem",
          lineHeight: "1.25rem",
          textShadow: "0 0 2px rgba(255, 255, 255, 0.7)",
        },
        ".text-caption-14": {
          fontSize: "0.875rem",
          lineHeight: "1.125rem",
        },
        ".text-caption-13": {
          fontSize: "0.813rem",
          lineHeight: "1rem",
        },
        ".text-caption-12": {
          fontSize: "0.75rem",
          lineHeight: "0.875rem",
        },
        ".text-label-12": {
          fontSize: "0.688rem",
          lineHeight: "0.813rem",
        },
        ".neon-text": {
          textShadow:
            "0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ff00de, 0 0 35px #ff00de, 0 0 40px #ff00de",
        },
      });
    }),
  ],
};
export default config;