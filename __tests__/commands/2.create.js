const tap = require('tap');
const shell = require('shelljs');
const path = require('path');

const test = tap.test;
const zcui = `node ${path.resolve(__dirname, '../../index.js')} create`;
const testProjPath = path.resolve(__dirname, '../../temp/test-proj');

test("shows error on create command outside zcui project", t => {
  shell.cd(path.join(testProjPath));
  shell.exec(`${zcui} --help`, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail();
    t.matchSnapshot(stderr, 'output');
    t.end();
  });
});

test("shows help on create --help", t => {
  shell.cd(path.join(testProjPath, 'hello-world'));
  shell.exec(`${zcui} --help`, {silent:true}, (code, stdout) => {
    if(code === 1) t.fail();
    t.matchSnapshot(stdout, 'output');
    t.end();
  });
});
