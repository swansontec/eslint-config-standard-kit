/* global describe, it */

import chai from 'chai'
import { deepList, makeNodeDisklet } from 'disklet'
import { ESLint } from 'eslint'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import { checkJsonSnapshot } from './snapshot.js'

const { expect } = chai
const __dirname = dirname(fileURLToPath(import.meta.url))

describe('examples', function () {
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
      path => list[path] === 'file' && !path.includes('eslint.config.js')
    )
    expect(files.sort()).deep.equals(examples.sort())
  })

  examples.forEach(example =>
    it(example, async function () {
      this.timeout(4000)
      const snapshot =
        'examples-' + example.replace('/', '-').replace(sourceExt, '')

      const eslint = new ESLint({
        ignore: false,
        cwd: resolve(examplesDir, dirname(example))
      })

      // Lint the file:
      const results = await eslint.lintFiles([resolve(examplesDir, example)])
      const messages = results[0]?.messages ?? []
      checkJsonSnapshot(snapshot, messages)
    })
  )
})
