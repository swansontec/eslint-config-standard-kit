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

// ----------------------------------------------------------------
// Write the files:
// ----------------------------------------------------------------

writeConfigs({
  filename: 'index.js',
  comment: 'Core rules for Standard.js',
  upstream: 'eslint-config-standard',
  config: {
    ...standardConfig,
    env: splitNodeEnv.no,
    globals: {
      clearInterval: 'readonly',
      clearTimeout: 'readonly',
      console: 'readonly',
      setInterval: 'readonly',
      setTimeout: 'readonly',
      ...standardConfig.globals
    },
    plugins: splitNodePlugins.no,
    rules: splitNodeRules.no
  }
})

writeConfigs({
  name: 'node',
  comment: 'Node.js support',
  upstream: 'eslint-config-standard',
  config: {
    env: splitNodeEnv.yes,
    plugins: splitNodePlugins.yes,
    rules: splitNodeRules.yes
  }
})

writeConfigs({
  name: 'jsx',
  comment: 'JSX support',
  upstream: 'eslint-config-standard-jsx',
  config: jsxConfig
})

writeConfigs({
  name: 'flow',
  comment: 'Flow language support',
  upstream: 'eslint-plugin-flow',
  config: {
    plugins: ['flowtype'],
    ...flowConfig
  }
})

writeConfigs({
  name: 'typescript',
  comment: 'Typescript language support',
  upstream: 'eslint-config-standard-with-typescript',
  config: {
    ...removeProps(typescriptConfig, ['extends', 'parser']),
    overrides: [
      {
        parser: '@typescript-eslint/parser',
        ...typescriptConfig.overrides[0]
      }
    ]
  }
})
