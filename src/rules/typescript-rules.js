import loveConfig from 'eslint-config-love'

import { removeProps } from '../utils.js'

/**
 * We use eslint-config-love as a starting point,
 * but perform heavy surgery to make it more like Standard.js.
 */
export function makeTsRules(coreRules) {
  // We only want the @typescript-eslint rules:
  const nonTsRules = Object.keys(loveConfig.rules).filter(
    name => !name.startsWith('@typescript-eslint/')
  )

  // If Standard.js doesn't have the original rule,
  // then we shouldn't extend the rule with TS support:
  const rulesNotInStandard = replacedBuiltinRules
    .filter(name => coreRules[name] == null)
    .map(name => builtinNameToTs(name))

  const tsRules = {
    ...removeProps(loveConfig.rules, [
      ...nonTsRules,
      ...rulesNotInStandard,

      // Standard.js focuses on eliminating errors,
      // not cleaning up harmless extra code:
      '@typescript-eslint/no-empty-object-type',
      '@typescript-eslint/no-inferrable-types',
      '@typescript-eslint/no-redundant-type-constituents',
      '@typescript-eslint/no-unnecessary-condition',
      '@typescript-eslint/no-unnecessary-type-conversion',
      '@typescript-eslint/no-unnecessary-type-parameters',

      // Allow enums to be more flexible:
      '@typescript-eslint/no-mixed-enums',
      '@typescript-eslint/prefer-literal-enum-member',

      // Don't lock the `any` emergency exit:
      '@typescript-eslint/no-explicit-any',
      '@typescript-eslint/no-non-null-assertion',
      '@typescript-eslint/no-unsafe-argument',
      '@typescript-eslint/no-unsafe-assignment',
      '@typescript-eslint/no-unsafe-call',
      '@typescript-eslint/no-unsafe-function-type',
      '@typescript-eslint/no-unsafe-member-access',
      '@typescript-eslint/no-unsafe-return',
      '@typescript-eslint/no-unsafe-type-assertion'
    ]),

    // Allow throwing `unknown` or `any`:
    '@typescript-eslint/only-throw-error': [
      'error',
      {
        allowRethrowing: true,
        allowThrowingAny: true,
        allowThrowingUnknown: true
      }
    ],
    '@typescript-eslint/prefer-promise-reject-errors': [
      'error',
      {
        allowThrowingAny: true,
        allowThrowingUnknown: true
      }
    ],

    // Allow default cases in exhaustive switches:
    '@typescript-eslint/switch-exhaustiveness-check': [
      'error',
      {
        allowDefaultCaseForExhaustiveSwitch: true,
        considerDefaultExhaustiveForUnions: true,
        requireDefaultForNonUnion: false
      }
    ],

    // Allow empty interfaces, but not the tricky `{}` type:
    '@typescript-eslint/no-empty-object-type': [
      'error',
      {
        allowInterfaces: 'always'
      }
    ]
  }

  return {
    ...tsRules,
    ...makeDisableList(tsRules, coreRules)
  }
}

// Taken from https://typescript-eslint.io/rules/?=extension#rules
const replacedBuiltinRules = [
  'class-methods-use-this',
  'consistent-return',
  'default-param-last',
  'dot-notation',
  'init-declarations',
  'max-params',
  'no-array-constructor',
  'no-dupe-class-members',
  'no-empty-function',
  'no-implied-eval',
  'no-invalid-this',
  'no-loop-func',
  'no-loss-of-precision',
  'no-magic-numbers',
  'no-redeclare',
  'no-restricted-imports',
  'no-shadow',
  'no-unused-expressions',
  'no-unused-vars',
  'no-use-before-define',
  'no-useless-constructor',
  'no-throw-literal', // Replaced by '@typescript-eslint/only-throw-error'
  'prefer-destructuring',
  'prefer-promise-reject-errors',
  'require-await'
]

function builtinNameToTs(name) {
  if (name === 'no-throw-literal') {
    return '@typescript-eslint/only-throw-error'
  }
  return `@typescript-eslint/${name}`
}

/**
 * Creates a list of Standard.js rules that need to be disabled,
 * because a TypeScript rule replaces it.
 */
function makeDisableList(tsRules, coreRules) {
  const rulesToDisable = replacedBuiltinRules
    .filter(name => coreRules[name] != null)
    .filter(name => tsRules[builtinNameToTs(name)] != null)

  const out = {
    'no-undef': 'off' // TypeScript itself handles this
  }
  for (const name of rulesToDisable) out[name] = 'off'
  return out
}
