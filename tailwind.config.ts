import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
  	extend: {
      perspective: {
        '500': '500px',
      },
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			},
        'card-flip-down': {
          '0%': { 
            transform: 'rotateX(0deg)',
            'transform-origin': 'bottom',
            'backface-visibility': 'hidden',
            'z-index': '10'
          },
          '100%': { 
            transform: 'rotateX(-180deg)',
            'transform-origin': 'bottom',
            'backface-visibility': 'hidden',
            'z-index': '10'
          }
        },
        'card-flip-up': {
          '0%': { 
            transform: 'rotateX(180deg)',
            'transform-origin': 'top',
            'backface-visibility': 'hidden',
            'z-index': '5'
          },
          '100%': { 
            transform: 'rotateX(0deg)',
            'transform-origin': 'top',
            'backface-visibility': 'hidden',
            'z-index': '5'
          }
        },
        'shadow-fade-in': {
          '0%': { opacity: '0' },
          '50%': { opacity: '0.7' },
          '100%': { opacity: '0' }
        },
        'number-roll': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' }
        }
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
        'card-flip-down': 'card-flip-down 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) forwards',
        'card-flip-up': 'card-flip-up 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955) 0.25s forwards',
        'shadow-fade-in': 'shadow-fade-in 0.6s ease-in-out',
        'number-roll': 'number-roll 0.5s ease-in-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
