const tap = require('tap');
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

const test = tap.test;
const zcui = `node ${path.resolve(__dirname, '../../../index.js')} create store`;
const testProjPath = path.resolve(__dirname, '../../../temp/test-proj');

const storeName = 'user';
const storeFiles = [
  `src/store/modules/${storeName}.js`,
  `src/store/modules/__tests__/${storeName}.spec.js`,
];

/*
 * hello-world was project created
 * in new command testing
 */
shell.cd(path.join(testProjPath, 'hello-world'));

test("CREATE_STORE: Shows help on --help", t => {
  const command = `${zcui} --help`;
  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 1) t.fail();
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

test("CREATE_STORE: success", t => {
  const command = `${zcui} ${storeName}`;

  /**
   * Cleanup user store
   */
  shell.rm('-rf', 'src/store', {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 1) t.fail(stderr);
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

test("CREATE_STORE: has store module files", t => {

  /**
   * Don not remove user store
   * user store created in previous test
   */
  storeFiles.forEach(file => {
    t.ok(shell.test('-f', file));
  });
  t.end();
});

test("CREATE_STORE: error on duplicate", t => {
  const command = `${zcui} ${storeName}`;

  /**
   * Don not remove user store
   * user store created in previous test
   */

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stderr);
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

storeFiles.forEach(file => {
  test(`STORE_CONTENT: ${file}`, t => {
    t.matchSnapshot(fs.readFileSync(file, 'utf-8'), 'output');
    t.end();
  });
});
