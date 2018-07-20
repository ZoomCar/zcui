const tap = require('tap');
const shell = require('shelljs');
const path = require('path');

const test = tap.test;
const zcui = `node ${path.resolve(__dirname, '../../index.js')} new`;
const testProjPath = path.resolve(__dirname, '../../temp/test-proj');

test("Shows help on new --help", t => {
  const command = `${zcui} --help`;
  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 1) t.fail();
    t.equal(stdout.trim(), `index.js new <app>

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
  index.js new HelloWorld`);
    t.end();
  });
});

test("Show error on new without target", t => {
  const command = `${zcui} HelloWorld`;
  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail();
    t.equal(stderr.trim(), 'Missing required argument: target');
    t.end();
  });
});

test("Show error on invalid varient or target", t => {
  const command = `${zcui} HelloWorld -t invalid`;
  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail();
    t.equal(stderr.trim(), `Invalid values:
  Argument: target, Given: "invalid", Choices: "vue", "vue-pwa"`);
    t.end();
  });
});

test("Show error on multiple new project name", t => {
  const command = `${zcui} hello-world new-world -t vue`;
  shell.cd(testProjPath);
  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 0) t.fail();
    t.equal(stdout.trim(), 'Please give only one argument as a directory name!!!');
    t.end();
  });
});

test("Create project without dependencies", t => {
  const command = `${zcui} HelloWorld -t vue --no-dependencies`;

  /**
   * Cleanup test project directory
   */
  shell.rm('-rf', testProjPath, {silent:true});
  shell.mkdir('-p', testProjPath);
  shell.cd(testProjPath);

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 1) t.fail();
    t.equal(stderr.trim(), `- Fetching the zcui-vue variant...
✔ Completed.....You are good to go!
  Project hello-world created.

  >_ [RUN]
  $ cd hello-world
  $ npm install   # to install dependencies
  $ npm run dev   # to start dev server
  $ npm run prod  # to build for production`);
    t.end();
  });
});

test("Create project", t => {
  const command = `${zcui} HelloWorld -t vue`;

  /**
   * Cleanup test project directory
   */
  shell.rm('-rf', testProjPath, {silent:true});
  shell.mkdir('-p', testProjPath);
  shell.cd(testProjPath);

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 1) t.fail();
    t.equal(stderr.trim(), `✔ Completed.....You are good to go!
  Project hello-world created.

  >_ [RUN]
  $ cd hello-world
  $ npm run dev   # to start dev server
  $ npm run prod  # to build for production`);
    t.end();
  });
}, {
  skip: false
});

test("Error on duplicate project", t => {
  const command = `${zcui} HelloWorld -t vue`;

  /**
   * Not cleaning prevously created project
   */

  shell.cd(testProjPath);
  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 0) t.fail();
    t.equal(
      stdout.trim(),
      'HelloWorld directory already exits! Please choose some another name!!!'
    );
    t.end();
  });
});

