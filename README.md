# eslint-config-standard-kit

[Standard.js](https://standardjs.com) is a _fantastic_ collection of linter rules, but it difficult to integrate with other code-quality tools like [Prettier](https://prettier.io/), [TypeScript](https://typescriptlang.org), or [Flow](https://flow.org/).

This package makes it easy to integrate Standard.js with these other tools by breaking its configuration into modular pieces. Just mix & match the bits you need for your particular setup:

- `standard-kit` - Basic Standard.js rules
- `standard-kit/node` - [Node.js](https://nodejs.org/) runtime support, including CommonJS features like `require`
- `standard-kit/jsx` - [JSX](https://reactjs.org/docs/introducing-jsx.html) language support
- `standard-kit/typescript` - [TypeScript](https://typescriptlang.org) language support
- `standard-kit/flow` - [Flow](https://flow.org/) language support

If you use a tool like Prettier to format your source code, just prefix the rule names with `standard-kit/lint` instead of `standard-kit`. This will remove all formatting rules, leaving just the code-quality rules.

For example, here is an `.eslintrc.json` that supports Prettier, JSX, and Typescript:

```json
{
  "extends": [
    "standard-kit/lint",
    "standard-kit/lint/jsx",
    "standard-kit/lint/typescript"
  ],
  "parserOptions": {
    "project": "./tsconfig.json"
  }
}
```

## Usage

First, add `eslint-plugin-standard-kit` as one of your project's `devDependencies`:

```sh
npm install --save-dev eslint-plugin-standard-kit
```

Depending on which configurations you enable, you will need to add several other dependencies as well:

- basic rules:
  - `eslint-plugin-import`
  - `eslint-plugin-promise`
  - `eslint-plugin-standard`
- node:
  - `eslint-plugin-node`
- jsx:
  - `eslint-plugin-react`
- typescript:
  - `@typescript-eslint/parser`
  - `@typescript-eslint/eslint-plugin`
- flow:
  - `babel-eslint`
  - `eslint-plugin-flowtype`

Finally, edit your ESLint configuration file to enable your selected rules, as shown in the example above.

If you are using JSX or Typescript, you may want to pass the [`--ext`](https://eslint.org/docs/user-guide/command-line-interface#--ext) option to ESlint to tell it about the `.jsx` or `.ts` file extensions:

```js
eslint --ext .js,.jsx,.ts src/
```

The TypeScript rules also need to know where your `tsconfig.json` file is located. You can configure this using the `parserOptions.project` setting, as shown in the example above.

## Rules

This package auto-generate its configuration files based on the official [eslint-config-standard](https://github.com/standard/eslint-config-standard) and [eslint-config-standard-jsx](https://github.com/standard/eslint-config-standard-jsx) packages. This means you are getting the exact same rules as the official Standard.js project, just filtered into smaller files.

Typescript support comes from the [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) recommended settings, but with a few adjustments to be more in line with what Standard.js does (like using 2-space indents instead of 4).

Flow support uses the recommended settings from [eslint-plugin-flowtype](https://github.com/gajus/eslint-plugin-flowtype).
