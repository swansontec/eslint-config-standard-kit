import our from '../../package.json'
import { makeEslintJson } from './make-eslint-json.js'
import { makePackageJson } from './make-package-json.js'

const ids = [
  'jsx',
  'typescript',
  'node',
  'react',
  'prettier',
  'standard',
  'git',
  'sort'
]

function setup() {
  document.getElementById('version').textContent = `v${our.version}`

  // Checkboxes:
  ids.forEach(function (id) {
    document.getElementById(id).addEventListener('input', update)
  })

  // Special JSX / React relationship:
  const react = document.getElementById('react')
  const jsx = document.getElementById('jsx')
  react.addEventListener('input', function () {
    if (react.checked) jsx.checked = true
  })

  // Copy buttons:
  document
    .getElementById('copy-eslint')
    .addEventListener('click', () => copyContents('eslint-json'))
  document
    .getElementById('copy-package')
    .addEventListener('click', () => copyContents('package-json'))
}

function update() {
  // Read boxes:
  const input = {}
  ids.forEach(function (id) {
    input[id] = document.getElementById(id).checked
  })

  // Update files:
  const eslintJson = JSON.stringify(makeEslintJson(input), null, 2)
  const packageJson = JSON.stringify(makePackageJson(input), null, 2)
  document.getElementById('eslint-json').textContent = eslintJson
  document.getElementById('package-json').textContent = packageJson
}

function copyContents(id) {
  document.getSelection().selectAllChildren(document.getElementById(id))
  document.execCommand('copy')
}

update()
setup()
