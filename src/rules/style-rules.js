import { expect } from 'chai'
import coreBlacklist from 'eslint-config-prettier'
import typescriptBlacklist from 'eslint-config-prettier/@typescript-eslint'
import reactBlacklist from 'eslint-config-prettier/react'
import standardBlacklist from 'eslint-config-prettier/standard'

import { removeProps } from '../utils.js'

// Prettier already has well-maintained lists of formatting rules:
const prettierBlacklists = [
  coreBlacklist,
  typescriptBlacklist,
  reactBlacklist,
  standardBlacklist
]

// Merge the blacklists:
const finalBlacklist = []
for (const blacklist of prettierBlacklists) {
  for (const rule in blacklist.rules) {
    expect(blacklist.rules[rule]).oneOf([0, 'off'])
    finalBlacklist.push(rule)
  }
}

/**
 * Removes style rules from an ESlint config, so it won't fight prettier.
 */
export function filterStyleRules(config) {
  const out = { ...config }

  if (config.rules != null) {
    out.rules = removeProps(config.rules, finalBlacklist)
  }

  if (config.overrides != null) {
    out.overrides = config.overrides.map(override => ({
      ...override,
      rules: removeProps(override.rules, finalBlacklist)
    }))
  }

  return out
}
