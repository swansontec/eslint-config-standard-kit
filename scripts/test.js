const { join } = require('path')
const { makeNodeDisklet } = require('disklet')
const { CLIEngine } = require('eslint')
const { expect } = require('chai')

const rootPath = join(__dirname, '..')
const disklet = makeNodeDisklet(rootPath)

const sourceExt = /\.[jt]sx?$/

// Do `yarn test --update` to update the error snapshots:
const needsUpdate = process.argv.indexOf('--update') >= 0

async function testFile(cli, codePath, jsonPath, hasJson) {
  const expected = hasJson ? JSON.parse(await disklet.getText(jsonPath)) : []

  const results = cli.executeOnFiles([codePath])
  const messages = results.results[0].messages
  if (needsUpdate) {
    if (messages.length === 0) await disklet.delete(jsonPath)
    else await disklet.setText(jsonPath, JSON.stringify(messages, null, 2))
  }

  expect(messages).deep.equals(expected)
}

async function testFolder(path) {
  let hadErrors = false
  const cli = new CLIEngine({ ignore: false })

  const entries = await disklet.list(path)
  for (const path in entries) {
    if (sourceExt.test(path)) {
      const jsonPath = path.replace(sourceExt, '.json')
      try {
        await testFile(cli, path, jsonPath, entries[jsonPath] === 'file')
        console.log(`${path} passsed`)
      } catch (error) {
        console.log(`${path} failed with`, error)
        hadErrors = true
      }
    }
  }

  return hadErrors
}

async function runTests() {
  let hadErrors = false

  const entries = await disklet.list('examples')
  for (const path in entries) {
    if (entries[path] === 'folder') {
      hadErrors = hadErrors || (await testFolder(path))
    }
  }

  return hadErrors
}

runTests().then(
  hadErrors => {
    if (hadErrors) process.exit(1)
  },
  e => console.error('unexpected failure', e)
)
