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
  let expected = hasJson ? JSON.parse(await disklet.getText(jsonPath)) : []

  const results = cli.executeOnFiles([codePath])
  const messages = results.results[0].messages
  if (needsUpdate) {
    if (messages.length === 0) await disklet.delete(jsonPath)
    else await disklet.setText(jsonPath, JSON.stringify(messages, null, 2))
  }

  expect(messages).deep.equals(expected)
}

async function testFolder(path) {
  const cli = new CLIEngine({
    useEslintrc: false,
    configFile: join(path, '.eslintrc.json')
  })

  const entries = await disklet.list(path)
  for (const path in entries) {
    if (sourceExt.test(path)) {
      const jsonPath = path.replace(sourceExt, '.json')
      try {
        await testFile(cli, path, jsonPath, entries[jsonPath] === 'file')
        console.log(`${path} passsed`)
      } catch (error) {
        console.log(`${path} failed with`, error)
      }
    }
  }
}

async function runTests() {
  const entries = await disklet.list('examples')
  for (const path in entries) {
    if (entries[path] === 'folder') await testFolder(path)
  }
}

runTests().catch(e => console.error('unexpected failure', e))
