const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const withTM = require('next-transpile-modules')(['monaco-editor'])

const IgnoreLoader = require.resolve('next/dist/compiled/ignore-loader')

// function addMonacoCSSExclusion(config) {
//   const rule = config.module.rules
//     .find(rule => rule.oneOf)
//     .oneOf.find(
//       r =>
//         // Find the global CSS loader
//         r.issuer && r.issuer.include && r.issuer.include.includes('_app')
//     )

//   if (rule) {
//     rule.issuer.include = [
//       rule.issuer.include,
//       // Allow `monaco-editor` to import global CSS:
//       /[\\/]node_modules[\\/]monaco-editor[\\/]/,
//     ]
//   }
// }

const regexCssGlobal = /(?<!\.module)\.css$/

function addGlobalCSSIgnore(config) {
  const rule = config.module.rules
    .find(rule => rule.oneOf)
    .oneOf.find(
      r => Array.isArray(r.test) && r.issuer && Array.isArray(r.issuer.and)
    )

  if (rule) {
    rule.use = IgnoreLoader

    console.log('Global CSS Ignore Rule:', rule)
  }
}

function addGlobalCSSOutsideAppIgnore(config) {
  const rule = config.module.rules
    .find(rule => rule.oneOf)
    .oneOf.find(
      r =>
        Array.isArray(r.test) &&
        r.test.map(String).includes(regexCssGlobal.toString()) &&
        r.use &&
        r.use.loader === 'error-loader'
    )

  if (rule) {
    rule.use = IgnoreLoader

    console.log('Global CSS Outside App Ignore Rule:', rule)
  }
}

const config = {
  target: 'serverless',
  webpack(config) {
    // addMonacoCSSExclusion(config)
    addGlobalCSSIgnore(config)
    addGlobalCSSOutsideAppIgnore(config)

    const monacoPlugin = new MonacoWebpackPlugin({
      languages: [
        'json',
        'markdown',
        'css',
        'typescript',
        'javascript',
        'html',
        'graphql',
        'python',
        'scss',
        'yaml',
      ],
      filename: 'static/[name].worker.js',
    })

    config.plugins.push(monacoPlugin)

    console.log('Added monaco webpack plugin.')

    return config
  },
  cssLoaderOptions: {url: false},
}

module.exports = withTM(config)
