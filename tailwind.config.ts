import type {Config} from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-body)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        headline: ['var(--font-headline)', 'sans-serif'],
      },
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
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)",
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.7', filter: 'drop-shadow(0 0 2px hsl(var(--accent)))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 5px hsl(var(--accent)))' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': "hsl(var(--muted-foreground))",
            '--tw-prose-headings': "hsl(var(--foreground))",
            '--tw-prose-lead': "hsl(var(--muted-foreground))",
            '--tw-prose-links': "hsl(var(--primary))",
            '--tw-prose-bold': "hsl(var(--foreground))",
            '--tw-prose-counters': "hsl(var(--muted-foreground))",
            '--tw-prose-bullets': "hsl(var(--primary))",
            '--tw-prose-hr': "hsl(var(--border))",
            '--tw-prose-quotes': "hsl(var(--foreground))",
            '--tw-prose-quote-borders': "hsl(var(--primary))",
            '--tw-prose-captions': "hsl(var(--muted-foreground))",
            '--tw-prose-code': "hsl(var(--secondary))",
            '--tw-prose-pre-code': "hsl(var(--secondary))",
            '--tw-prose-pre-bg': "hsl(var(--card))",
            '--tw-prose-th-borders': "hsl(var(--border))",
            '--tw-prose-td-borders': "hsl(var(--border))",
            '--tw-prose-invert-body': "hsl(var(--muted-foreground))",
            '--tw-prose-invert-headings': "hsl(var(--foreground))",
            '--tw-prose-invert-lead': "hsl(var(--muted-foreground))",
            '--tw-prose-invert-links': "hsl(var(--primary))",
            '--tw-prose-invert-bold': "hsl(var(--foreground))",
            '--tw-prose-invert-counters': "hsl(var(--muted-foreground))",
            '--tw-prose-invert-bullets': "hsl(var(--primary))",
            '--tw-prose-invert-hr': "hsl(var(--border))",
            '--tw-prose-invert-quotes': "hsl(var(--foreground))",
            '--tw-prose-invert-quote-borders': "hsl(var(--primary))",
            '--tw-prose-invert-captions': "hsl(var(--muted-foreground))",
            '--tw-prose-invert-code': "hsl(var(--secondary))",
            '--tw-prose-invert-pre-code': "hsl(var(--secondary))",
            '--tw-prose-invert-pre-bg': "hsl(var(--card))",
            '--tw-prose-invert-th-borders': "hsl(var(--border))",
            '--tw-prose-invert-td-borders': "hsl(var(--border))",
          },
        },
      }),
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;
