#!/usr/bin/env node

const { makeNodeDisklet } = require('disklet')
const { resolve } = require('path')

const { ruleFiles } = require('esm')(module)('./rule-files.js')

const disklet = makeNodeDisklet(resolve(__dirname, '../..'))
for (const filename in ruleFiles) {
  disklet.setText(filename, ruleFiles[filename])
}
