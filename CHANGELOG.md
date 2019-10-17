# eslint-config-standard-kit

## 0.14.4 (2019-10-17)

- Fix the NPM package to include the newly-added files.

## 0.14.3 (2019-10-17)

- Add a web page to help generate configurations for new projects.
- Add a set of `standard-kit/prettier` rules with Prettier pre-integrated.
- Deprecate the `standard-kit/lint` rules.

## 0.14.2 (2019-10-07)

- Include `setTimeout` & friends in the core list of globals.
- Update the readme & generated files to give credit to the upstream rule sets.

## 0.14.1 (2019-09-30)

- Only use the TypeScript parser for `.ts` and `.tsx` files, which allows TypeScript and Flow to coexist in the same project now.

## 0.14.0 (2019-09-25)

- Upgrade to Standard.js 14.
- Base TypeScript support on `eslint-config-standard-with-typescript`.

## 0.13.0 (2019-07-30)

- Upgrade to Standard.js 13.

## 0.12.2 (2019-07-30)

- Bring more typescript rules in line with Standard.js:
  - Remove `@typescript-eslint/explicit-member-accessibility`.
  - Adjust `@typescript-eslint/no-use-before-define`.

## 0.12.1 (2019-04-24)

- Add missing files to NPM package.

## 0.12.0 (2019-04-24)

- Initial release based on Standard.js 12.
