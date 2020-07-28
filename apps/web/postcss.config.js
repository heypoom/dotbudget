const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

const isDevelopment = process.env.NODE_ENV === 'development'

const plugins = [tailwindcss, autoprefixer]

function addPurgeCSS() {
  const purgecss = require('@fullhuman/postcss-purgecss')

  if (!isDevelopment) {
    const extractor = {
      extract: content => content.match(/[A-z0-9-:/]+/g) || [],
    }

    const plugin = purgecss({
      content: ['src/*.html'],
      extractors: [{extractor, extensions: 'html'}],
    })

    plugins.push(plugin)
  }
}

addPurgeCSS()

module.exports = {plugins}
