const tap = require('tap');
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

const test = tap.test;
const zcui = `node ${path.resolve(__dirname, '../../../index.js')} create layout`;
const testProjPath = path.resolve(__dirname, '../../../temp/test-proj');

/*
 * hello-world was project created
 * in new command testing
 */
shell.cd(path.join(testProjPath, 'hello-world'));

test("CREATE_LAYOUT: Shows help on --help", t => {
  const command = `${zcui} --help`;
  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 1) t.fail();
    t.equal(stdout.trim(), `../../../index.js create layout <name>

Options:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  ../../../index.js create layout Primary
    `.trim());
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
    t.equal(stdout.trim(), `✔ default Layout created

  Use:
  import Default from '~/layouts/default';
    `.trim());
    t.end();
  });
});

test("CREATE_LAYOUT: has layout files", t => {

  /**
   * Don not remove default layout
   * default layout created in previous test
   */
  t.ok(shell.test('-f', 'src/layouts/default/index.js'));
  t.ok(shell.test('-f', 'src/layouts/default/default.js'));
  t.ok(shell.test('-f', 'src/layouts/default/default.vue'));
  t.ok(shell.test('-f', 'src/layouts/default/default.scss'));
  t.end();
});

test("CREATE_LAYOUT: error on duplicate", t => {
  const command = `${zcui} default`;

  /**
   * Do not remove default layout
   * default layout created in previous test
   */

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stderr);
    t.equal(stdout.trim(), '✖ default layout already exits! Please choose some another name!!!');
    t.end();
  });
});

test("LAYOUT_CONTENT: index.js", t => {
  t.equal(fs.readFileSync('src/layouts/default/index.js', 'utf-8').trim(), `
import DefaultLayout from './default.vue';
export default DefaultLayout;
  `.trim());
  t.end();
});

test("LAYOUT_CONTENT: layout.js", t => {
  t.equal(fs.readFileSync('src/layouts/default/default.js', 'utf-8').trim(), `
/* @flow */

export default {
  name: 'layout-default',
  data() {
    return {}
  }
}
  `.trim());
  t.end();
});

test("LAYOUT_CONTENT: layout.vue", t => {
  t.equal(fs.readFileSync('src/layouts/default/default.vue', 'utf-8').trim(), `
<template>
  <div class="layout layout-default">
    <slot>DefaultSlot - default</slot>
  </div>
</template>

<script>
import './default.scss';

import DefaultLayout from './default';
export default DefaultLayout;
</script>
  `.trim());
  t.end();
});

test("LAYOUT_CONTENT: layout.scss", t => {
  t.equal(fs.readFileSync('src/layouts/default/default.scss', 'utf-8').trim(), `
.layout-default {
}
  `.trim());
  t.end();
});

test("LAYOUT_CONTENT: component.spec.js", t => {
  t.equal(fs.readFileSync('src/layouts/default/default.spec.js', 'utf-8').trim(), `
import DefaultLayout from './default';

test('DefaultLayout name', () => {
  expect(DefaultLayout.name).toBe('layout-default');
});
  `.trim());
  t.end();
});

