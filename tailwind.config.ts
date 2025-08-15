import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        karma: {
          sage: {
            50: "hsl(var(--karma-sage-50))",
            100: "hsl(var(--karma-sage-100))",
            200: "hsl(var(--karma-sage-200))",
            300: "hsl(var(--karma-sage-300))",
            400: "hsl(var(--karma-sage-400))",
            500: "hsl(var(--karma-sage-500))",
            600: "hsl(var(--karma-sage-600))",
            700: "hsl(var(--karma-sage-700))",
          },
          cream: {
            50: "hsl(var(--karma-cream-50))",
            100: "hsl(var(--karma-cream-100))",
            200: "hsl(var(--karma-cream-200))",
            300: "hsl(var(--karma-cream-300))",
            400: "hsl(var(--karma-cream-400))",
          },
          neutral: {
            50: "hsl(var(--karma-neutral-50))",
            100: "hsl(var(--karma-neutral-100))",
            200: "hsl(var(--karma-neutral-200))",
            300: "hsl(var(--karma-neutral-300))",
            400: "hsl(var(--karma-neutral-400))",
            500: "hsl(var(--karma-neutral-500))",
            600: "hsl(var(--karma-neutral-600))",
            700: "hsl(var(--karma-neutral-700))",
            800: "hsl(var(--karma-neutral-800))",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
