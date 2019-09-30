#!/usr/bin/env node

const standardConfig = require('eslint-config-standard')
const jsxConfig = require('eslint-config-standard-jsx')
const typescriptConfig = require('eslint-config-standard-with-typescript')
const flowPlugin = require('eslint-plugin-flow')

const { removeProps, splitArray, splitObject } = require('./utils.js')
const { writeConfigs } = require('./write-configs.js')

const flowConfig = flowPlugin.configs.recommended

/**
 * Splits eslint-config-standard into "core" and "node" variants.
 */
function isNode(rule) {
  return /^node/.test(rule)
}

const splitNodeEnv = splitObject(standardConfig.env, isNode)
const splitNodePlugins = splitArray(standardConfig.plugins, isNode)
const splitNodeRules = splitObject(standardConfig.rules, isNode)

// Write the files:
writeConfigs({
  index: {
    comment: 'Standard.js basic',
    config: {
      ...standardConfig,
      env: splitNodeEnv.no,
      globals: {
        console: 'readonly',
        ...standardConfig.globals
      },
      plugins: splitNodePlugins.no,
      rules: splitNodeRules.no
    }
  },

  node: {
    comment: 'Standard.js Node.js',
    config: {
      env: splitNodeEnv.yes,
      plugins: splitNodePlugins.yes,
      rules: splitNodeRules.yes
    }
  },

  jsx: {
    comment: 'Standard.js JSX',
    config: jsxConfig
  },

  flow: {
    comment: 'Flow language support',
    config: { plugins: ['flowtype'], ...flowConfig }
  },

  typescript: {
    comment: 'Typescript language support',
    config: {
      ...removeProps(typescriptConfig, ['extends', 'parser']),
      overrides: [
        {
          parser: '@typescript-eslint/parser',
          ...typescriptConfig.overrides[0]
        }
      ]
    }
  }
})
