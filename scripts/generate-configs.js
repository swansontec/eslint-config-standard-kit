#!/usr/bin/env node

const typescriptPlugin = require('@typescript-eslint/eslint-plugin')
const standardConfig = require('eslint-config-standard')
const jsxConfig = require('eslint-config-standard-jsx')
const flowPlugin = require('eslint-plugin-flow')

const { removeProps, splitArray, splitObject } = require('./utils.js')
const { writeConfigs } = require('./write-configs.js')

const typescriptConfig = {
  ...typescriptPlugin.configs.base,
  ...typescriptPlugin.configs.recommended,
  extends: void 0
}
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
      ...typescriptConfig,
      rules: {
        // We use a looser version of the Typescript recommended rules:
        ...removeProps(typescriptConfig.rules, [
          '@typescript-eslint/array-type',
          '@typescript-eslint/camelcase',
          '@typescript-eslint/explicit-function-return-type',
          '@typescript-eslint/explicit-member-accessibility',
          '@typescript-eslint/no-inferrable-types'
        ]),
        '@typescript-eslint/indent': ['error', 2],
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: { delimiter: 'none' },
            singleline: { delimiter: 'comma', requireLast: false }
          }
        ],
        '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: false, classes: false, variables: false }
        ]
      }
    }
  }
})
