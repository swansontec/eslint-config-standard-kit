import chai from 'chai'
import { readFileSync, writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import { sortJson } from '../src/utils.js'

const { expect } = chai
const __dirname = dirname(fileURLToPath(import.meta.url))
const snapshotsDir = resolve(__dirname, 'snapshots')

export function checkJsonSnapshot(name, json) {
  const path = resolve(snapshotsDir, name + '.json')

  if (process.env.UPDATE) {
    writeFileSync(path, JSON.stringify(sortJson(json), null, 2) + '\n', 'utf8')
  } else {
    const expected = JSON.parse(readFileSync(path, 'utf8'))
    expect(sortJson(json)).deep.equals(expected)
  }
}

export function checkTextSnapshot(name, text) {
  const path = resolve(snapshotsDir, name + '.txt')

  if (process.env.UPDATE) {
    writeFileSync(path, text, 'utf8')
  } else {
    const expected = readFileSync(path, 'utf8')
    expect(text).equals(expected)
  }
}
