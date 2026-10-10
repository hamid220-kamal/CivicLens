import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        // CivicLens Design System - Clean & Trustworthy
        // Base colors
        background: "#F8FAFC",
        foreground: "#0F172A",
        surface: "#FFFFFF",
        "surface-alt": "#F1F5F9",
        
        // Text colors
        "text-primary": "#0F172A",
        "text-secondary": "#64748B",
        "text-tertiary": "#94A3B8",
        
        // Primary (Deep Blue)
        primary: "#1E40AF",
        "primary-light": "#3B82F6",
        "primary-dark": "#1E3A8A",
        "primary-bg": "#DBEAFE",
        
        // Accent (Teal)
        accent: "#0D9488",
        "accent-light": "#14B8A6",
        "accent-dark": "#0F766E",
        "accent-bg": "#CCFBF1",
        
        // Status colors
        "status-open": "#3B82F6",
        "status-review": "#A855F7",
        "status-resolved": "#16A34A",
        
        // Severity colors
        "severity-low": "#16A34A",
        "severity-medium": "#F59E0B",
        "severity-high": "#EA580C",
        "severity-critical": "#DC2626",
        
        // Semantic colors
        error: "#DC2626",
        "error-light": "#FEE2E2",
        warning: "#F59E0B",
        "warning-light": "#FEF3C7",
        success: "#16A34A",
        "success-light": "#DCFCE7",
        info: "#3B82F6",
        "info-light": "#DBEAFE",
        
        // Borders & dividers
        border: "#E2E8F0",
        "border-dark": "#CBD5E1",
      },
      borderRadius: {
        DEFAULT: "8px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "heading-1": ["36px", { lineHeight: "44px", fontWeight: "700" }],
        "heading-2": ["28px", { lineHeight: "36px", fontWeight: "700" }],
        "heading-3": ["24px", { lineHeight: "32px", fontWeight: "700" }],
        "heading-4": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "label": ["14px", { lineHeight: "20px", fontWeight: "500" }],
        "label-sm": ["12px", { lineHeight: "16px", fontWeight: "500" }],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};
export default config;
