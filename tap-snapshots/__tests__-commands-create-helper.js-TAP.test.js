/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`__tests__/commands/create/helper.js TAP CREATE_HELPER: Shows help on --help > output 1`] = `
index.js create helper <name>

create new helper

Options:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  index.js create helper Date

`

exports[`__tests__/commands/create/helper.js TAP CREATE_HELPER: success > output 1`] = `
✔ date Helper created

  Use:
  import date from '~/helpers/date';
  

`

exports[`__tests__/commands/create/helper.js TAP CREATE_HELPER: error on duplicate > output 1`] = `
✖ date helper already exits! Please choose some another name!!!

`

exports[`__tests__/commands/create/helper.js TAP HELPER_CONTENT: src/helpers/date.js > output 1`] = `
/* @flow */

export function newHelper(msg:string = 'Hello'): string {
  return \`new Helper \${msg}\`;
}

export default {
  newHelper
}

`

exports[`__tests__/commands/create/helper.js TAP HELPER_CONTENT: src/helpers/__tests__/date.spec.js > output 1`] = `
import DateHelper from '../date';

test('DateHelper newHelper', () => {
  expect(DateHelper.newHelper('hello')).toBe('new Helper hello');
});

/** Write your test cases here **/

`
