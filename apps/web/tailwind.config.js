module.exports = {
  purge: ['./**/*.tsx'],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        green: '#2ecc71',
        red: '#fe4b2e',
        dark: '#282a37',
        darker: '#21222d',
        darkgrey: '#202124',
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
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}
