import { sortJson } from '../utils'

export function makePackageJson(input) {
  const devDependencies = {
    eslint: '>=6.2.2',
    'eslint-config-standard-kit': '>=0.14.4',
    'eslint-plugin-import': '>=2.18.0',
    'eslint-plugin-promise': '>=4.2.1',
    'eslint-plugin-standard': '>=4.0.0'
  }

  if (input.prettier) {
    devDependencies['eslint-plugin-prettier'] = '>=3.0.0'
    devDependencies.prettier = '>=1.0.0'
  }

  if (input.node) {
    devDependencies['eslint-plugin-node'] = '>=9.1.0'
  }

  if (input.jsx) {
    devDependencies['eslint-plugin-react'] = '>=7.14.2'
  }

  if (input.flow) {
    devDependencies['babel-eslint'] = '>=10.0.0'
    devDependencies['eslint-plugin-flowtype'] = '>=4.3.0'
  }

  if (input.typescript) {
    devDependencies['@typescript-eslint/eslint-plugin'] = '>=2.0.0'
    devDependencies['@typescript-eslint/parser'] = '^2.0.0'
  }

  if (input.sort) {
    devDependencies['eslint-plugin-simple-import-sort'] = '>=4.0.0'
  }

  if (input.git) {
    devDependencies.husky = '>=3.0.0'
    devDependencies['lint-staged'] = '>=9.0.0'
  }

  const extensions = input.typescript
    ? input.jsx
      ? ['js', 'jsx', 'ts', 'tsx']
      : ['js', 'ts']
    : input.jsx
    ? ['js', 'jsx']
    : ['js']

  const packageJson = {
    scripts: {
      lint:
        extensions.length > 1
          ? `eslint --ext ${extensions.map(ext => `.${ext}`).join(',')} .`
          : 'eslint .'
    }
  }
  if (input.git) {
    packageJson.husky = {
      hooks: {
        'pre-commit': 'lint-staged'
      }
    }
    const glob =
      extensions.length > 1
        ? `*.{${extensions.join(',')}}`
        : `*.${extensions[0]}`
    packageJson['lint-staged'] = { [glob]: 'eslint' }
  }
  packageJson.devDependencies = sortJson(devDependencies)

  return packageJson
}
