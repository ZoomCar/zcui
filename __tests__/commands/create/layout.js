const tap = require('tap');
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

const test = tap.test;
const zcui = `node ${path.resolve(__dirname, '../../../index.js')} create layout`;
const testProjPath = path.resolve(__dirname, '../../../temp/test-proj');

const layoutName = 'default';
const layoutFiles = [
  `src/layouts/${layoutName}/index.js`,
  `src/layouts/${layoutName}/${layoutName}.js`,
  `src/layouts/${layoutName}/${layoutName}.vue`,
  `src/layouts/${layoutName}/${layoutName}.scss`,
  `src/layouts/${layoutName}/${layoutName}.spec.js`,
];

/*
 * hello-world was project created
 * in new command testing
 */
shell.cd(path.join(testProjPath, 'hello-world'));

test("CREATE_LAYOUT: Shows help on --help", t => {
  const command = `${zcui} --help`;
  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 1) t.fail();
    t.matchSnapshot(stdout, 'output');
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
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

test("CREATE_LAYOUT: has layout files", t => {

  /**
   * Don not remove default layout
   * default layout created in previous test
   */
  layoutFiles.forEach(file => {
    t.ok(shell.test('-f', file));
  });
  t.end();
});

test("CREATE_LAYOUT: error on duplicate", t => {
  const command = `${zcui} ${layoutName}`;

  /**
   * Do not remove default layout
   * default layout created in previous test
   */
  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stderr);
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

layoutFiles.forEach(file => {
  test(`LAYOUT_CONTENT: ${file}`, t => {
    t.matchSnapshot(fs.readFileSync(file, 'utf-8'), 'output');
    t.end();
  });
});
