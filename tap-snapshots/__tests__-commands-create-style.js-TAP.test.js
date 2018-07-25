/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`__tests__/commands/create/style.js TAP CREATE_STYLE: Shows help on --help > output 1`] = `
index.js create style <name>

create new style

Options:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  index.js create style button

`

exports[`__tests__/commands/create/style.js TAP CREATE_STYLE: success > output 1`] = `
✔ button Style _partial created

`

exports[`__tests__/commands/create/style.js TAP CREATE_STYLE: error on duplicate > output 1`] = `
✖ button style already exits! Please choose some another name!!!

`

exports[`__tests__/commands/create/style.js TAP STYLE_CONTENT: src/styles/partials/_button.scss > output 1`] = `
.button {
}


`
