const tap = require('tap');
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

const test = tap.test;
const zcui = `node ${path.resolve(__dirname, '../../../index.js')} create style`;
const testProjPath = path.resolve(__dirname, '../../../temp/test-proj');

const styleName = 'button';
const styleFiles = [
  `src/styles/partials/_${styleName}.scss`,
];

/*
 * hello-world was project created
 * in new command testing
 */
shell.cd(path.join(testProjPath, 'hello-world'));

test("CREATE_STYLE: Shows help on --help", t => {
  const command = `${zcui} --help`;
  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 1) t.fail();
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

test("CREATE_STYLE: success", t => {
  const command = `${zcui} ${styleName}`;

  /**
   * Cleanup button style partial
   */
  shell.rm('-rf', 'src/styles/partials', {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 1) t.fail(stderr);
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

test("CREATE_STYLE: has style files", t => {

  /**
   * Don not remove button style partial
   * button style partial created in previous test
   */
  t.ok(shell.test('-f', 'src/styles/partials/_index.scss'));
  styleFiles.forEach(file => {
    t.ok(shell.test('-f', file));
  });
  t.end();
});

test("CREATE_STYLE: error on duplicate", t => {
  const command = `${zcui} ${styleName}`;

  /**
   * Don not remove button style partial
   * button style partial created in previous test
   */

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stderr);
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

styleFiles.forEach(file => {
  test(`STYLE_CONTENT: ${file}`, t => {
    t.matchSnapshot(fs.readFileSync(file, 'utf-8'), 'output');
    t.end();
  });
});
