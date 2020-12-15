import { sortJson } from '../utils'

export function makeEslintJson(input) {
  const standardKit = input.prettier ? 'standard-kit/prettier' : 'standard-kit'
  const eslintJson = {
    extends: [standardKit],
    parserOptions: {},
    plugins: [],
    rules: {}
  }

  if (input.jsx) {
    eslintJson.extends.push(standardKit + '/jsx')
  }

  if (input.flow) {
    eslintJson.extends.push(standardKit + '/flow')
  }

  if (input.typescript) {
    eslintJson.extends.push(standardKit + '/typescript')
    eslintJson.parserOptions.project = 'tsconfig.json'
  }

  if (input.node) {
    eslintJson.extends.push(standardKit + '/node')
  }

  if (input.react) {
    eslintJson.extends.push(standardKit + '/react')
  }

  if (input.sort) {
    eslintJson.plugins.push('simple-import-sort')
    eslintJson.rules['simple-import-sort/imports'] = 'error'
  }

  // Filter unused sections:
  const out = {
    extends: eslintJson.extends
  }
  if (Object.keys(eslintJson.parserOptions).length > 0) {
    out.parserOptions = eslintJson.parserOptions
  }
  if (eslintJson.plugins.length > 0) {
    out.plugins = eslintJson.plugins
  }
  if (Object.keys(eslintJson.rules).length > 0) {
    out.rules = sortJson(eslintJson.rules)
  }
  return out
}
