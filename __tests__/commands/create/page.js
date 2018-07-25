const tap = require('tap');
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

const test = tap.test;
const zcuiCli = `node ${path.resolve(__dirname, '../../../index.js')}`;
const zcui = `${zcuiCli} create page`;
const testProjPath = path.resolve(__dirname, '../../../temp/test-proj');

const pageName = 'home';
const pageFiles = [
  `src/pages/${pageName}/index.js`,
  `src/pages/${pageName}/${pageName}.js`,
  `src/pages/${pageName}/${pageName}.vue`,
  `src/pages/${pageName}/${pageName}.scss`,
  `src/pages/${pageName}/${pageName}.spec.js`,
];

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
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

test("CREATE_PAGE: error without layout", t => {
  const command = `${zcui} ${pageName}`;

  /**
   * Cleanup home page
   */
  shell.rm('-rf', `src/pages/${pageName}`, {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stdout);
    t.matchSnapshot(stderr, 'output');
    t.end();
  });
});

test("CREATE_PAGE: error on empty layout name", t => {
  const command = `${zcui} ${pageName} -l`;

  /**
   * Cleanup home page
   */
  shell.rm('-rf', `src/pages/${pageName}`, {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stdout);
    t.matchSnapshot(stderr, 'output');
    t.end();
  });
});

test("CREATE_PAGE: error on invalid layout", t => {
  const command = `${zcui} ${pageName} -l invalid`;

  /**
   * Cleanup home page
   */
  shell.rm('-rf', `src/pages/${pageName}`, {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stdout);
    t.matchSnapshot(stderr, 'output');
    t.end();
  });
});

test("CREATE_PAGE: success without layout", t => {
  const command = `${zcui} ${pageName} --no-layout`;

  /**
   * Cleanup home page
   */
  shell.rm('-rf', `src/pages/${pageName}`, {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 1) t.fail(stderr);
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

test("CREATE_PAGE: success with layout", t => {
  /**
   * Cleanup home page
   */
  shell.rm('-rf', `src/pages/${pageName}`, {silent: true});

  /**
   * Create a layout to use
   */
  shell.exec(`${zcuiCli} create layout default`, {silent: true});

  const command = `${zcui} ${pageName} -l default`;
  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 1) t.fail(stderr);
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

test("CREATE_PAGE: has component files", t => {

  /**
   * Don not remove home page
   * home page created in previous test
   */
  pageFiles.forEach(file => {
    t.ok(shell.test('-f',file));
  });
  t.end();
});

test("CREATE_PAGE: error on duplicate", t => {
  const command = `${zcui} ${pageName} --no-layout`;

  /**
   * Don not remove home page
   * home page created in previous test
   */

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stderr);
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

pageFiles.forEach(file => {
  test(`PAGE_CONTENT: ${file}`, t => {
    t.matchSnapshot(fs.readFileSync(file, 'utf-8'), 'output');
    t.end();
  });
});
