module.exports = {
  purge: ['./src/*.html', './src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        green: '#2ecc71',
      },
      fontFamily: {
        sans: [
          '"JetBrains Mono"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
    },
  },
  variants: {},
  plugins: [],
}
