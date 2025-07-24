/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        dos: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        console: {
          bg: '#0D1117', // GitHub dark theme background
          'bg-light': '#161B22', // Slightly lighter background
          'bg-lighter': '#21262D', // Even lighter for cards
          green: '#7EE787', // Modern green (GitHub success color)
          'green-dim': '#56D364', // Dimmed green
          'green-dark': '#3FB950', // Darker green
          'gray-light': '#30363D', // Light gray for borders
          'gray-dim': '#8B949E', // Dimmed gray for secondary text
          'accent': '#58A6FF', // Blue accent for links
        }
      },
      animation: {
        'cursor-blink': 'blink 1s infinite',
        'typewriter': 'typewriter 2s steps(40) 1s 1 normal both',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.2s ease-out',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#7EE787',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '16px',
            lineHeight: '1.7',
            a: {
              color: '#58A6FF',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                textDecoration: 'underline',
              }
            },
            strong: {
              color: '#7EE787',
              fontWeight: '600',
            },
            h1: {
              color: '#7EE787',
              fontWeight: '700',
              fontSize: '24px',
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              marginBottom: '1.5rem',
              marginTop: '2rem',
            },
            h2: {
              color: '#7EE787',
              fontWeight: '600',
              fontSize: '20px',
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              marginBottom: '1rem',
              marginTop: '1.5rem',
            },
            h3: {
              color: '#7EE787',
              fontWeight: '600',
              fontSize: '18px',
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              marginBottom: '0.75rem',
              marginTop: '1.25rem',
            },
            h4: {
              color: '#7EE787',
              fontWeight: '600',
              fontSize: '16px',
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
            },
            code: {
              color: '#7EE787',
              fontWeight: '500',
              backgroundColor: '#161B22',
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              fontSize: '0.875em',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            'a code': {
              color: '#58A6FF',
            },
            pre: {
              color: '#7EE787',
              backgroundColor: '#161B22',
              border: '1px solid #30363D',
              borderRadius: '0.5rem',
              overflowX: 'auto',
              fontWeight: 'normal',
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
              padding: '1rem',
              marginBottom: '1.5rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: 'inherit',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            'pre code::before': {
              content: 'none',
            },
            'pre code::after': {
              content: 'none',
            },
            blockquote: {
              borderLeftColor: '#58A6FF',
              color: '#8B949E',
              fontStyle: 'normal',
              paddingLeft: '1rem',
              marginLeft: '0',
              backgroundColor: '#161B22',
              borderRadius: '0.25rem',
              padding: '1rem',
            },
            ul: {
              listStyleType: 'none',
              paddingLeft: '0',
            },
            li: {
              paddingLeft: '1.5rem',
              position: 'relative',
              marginBottom: '0.5rem',
            },
            'li::before': {
              content: '"▸"',
              color: '#58A6FF',
              position: 'absolute',
              left: '0',
              fontFamily: 'JetBrains Mono, Fira Code, monospace',
            },
            table: {
              borderColor: '#30363D',
              borderRadius: '0.5rem',
              overflow: 'hidden',
            },
            th: {
              borderColor: '#30363D',
              backgroundColor: '#161B22',
              fontWeight: '600',
            },
            td: {
              borderColor: '#30363D',
            },
            p: {
              marginBottom: '1.25rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 