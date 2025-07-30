import importSortPlugin from 'eslint-plugin-simple-import-sort'
import { createRequire } from 'module'

import { removeProps } from './utils.js'

const require = createRequire(import.meta.url)

export default function standardConfig(opts) {
  const {
    // Formatting:
    prettier,
    sortImports,

    // Environments:
    jsx,
    node,
    react,
    typescript,
    tsconfigRootDir
  } = opts

  // Check the environment:
  if (prettier) {
    try {
      require('prettier')
    } catch (_) {
      throw new Error(
        'Cannot find prettier. Please run `npm install --save-dev prettier` or equivalent'
      )
    }
  }
  if (typescript) {
    try {
      require('typescript')
    } catch (_) {
      throw new Error(
        'Cannot find TypeScript. Please run `npm install --save-dev typescript` or equivalent'
      )
    }
  }

  // Begin building our config object:
  const out = [
    prettier ? require('../prettier/index.js') : require('../config/index.js')
  ]

  // There are no formatting rules in Node.js:
  if (node) out.push(require('../config/node.js'))

  // React implies JSX:
  if (react || jsx) {
    const config = prettier
      ? require('../prettier/jsx.js')
      : require('../config/jsx.js')
    out.push(config)
  }
  if (react) {
    out.push(require('../config/react.js'))
  }

  // This one is simple enough to inline:
  if (sortImports) {
    out.push({
      name: 'eslint-config-standard-kit/sortImports',
      plugins: { 'simple-import-sort': importSortPlugin },
      rules: { 'simple-import-sort/imports': 'error' }
    })
  }

  if (typescript) {
    const config = prettier
      ? require('../prettier/typescript.js')
      : require('../config/typescript.js')
    config.languageOptions.parserOptions.tsconfigRootDir = tsconfigRootDir

    // Allow `require` if we are running in Node.js:
    if (node) {
      config.rules = removeProps(config.rules, [
        '@typescript-eslint/no-require-imports'
      ])
    }
    out.push(config)
  }

  return out
}
