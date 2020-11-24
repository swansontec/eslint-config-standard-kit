import our from '../../package.json'
import { sortJson } from '../utils'

export function makePackageJson(input) {
  const devDependencies = {
    eslint: our.devDependencies.eslint,
    'eslint-config-standard-kit': our.version,
    'eslint-plugin-import': our.devDependencies['eslint-plugin-import'],
    'eslint-plugin-promise': our.devDependencies['eslint-plugin-promise']
  }

  if (input.prettier) {
    devDependencies['eslint-plugin-prettier'] =
      our.devDependencies['eslint-plugin-prettier']
    devDependencies.prettier = our.devDependencies.prettier
  }

  if (input.node) {
    devDependencies['eslint-plugin-node'] =
      our.devDependencies['eslint-plugin-node']
  }

  if (input.jsx) {
    devDependencies['eslint-plugin-react'] =
      our.devDependencies['eslint-plugin-react']
  }

  if (input.flow) {
    devDependencies['babel-eslint'] = our.devDependencies['babel-eslint']
    devDependencies['eslint-plugin-flowtype'] =
      our.devDependencies['eslint-plugin-flowtype']
  }

  if (input.typescript) {
    devDependencies['@typescript-eslint/eslint-plugin'] =
      our.devDependencies['@typescript-eslint/eslint-plugin']
    devDependencies['@typescript-eslint/parser'] =
      our.devDependencies['@typescript-eslint/parser']
    devDependencies.typescript = our.devDependencies.typescript
  }

  if (input.sort) {
    devDependencies['eslint-plugin-simple-import-sort'] =
      our.devDependencies['eslint-plugin-simple-import-sort']
  }

  if (input.git) {
    devDependencies.husky = our.devDependencies.husky
    devDependencies['lint-staged'] = '^9.0.0'
  }

  const packageJson = {
    scripts: {
      fix: 'npm run lint -- --fix',
      lint: 'eslint .'
    }
  }
  if (input.git) {
    packageJson.husky = {
      hooks: {
        'pre-commit': 'lint-staged'
      }
    }
    const extensions = input.jsx
      ? input.typescript
        ? ['js', 'jsx', 'ts', 'tsx']
        : ['js', 'jsx']
      : input.typescript
      ? ['js', 'ts']
      : ['js']
    const glob =
      extensions.length > 1
        ? `*.{${extensions.join(',')}}`
        : `*.${extensions[0]}`
    packageJson['lint-staged'] = { [glob]: 'eslint' }
  }
  packageJson.devDependencies = sortJson(devDependencies)

  return packageJson
}
