const tap = require('tap');
const path = require('path');

const test = tap.test;
const helper = require('../../helpers');
const testProjPath = path.resolve(__dirname, '../../temp/test-proj');

test("HELPER_getProjectRoot: null on no parent zcui project", t => {
  const appRoot = helper.getProjectRoot(testProjPath);
  t.notOk(appRoot);
  t.end();
});

test("HELPER_getProjectRoot: path of parent zcui project", t => {
  const projPath = path.join(testProjPath, 'hello-world');
  const appRoot = helper.getProjectRoot(path.join(projPath, 'src'));
  t.equal(appRoot, projPath);
  t.end();
});

