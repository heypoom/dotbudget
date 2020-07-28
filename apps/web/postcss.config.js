const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')

const isDevelopment = process.env.NODE_ENV === 'development'

const plugins = [tailwindcss, autoprefixer]

function addPurgeCSS() {
  const purgecss = require('@fullhuman/postcss-purgecss')

  if (!isDevelopment) {
    const plugin = purgecss({content: ['./src/*.html']})

    plugins.push(plugin)
  }
}

// addPurgeCSS()

module.exports = {plugins}
