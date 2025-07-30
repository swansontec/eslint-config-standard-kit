# eslint-config-standard-kit

[Standard.js](https://standardjs.com) is a _fantastic_ collection of linter rules, but it can be difficult to integrate with other code-quality tools like Prettier, TypeScript, or JSX.

This package makes it easy to integrate Standard.js with these other tools by breaking its configuration into modular pieces. Just mix & match the bits you need for your particular setup:

- TypeScript
- JSX
- React
- Node.js
- Prettier
- Simple-import-sort

## Easy Setup

First, install ESLint 9 and eslint-plugin-standard-kit:

```sh
npm install --save-dev eslint eslint-config-standard-kit
```

Next, create an `eslint.config.mjs` config file:

```js
import standardConfig from 'eslint-config-standard-kit'

export default [
  ...standardConfig({
    prettier: true,
    sortImports: true,
    jsx: true,
    node: false,
    react: true,
    typescript: true
  }),
  {
    // Add your own settings here
  }
]
```

The `standardConfig` function takes a collection of flags to enable or disable the rules you need. If your `tsconfig.json` isn't in a normal place, you can also pass a `tsconfigRootDir` option to provide its location.

If you choose `prettier` or `typescript` support, be sure to `npm install` the corresponding tools in your project.

## Configs

If you don't want to use the `standardConfig` function, you can also import individual config objects:

- `eslint-config-standard-kit/config` - Core Standard.js rules
- `eslint-config-standard-kit/config/jsx` - JSX support
- `eslint-config-standard-kit/config/node` - Node.js support
- `eslint-config-standard-kit/config/react` - React support
- `eslint-config-standard-kit/config/typescript` - TypeScript support
- `eslint-config-standard-kit/prettier` - Core Standard.js rules + Prettier
- `eslint-config-standard-kit/prettier/jsx` - JSX support + Prettier
- `eslint-config-standard-kit/prettier/node` - Node.js support + Prettier
- `eslint-config-standard-kit/prettier/react` - React support + Prettier
- `eslint-config-standard-kit/prettier/typescript` - TypeScript support + Prettier

You could use these standalone configs like this:

```js
import baseConfig from 'eslint-config-standard-kit/config'
import tsConfig from 'eslint-config-standard-kit/config/typescript'

export default [
  baseConfig,
  tsConfig,
  {
    // Add your own settings here
  }
]
```

## Rules

This package auto-generates its configuration files based on the official [eslint-config-standard](https://github.com/standard/eslint-config-standard), [eslint-config-standard-jsx](https://github.com/standard/eslint-config-standard-jsx), and [eslint-config-standard-react](https://github.com/standard/eslint-config-standard-react) packages. This means you are getting the exact same rules as the official Standard.js project, just combined & filtered into a more convenient format.

The upstream eslint-config-standard-with-typescript package has been renamed to [eslint-config-love](https://github.com/mightyiam/eslint-config-love), and is no longer part of the Standard.js ecosystem. Since there is no longer an official TypeScript solution, eslint-config-standard-kit simply filters eslint-config-love down to be more Standard.js-aligned.

## Contributing

Pull requests are welcome! This library uses its own rules for linting & formatting, so please be sure the pre-commit hooks pass.

The unit tests use a snapshot system to verify that our output doesn't change. If you need to update the snapshots, just run `UPDATE=1 yarn test` to re-generate those.

To test the web interface, just use `yarn prepare` to compile the code, then open / refresh `public/index.html`.
