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
      },
      colors: {
        dos: {
          green: '#00ff00',
          'green-dim': '#00cc00',
          'green-dark': '#008800',
          black: '#000000',
          'gray-dark': '#222222',
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
            color: '#00ff00',
            fontFamily: 'Courier New, Courier, monospace',
            fontSize: '14px',
            lineHeight: '1.4',
            a: {
              color: '#00ff00',
              textDecoration: 'underline',
              fontWeight: 'normal',
            },
            strong: {
              color: '#00ff00',
              fontWeight: 'bold',
            },
            h1: {
              color: '#00ff00',
              fontWeight: 'bold',
              fontSize: '18px',
            },
            h2: {
              color: '#00ff00',
              fontWeight: 'bold',
              fontSize: '16px',
            },
            h3: {
              color: '#00ff00',
              fontWeight: 'bold',
              fontSize: '14px',
            },
            h4: {
              color: '#00ff00',
              fontWeight: 'bold',
              fontSize: '14px',
            },
            code: {
              color: '#00ff00',
              fontWeight: 'normal',
              backgroundColor: '#222222',
              padding: '2px 4px',
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            'a code': {
              color: '#00ff00',
            },
            pre: {
              color: '#00ff00',
              backgroundColor: '#222222',
              border: '1px solid #00ff00',
              overflowX: 'auto',
              fontWeight: 'normal',
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
              borderLeftColor: '#00ff00',
              color: '#00cc00',
              fontStyle: 'normal',
            },
            ul: {
              listStyleType: 'none',
              paddingLeft: '0',
            },
            li: {
              paddingLeft: '20px',
              position: 'relative',
            },
            'li::before': {
              content: '"> "',
              color: '#00ff00',
              position: 'absolute',
              left: '0',
            },
            table: {
              borderColor: '#00ff00',
            },
            th: {
              borderColor: '#00ff00',
              backgroundColor: '#222222',
            },
            td: {
              borderColor: '#00ff00',
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