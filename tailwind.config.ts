import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07090E",
        foreground: "#F1F5F9",
        card: "#0D1117",
        "card-hover": "#131923",
        cyan: {
          400: "#38BDF8",
          DEFAULT: "#00F0FF",
          electric: "#00F0FF",
          intense: "#00D8F6",
          dark: "#00A3B8",
          glow: "rgba(0, 240, 255, 0.4)",
        },
        dark: {
          950: "#05070A",
          900: "#07090E",
          850: "#0A0D14",
          800: "#0D1117",
          700: "#161B22",
          600: "#21262D",
          500: "#30363D",
        }
      },
      boxShadow: {
        "cyan-glow": "0 0 20px rgba(0, 240, 255, 0.35)",
        "cyan-glow-lg": "0 0 35px rgba(0, 240, 255, 0.55)",
        "cyan-border": "0 0 10px rgba(0, 240, 255, 0.2)",
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
export default config;
