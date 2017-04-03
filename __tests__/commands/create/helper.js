const tap = require('tap');
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

const test = tap.test;
const zcui = `node ${path.resolve(__dirname, '../../../index.js')} create helper`;
const testProjPath = path.resolve(__dirname, '../../../temp/test-proj');

/*
 * hello-world was project created
 * in new command testing
 */
shell.cd(path.join(testProjPath, 'hello-world'));

test("CREATE_HELPER: Shows help on --help", t => {
  const command = `${zcui} --help`;
  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 1) t.fail();
    t.equal(stdout.trim(), `../../../index.js create helper <name>

Options:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  ../../../index.js create helper Date
    `.trim());
    t.end();
  });
});

test("CREATE_HELPER: success", t => {
  const command = `${zcui} date`;

  /**
   * Cleanup date helper
   */
  shell.rm('-rf', 'src/helpers/date.js', {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 1) t.fail(stderr);
    t.equal(stdout.trim(), `✔ date Helper created

  Use:
  import date from '~/helpers/date';
    `.trim());
    t.end();
  });
});

test("CREATE_HELPER: has helper files", t => {

  /**
   * Don not remove date helper
   * date helper created in previous test
   */
  t.ok(shell.test('-f', 'src/helpers/date.js'));
  t.ok(shell.test('-f', 'src/helpers/__tests__/date.spec.js'));
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
    t.equal(stdout.trim(), '✖ date helper already exits! Please choose some another name!!!');
    t.end();
  });
});

test("HELPER_CONTENT: helper.js", t => {
  t.equal(fs.readFileSync('src/helpers/date.js', 'utf-8').trim(), `
/* @flow */

export function newHelper(msg:string = 'Hello'): string {
  return \`new Helper \${msg}\`;
}

export default {
  newHelper
}
  `.trim());
  t.end();
});

test("HELPER_CONTENT: __tests__/helper.spec.js", t => {
  t.equal(fs.readFileSync('src/helpers/__tests__/date.spec.js', 'utf-8').trim(), `
/* @flow */

import DateHelper from '../date';

test('DateHelper newHelper', () => {
  expect(DateHelper.newHelper('hello')).toBe('new Helper hello');
});

/** Write your test cases here **/
  `.trim());
  t.end();
});

