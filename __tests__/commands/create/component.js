const tap = require('tap');
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

const test = tap.test;
const zcui = `node ${path.resolve(__dirname, '../../../index.js')} create component`;
const testProjPath = path.resolve(__dirname, '../../../temp/test-proj');

/*
 * hello-world project was created
 * in new command testing
 */
shell.cd(path.join(testProjPath, 'hello-world'));

test("CREATE_COMPONENT: Shows help on --help", t => {
  const command = `${zcui} --help`;
  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 1) t.fail();
    t.equal(stdout.trim(), `../../../index.js create component <name>

Options:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  ../../../index.js create component zc-calendar
    `.trim());
    t.end();
  });
});

test("CREATE_COMPONENT: success", t => {
  const command = `${zcui} zc-calendar`;

  /**
   * Cleanup zc-calendar component
   */
  shell.rm('-rf', 'src/components/zc-calendar', {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 1) t.fail(stderr);
    t.equal(stdout.trim(), `✔ zc-calendar Component created

  Use:
  import ZcCalendar from '~/components/zc-calendar';
    `.trim());
    t.end();
  });
});

test("CREATE_COMPONENT: has component files", t => {

  /**
   * Don not remove zc-calendar component
   * zc-calendar component created in previous test
   */
  t.ok(shell.test('-f', 'src/components/zc-calendar/index.js'));
  t.ok(shell.test('-f', 'src/components/zc-calendar/zc-calendar.js'));
  t.ok(shell.test('-f', 'src/components/zc-calendar/zc-calendar.vue'));
  t.ok(shell.test('-f', 'src/components/zc-calendar/zc-calendar.scss'));
  t.end();
});

test("CREATE_COMPONENT: error on duplicate", t => {
  const command = `${zcui} zc-calendar`;

  /**
   * Don not remove zc-calendar component
   * zc-calendar component created in previous test
   */

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stderr);
    t.equal(stdout.trim(), '✖ zc-calendar component already exits! Please choose some another name!!!');
    t.end();
  });
});

test("COMPONENT_CONTENT: index.js", t => {
  t.equal(fs.readFileSync('src/components/zc-calendar/index.js', 'utf-8').trim(), `
import ZcCalendar from './zc-calendar.vue';
export default ZcCalendar;
  `.trim());
  t.end();
});

test("COMPONENT_CONTENT: component.js", t => {
  t.equal(fs.readFileSync('src/components/zc-calendar/zc-calendar.js', 'utf-8').trim(), `
/* @flow */

export default {
  name: 'zc-calendar',
  data() {
    return {}
  }
}
  `.trim());
  t.end();
});

test("COMPONENT_CONTENT: component.vue", t => {
  t.equal(fs.readFileSync('src/components/zc-calendar/zc-calendar.vue', 'utf-8').trim(), `
<template>
  <div class="component-zc-calendar">zc-calendar</div>
</template>

<script>
import './zc-calendar.scss';

import ZcCalendar from './zc-calendar';
export default ZcCalendar;
</script>
  `.trim());
  t.end();
});

test("COMPONENT_CONTENT: component.scss", t => {
  t.equal(fs.readFileSync('src/components/zc-calendar/zc-calendar.scss', 'utf-8').trim(), `
.component-zc-calendar {
}
  `.trim());
  t.end();
});

test("COMPONENT_CONTENT: component.spec.js", t => {
  t.equal(fs.readFileSync('src/components/zc-calendar/zc-calendar.spec.js', 'utf-8').trim(), `
import ZcCalendar from './zc-calendar';

test('ZcCalendar name', () => {
  expect(ZcCalendar.name).toBe('zc-calendar');
});
  `.trim());
  t.end();
});

