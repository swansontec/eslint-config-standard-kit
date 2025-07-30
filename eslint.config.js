import { dirname } from 'path'
import { fileURLToPath } from 'url'

import standardConfig from './src/standardConfig.js'

export default [
  ...standardConfig({
    node: true,
    prettier: true,
    sortImports: true,
    typescript: true,
    tsconfigRootDir: dirname(fileURLToPath(import.meta.url))
  }),
  {
    ignores: [
      // These files have intentional errors:
      'examples/*',

      // Generated sources:
      'config/*',
      'prettier/*'
    ]
  }
]
