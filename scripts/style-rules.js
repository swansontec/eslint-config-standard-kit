const { expect } = require('chai')

const { removeProps } = require('./utils.js')

// Prettier already has well-maintained lists of formatting rules:
const prettierConfigs = [
  require('eslint-config-prettier'),
  require('eslint-config-prettier/@typescript-eslint'),
  require('eslint-config-prettier/flowtype'),
  require('eslint-config-prettier/react'),
  require('eslint-config-prettier/standard')
]

// Merge the blacklists:
const styleRules = []
for (const config of prettierConfigs) {
  for (const rule in config.rules) {
    expect(config.rules[rule]).oneOf([0, 'off'])
    styleRules.push(rule)
  }
}

/**
 * Removes style rules from an ESlint config, so it won't fight prettier.
 */
function filterStyleRules(config) {
  const out = { ...config }

  if (config.rules != null) {
    out.rules = removeProps(config.rules, styleRules)
  }

  if (config.overrides != null) {
    out.overrides = config.overrides.map(override => ({
      ...override,
      rules: removeProps(override.rules, styleRules)
    }))
  }

  return out
}

module.exports = { filterStyleRules }
