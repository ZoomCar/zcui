const tap = require('tap');
const shell = require('shelljs');
const path = require('path');

const test = tap.test;
const zcui = `node ${path.resolve(__dirname, '../../../index.js')} create style`;
const testProjPath = path.resolve(__dirname, '../../../temp/test-proj');

/*
 * hello-world was project created
 * in new command testing
 */
shell.cd(path.join(testProjPath, 'hello-world'));

test("CREATE_STYLE: Shows help on --help", t => {
  const command = `${zcui} --help`;
  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 1) t.fail();
    t.equal(stdout.trim(), `../../../index.js create style <name>

Options:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  ../../../index.js create style button
    `.trim());
    t.end();
  });
});

test("CREATE_STYLE: success", t => {
  const command = `${zcui} button`;

  /**
   * Cleanup button style partial
   */
  shell.rm('-rf', 'src/styles/partials', {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 1) t.fail(stderr);
    t.equal(stdout.trim(), `✔ button Style _partial created`.trim());
    t.end();
  });
});

test("CREATE_STYLE: has style files", t => {

  /**
   * Don not remove button style partial
   * button style partial created in previous test
   */
  t.ok(shell.test('-f', 'src/styles/partials/_index.scss'));
  t.ok(shell.test('-f', 'src/styles/partials/_button.scss'));
  t.end();
});

test("CREATE_STYLE: error on duplicate", t => {
  const command = `${zcui} button`;

  /**
   * Don not remove button style partial
   * button style partial created in previous test
   */

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stderr);
    t.equal(stdout.trim(), '✖ button style already exits! Please choose some another name!!!');
    t.end();
  });
});

