const tap = require('tap');
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

const test = tap.test;
const zcui = `node ${path.resolve(__dirname, '../../../index.js')} create component`;
const testProjPath = path.resolve(__dirname, '../../../temp/test-proj');

const componentName = 'zc-calendar';
const componentFiles = [
  `src/components/${componentName}/index.js`,
  `src/components/${componentName}/${componentName}.js`,
  `src/components/${componentName}/${componentName}.vue`,
  `src/components/${componentName}/${componentName}.scss`,
  `src/components/${componentName}/${componentName}.spec.js`,
];

/*
 * hello-world project was created
 * in new command testing
 */
shell.cd(path.join(testProjPath, 'hello-world'));

test("CREATE_COMPONENT: Shows help on --help", t => {
  const command = `${zcui} --help`;
  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 1) t.fail();
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

test("CREATE_COMPONENT: success", t => {
  const command = `${zcui} ${componentName}`;

  /**
   * Cleanup zc-calendar component
   */
  shell.rm('-rf', `src/components/${componentName}`, {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 1) t.fail(stderr);
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

test("CREATE_COMPONENT: has component files", t => {

  /**
   * Don not remove zc-calendar component
   * zc-calendar component created in previous test
   */
  componentFiles.forEach(file => {
    t.ok(shell.test('-f', file));
  });
  t.end();
});

test("CREATE_COMPONENT: error on duplicate", t => {
  const command = `${zcui} ${componentName}`;

  /**
   * Don not remove zc-calendar component
   * zc-calendar component created in previous test
   */
  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stderr);
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

componentFiles.forEach(file => {
  test(`COMPONENT_CONTENT: ${file}`, t => {
    t.matchSnapshot(fs.readFileSync(file, 'utf-8'), 'output');
    t.end();
  });
});
