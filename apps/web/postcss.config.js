const purgeOptions = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],

  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],

  whitelistPatternsChildren: [/monaco-editor/], // so it handles .monaco-editor .foo .bar
}

module.exports = {
  plugins: [
    ['tailwindcss', {config: './apps/web/tailwind.config.js'}],
    'postcss-preset-env',
    [
      '@fullhuman/postcss-purgecss',
      process.env.NODE_ENV === 'production' ? purgeOptions : false,
    ],
  ],
}
