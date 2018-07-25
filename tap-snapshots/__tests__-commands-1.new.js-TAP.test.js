/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`__tests__/commands/1.new.js TAP Shows help on new --help > output 1`] = `
index.js new <app>

Initialize new app

App Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]

Options:
  --target, -t    target template name
                                 [string] [required] [choices: "vue", "vue-pwa"]
  --dependencies  to skip dependencies installation use --no-dependencies
                                                       [boolean] [default: true]

Examples:
  index.js new HelloWorld

`

exports[`__tests__/commands/1.new.js TAP Show error on new without target > output 1`] = `
Missing required argument: target

`

exports[`__tests__/commands/1.new.js TAP Show error on invalid varient or target > output 1`] = `
Invalid values:
  Argument: target, Given: "invalid", Choices: "vue", "vue-pwa"

`

exports[`__tests__/commands/1.new.js TAP Show error on multiple new project name > output 1`] = `
Please give only one argument as a directory name!!!

`

exports[`__tests__/commands/1.new.js TAP Create project without dependencies > output 1`] = `
- Fetching the zcui-vue variant...
✔ Completed.....You are good to go!
  Project hello-world created.

  >_ [RUN]
  $ cd hello-world
  $ npm install   # to install dependencies
  $ npm run dev   # to start dev server
  $ npm run prod  # to build for production
      

`

exports[`__tests__/commands/1.new.js TAP Create project > output 1`] = `
- Fetching the zcui-vue variant...
✔ Completed.....You are good to go!
  Project hello-world created.

  >_ [RUN]
  $ cd hello-world
  $ npm run dev   # to start dev server
  $ npm run prod  # to build for production
        

`

exports[`__tests__/commands/1.new.js TAP Error on duplicate project > output 1`] = `
HelloWorld directory already exits! Please choose some another name!!!

`
