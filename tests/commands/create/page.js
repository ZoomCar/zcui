const tap = require('tap');
const shell = require('shelljs');
const path = require('path');

const test = tap.test;
const zcuiCli = `node ${path.resolve(__dirname, '../../../index.js')}`;
const zcui = `${zcuiCli} create page`;
const testProjPath = path.resolve(__dirname, '../../../temp/test-proj');

/*
 * hello-world was project created
 * in new command testing
 */
shell.cd(path.join(testProjPath, 'hello-world'));

test("CREATE_PAGE: Shows help on --help", t => {
  const command = `${zcui} --help`;

  /*
   * Cleanup Layouts dir,
   * so its doesn't effect help text
   */
  shell.rm('-rf', 'src/layouts');

  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 1) t.fail();
    t.equal(stdout.trim(), `../../../index.js create page <name>

Options:
  --layout, -l   layout for the page        [string] [required] [choices: false]
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  ../../../index.js create page Home --layout default # for page with layout
  default
  ../../../index.js create page Home --no-layout      # for page without any
  layout
    `.trim());
    t.end();
  });
});

test("CREATE_PAGE: error without layout", t => {
  const command = `${zcui} home`;

  /**
   * Cleanup home page
   */
  shell.rm('-rf', 'src/pages/home', {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stdout);
    t.equal(stderr.trim(), `Missing required argument: layout`.trim());
    t.end();
  });
});

test("CREATE_PAGE: error on empty layout name", t => {
  const command = `${zcui} home -l`;

  /**
   * Cleanup home page
   */
  shell.rm('-rf', 'src/pages/home', {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stdout);
    t.equal(stderr.trim(), `Invalid values:
  Argument: layout, Given: "", Choices: false
`.trim());
    t.end();
  });
});

test("CREATE_PAGE: error on invalid layout", t => {
  const command = `${zcui} home -l invalid`;

  /**
   * Cleanup home page
   */
  shell.rm('-rf', 'src/pages/home', {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stdout);
    t.equal(stderr.trim(), `Invalid values:
  Argument: layout, Given: "invalid", Choices: false
`.trim());
    t.end();
  });
});

test("CREATE_PAGE: success without layout", t => {
  const command = `${zcui} home --no-layout`;

  /**
   * Cleanup home page
   */
  shell.rm('-rf', 'src/pages/home', {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 1) t.fail(stderr);
    t.equal(stdout.trim(), `✔ home Page created

  Use:
  import Home from '~/pages/home';
`.trim());
    t.end();
  });
});

test("CREATE_PAGE: success with layout", t => {
  /**
   * Cleanup home page
   */
  shell.rm('-rf', 'src/pages/home', {silent: true});

  /**
   * Create a layout to use
   */
  shell.exec(`${zcuiCli} create layout default`, {silent: true});

  const command = `${zcui} home -l default`;
  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 1) t.fail(stderr);
    t.equal(stdout.trim(), `✔ home Page created

  Use:
  import Home from '~/pages/home';
`.trim());
    t.end();
  });
});

test("CREATE_PAGE: has component files", t => {

  /**
   * Don not remove home page
   * home page created in previous test
   */
  t.ok(shell.test('-f', 'src/pages/home/index.js'));
  t.ok(shell.test('-f', 'src/pages/home/home.js'));
  t.ok(shell.test('-f', 'src/pages/home/home.vue'));
  t.ok(shell.test('-f', 'src/pages/home/home.scss'));
  t.end();
});

test("CREATE_PAGE: error on duplicate", t => {
  const command = `${zcui} home --no-layout`;

  /**
   * Don not remove home page
   * home page created in previous test
   */

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stderr);
    t.equal(stdout.trim(), '✖ home page already exits! Please choose some another name!!!');
    t.end();
  });
});

