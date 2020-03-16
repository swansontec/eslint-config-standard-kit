/* global describe, it */

import { ruleFiles } from '../src/rules/rule-files.js'
import { checkJsonSnapshot, checkTextSnapshot } from './snapshot.js'

describe('rules', function () {
  const filenames = Object.keys(ruleFiles).sort()

  it('matches file list', function () {
    checkJsonSnapshot('rules.list', filenames)
  })

  filenames.forEach(filename =>
    it(filename, function () {
      const snapshot =
        'rules-' + filename.replace('/', '-').replace(/\.js$/, '')

      checkTextSnapshot(snapshot, ruleFiles[filename])
    })
  )
})
