/* global describe, it */

import { expect } from 'chai'
import { deepList, makeNodeDisklet } from 'disklet'
import { CLIEngine } from 'eslint'
import { resolve } from 'path'

import { checkJsonSnapshot } from './snapshot.js'

describe('examples', function () {
  const cli = new CLIEngine({ ignore: false })
  const examplesDir = resolve(__dirname, '../examples')
  const examples = [
    'typescript-jsx/bad.tsx',
    'typescript-jsx/good.tsx',
    'typescript/bad.ts',
    'typescript/good.ts'
  ]
  const sourceExt = /\.[jt]sx?$/

  it('matches file list', async function () {
    const disklet = makeNodeDisklet(examplesDir)
    const list = await deepList(disklet)
    const files = Object.keys(list).filter(
      path => list[path] === 'file' && sourceExt.test(path)
    )
    expect(files.sort()).deep.equals(examples.sort())
  })

  examples.forEach(example =>
    it(example, function () {
      this.timeout(4000)
      const snapshot =
        'examples-' + example.replace('/', '-').replace(sourceExt, '')

      // Lint the file:
      const results = cli.executeOnFiles([resolve(examplesDir, example)])
      const messages = results.results[0].messages
      checkJsonSnapshot(snapshot, messages)
    })
  )
})
