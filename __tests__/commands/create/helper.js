const tap = require('tap');
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

const test = tap.test;
const zcui = `node ${path.resolve(__dirname, '../../../index.js')} create helper`;
const testProjPath = path.resolve(__dirname, '../../../temp/test-proj');

const helperName = 'date';
const helperFiles = [
  `src/helpers/${helperName}.js`,
  `src/helpers/__tests__/${helperName}.spec.js`,
];

/*
 * hello-world was project created
 * in new command testing
 */
shell.cd(path.join(testProjPath, 'hello-world'));

test("CREATE_HELPER: Shows help on --help", t => {
  const command = `${zcui} --help`;
  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 1) t.fail();
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

test("CREATE_HELPER: success", t => {
  const command = `${zcui} ${helperName}`;

  /**
   * Cleanup date helper
   */
  helperFiles.forEach(file => {
    shell.rm('-rf', file, {silent: true});
  });

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 1) t.fail(stderr);
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

test("CREATE_HELPER: has helper files", t => {

  /**
   * Don not remove date helper
   * date helper created in previous test
   */
  helperFiles.forEach(file => {
    t.ok(shell.test('-f', file));
  });
  t.end();
});

test("CREATE_HELPER: error on duplicate", t => {
  const command = `${zcui} date`;

  /**
   * Don not remove date helper
   * date helper created in previous test
   */
  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stderr);
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

helperFiles.forEach(file => {
  test(`HELPER_CONTENT: ${file}`, t => {
    t.matchSnapshot(fs.readFileSync(file, 'utf-8'), 'output');
    t.end();
  });
});
