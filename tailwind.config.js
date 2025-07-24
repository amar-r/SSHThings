/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['Courier New', 'Courier', 'monospace'],
        dos: ['Courier New', 'Courier', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'], // Add sans-serif for better readability
      },
      colors: {
        dos: {
          green: '#90EE90', // Light green - much softer
          'green-dim': '#7FBF7F', // Dimmed green
          'green-dark': '#5A8A5A', // Darker green
          black: '#0A0A0A', // Very dark gray instead of pure black
          'gray-dark': '#1A1A1A', // Dark gray
          'gray-light': '#2A2A2A', // Light gray for backgrounds
        }
      },
      animation: {
        'cursor-blink': 'blink 1s infinite',
        'typewriter': 'typewriter 2s steps(40) 1s 1 normal both',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        }
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#90EE90',
            fontFamily: 'Inter, system-ui, sans-serif', // Use sans-serif for better readability
            fontSize: '16px', // Larger font size
            lineHeight: '1.7', // Better line spacing
            a: {
              color: '#90EE90',
              textDecoration: 'underline',
              fontWeight: 'normal',
            },
            strong: {
              color: '#90EE90',
              fontWeight: 'bold',
            },
            h1: {
              color: '#90EE90',
              fontWeight: 'bold',
              fontSize: '20px',
              fontFamily: 'Courier New, Courier, monospace', // Keep headers in DOS style
            },
            h2: {
              color: '#90EE90',
              fontWeight: 'bold',
              fontSize: '18px',
              fontFamily: 'Courier New, Courier, monospace',
            },
            h3: {
              color: '#90EE90',
              fontWeight: 'bold',
              fontSize: '16px',
              fontFamily: 'Courier New, Courier, monospace',
            },
            h4: {
              color: '#90EE90',
              fontWeight: 'bold',
              fontSize: '14px',
              fontFamily: 'Courier New, Courier, monospace',
            },
            code: {
              color: '#90EE90',
              fontWeight: 'normal',
              backgroundColor: '#1A1A1A',
              padding: '2px 4px',
              fontFamily: 'Courier New, Courier, monospace', // Keep code in monospace
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            'a code': {
              color: '#90EE90',
            },
            pre: {
              color: '#90EE90',
              backgroundColor: '#1A1A1A',
              border: '1px solid #90EE90',
              overflowX: 'auto',
              fontWeight: 'normal',
              fontFamily: 'Courier New, Courier, monospace', // Keep pre in monospace
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
              borderLeftColor: '#90EE90',
              color: '#7FBF7F',
              fontStyle: 'normal',
              paddingLeft: '1rem',
              marginLeft: '0',
            },
            ul: {
              listStyleType: 'none',
              paddingLeft: '0',
            },
            li: {
              paddingLeft: '20px',
              position: 'relative',
              marginBottom: '0.5rem',
            },
            'li::before': {
              content: '"> "',
              color: '#90EE90',
              position: 'absolute',
              left: '0',
              fontFamily: 'Courier New, Courier, monospace',
            },
            table: {
              borderColor: '#90EE90',
            },
            th: {
              borderColor: '#90EE90',
              backgroundColor: '#1A1A1A',
            },
            td: {
              borderColor: '#90EE90',
            },
            p: {
              marginBottom: '1rem',
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