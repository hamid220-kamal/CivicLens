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
        background: "#020617",
        foreground: "#f8fafc",
        primary: "#1d4ed8",
        "primary-container": "#1e40af",
        "on-primary": "#ffffff",
        "on-primary-container": "#dbeafe",
        "primary-fixed": "#dbeafe",
        secondary: "#006a61",
        "secondary-container": "#73f8e7",
        "on-secondary": "#ffffff",
        surface: "#0f172a",
        "surface-container": "#1e293b",
        "surface-container-high": "#334155",
        "surface-container-low": "#0b1120",
        "surface-container-lowest": "#020617",
        "on-surface": "#f8fafc",
        "on-surface-variant": "#94a3b8",
        outline: "#334155",
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2rem",
        "margin-mobile": "1rem",
        margin: "1.5rem",
      },
      fontSize: {
        "headline-xl": ["2.25rem", { lineHeight: "2.75rem", fontWeight: "700" }],
        "headline-lg": ["1.875rem", { lineHeight: "2.25rem", fontWeight: "700" }],
        "headline-lg-mobile": ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
        "headline-sm": ["1.25rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75rem" }],
        "body-md": ["1rem", { lineHeight: "1.5rem" }],
        "body-md-bold": ["1rem", { lineHeight: "1.5rem", fontWeight: "700" }],
        "body-sm": ["0.875rem", { lineHeight: "1.25rem" }],
        "label-md": ["0.875rem", { lineHeight: "1.25rem" }],
        "label-sm": ["0.75rem", { lineHeight: "1rem" }],
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

