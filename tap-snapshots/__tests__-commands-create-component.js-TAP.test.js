/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`__tests__/commands/create/component.js TAP CREATE_COMPONENT: Shows help on --help > output 1`] = `
index.js create component <name>

create new component

Options:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  index.js create component zc-calendar

`

exports[`__tests__/commands/create/component.js TAP CREATE_COMPONENT: success > output 1`] = `
✔ zc-calendar Component created

  Use:
  import ZcCalendar from '~/components/zc-calendar';
  

`

exports[`__tests__/commands/create/component.js TAP CREATE_COMPONENT: error on duplicate > output 1`] = `
✖ zc-calendar component already exits! Please choose some another name!!!

`

exports[`__tests__/commands/create/component.js TAP COMPONENT_CONTENT: src/components/zc-calendar/index.js > output 1`] = `
import ZcCalendar from './zc-calendar.vue';
export default ZcCalendar;

`

exports[`__tests__/commands/create/component.js TAP COMPONENT_CONTENT: src/components/zc-calendar/zc-calendar.js > output 1`] = `
/* @flow */

export default {
  name: 'zc-calendar',
  data() {
    return {}
  }
}

`

exports[`__tests__/commands/create/component.js TAP COMPONENT_CONTENT: src/components/zc-calendar/zc-calendar.vue > output 1`] = `
<template>
  <div class="component-zc-calendar">zc-calendar</div>
</template>

<script>
import './zc-calendar.scss';

import ZcCalendar from './zc-calendar';
export default ZcCalendar;
</script>

`

exports[`__tests__/commands/create/component.js TAP COMPONENT_CONTENT: src/components/zc-calendar/zc-calendar.scss > output 1`] = `
.component-zc-calendar {
}

`

exports[`__tests__/commands/create/component.js TAP COMPONENT_CONTENT: src/components/zc-calendar/zc-calendar.spec.js > output 1`] = `
import { shallowMount } from '@vue/test-utils';
import ZcCalendar from './zc-calendar.vue';

describe('ZcCalendar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(ZcCalendar);
  });

  it('has component className', () => {
    expect(wrapper.classes()).toContain('component-zc-calendar');
  });
});

`
