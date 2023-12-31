import type { Config } from 'tailwindcss'

module.exports = {
  content: [
    './app/**/*.{html,js,tsx,ts}',
    './components/**/*.{html,js,tsx,ts}'
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
       },
      colors: {
        'blue': '#1fb6ff',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
      },
      fontFamily: {
        man: ['ManropeR', 'ManropeM'],
        serif: ['Merriweather', 'serif'],
      },
      fontSize: {
        default: '17px',
      }
    },
  },
  plugins: [],
} satisfies Config

