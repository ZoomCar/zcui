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
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

test("Show error on new without target", t => {
  const command = `${zcui} HelloWorld`;
  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail();
    t.matchSnapshot(stderr, 'output');
    t.end();
  });
});

test("Show error on invalid varient or target", t => {
  const command = `${zcui} HelloWorld -t invalid`;
  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail();
    t.matchSnapshot(stderr, 'output');
    t.end();
  });
});

test("Show error on multiple new project name", t => {
  const command = `${zcui} hello-world new-world -t vue`;
  shell.cd(testProjPath);
  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 0) t.fail();
    t.matchSnapshot(stdout, 'output');
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
    t.matchSnapshot(stderr, 'output');
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
    t.matchSnapshot(stderr, 'output');
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
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});

