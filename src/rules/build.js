#!/usr/bin/env node

import { makeNodeDisklet } from 'disklet'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import { makeRuleFiles } from './rule-files.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function main() {
  const disklet = makeNodeDisklet(resolve(__dirname, '../..'))
  const ruleFiles = await makeRuleFiles()

  ruleFiles['config/package.json'] = '{ "type": "commonjs" }'
  ruleFiles['prettier/package.json'] = '{ "type": "commonjs" }'

  for (const filename in ruleFiles) {
    disklet.setText(filename, ruleFiles[filename])
  }
}

main()
