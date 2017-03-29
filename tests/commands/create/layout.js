const tap = require('tap');
const shell = require('shelljs');
const path = require('path');

const test = tap.test;
const zcui = `node ${path.resolve(__dirname, '../../../index.js')} create layout`;
const testProjPath = path.resolve(__dirname, '../../../temp/test-proj');

/*
 * hello-world was project created
 * in new command testing
 */
shell.cd(path.join(testProjPath, 'hello-world'));

test("CREATE_LAYOUT: Shows help on --help", t => {
  const command = `${zcui} --help`;
  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 1) t.fail();
    t.equal(stdout.trim(), `../../../index.js create layout <name>

Options:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  ../../../index.js create layout Primary
    `.trim());
    t.end();
  });
});

test("CREATE_LAYOUT: success", t => {
  const command = `${zcui} default`;

  /**
   * Cleanup default layout
   */
  shell.rm('-rf', 'src/layouts/default', {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 1) t.fail(stderr);
    t.equal(stdout.trim(), `✔ default Layout created

  Use:
  import Default from '~/layouts/default';
    `.trim());
    t.end();
  });
});

test("CREATE_LAYOUT: has layout files", t => {

  /**
   * Don not remove default layout
   * default layout created in previous test
   */
  t.ok(shell.test('-f', 'src/layouts/default/index.js'));
  t.ok(shell.test('-f', 'src/layouts/default/default.js'));
  t.ok(shell.test('-f', 'src/layouts/default/default.vue'));
  t.ok(shell.test('-f', 'src/layouts/default/default.scss'));
  t.end();
});

test("CREATE_LAYOUT: error on duplicate", t => {
  const command = `${zcui} default`;

  /**
   * Don not remove default layout
   * default layout created in previous test
   */

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stderr);
    t.equal(stdout.trim(), '✖ default layout already exits! Please choose some another name!!!');
    t.end();
  });
});

