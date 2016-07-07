#!/usr/bin/env node

'use strict'

const filename = process.argv[2]
if (!filename) {
  console.error('need <filename.json>')
  process.exit(-1)
}

const resolve = require('path').resolve
const json = require(resolve(filename))
// http://docs.gitlab.com/ce/ci/variables/README.html
const ciVariables = [
  'GITLAB_CI',
  'CI_SERVER',
  'CI_SERVER_NAME',
  'CI_SERVER_VERSION',
  'CI_SERVER_REVISION',
  'CI_BUILD_REF', // commit id
  'CI_BUILD_TAG',
  'CI_BUILD_NAME',
  'CI_BUILD_STAGE',
  'CI_BUILD_REF_NAME',
  'CI_BUILD_ID',
  'CI_BUILD_REPO',
  'CI_BUILD_TRIGGERED',
  // 'CI_BUILD_TOKEN' - not sending this for security
  'CI_PROJECT_ID',
  'CI_PROJECT_DIR',
  // maybe a couple of dummy variables
  // for passing user values
  'CI_PIPELINE'
]
const ci = {}
ciVariables.forEach((key) => {
  ci[key] = process.env[key]
})
json.ci = ci
console.log(JSON.stringify(json, null, 2) + '\n\n')
