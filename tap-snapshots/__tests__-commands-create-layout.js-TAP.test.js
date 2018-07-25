/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`__tests__/commands/create/layout.js TAP CREATE_LAYOUT: Shows help on --help > output 1`] = `
index.js create layout <name>

create new layout

Options:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  index.js create layout Primary

`

exports[`__tests__/commands/create/layout.js TAP CREATE_LAYOUT: success > output 1`] = `
✔ default Layout created

  Use:
  import Default from '~/layouts/default';
  

`

exports[`__tests__/commands/create/layout.js TAP CREATE_LAYOUT: error on duplicate > output 1`] = `
✖ default layout already exits! Please choose some another name!!!

`

exports[`__tests__/commands/create/layout.js TAP LAYOUT_CONTENT: src/layouts/default/index.js > output 1`] = `
import DefaultLayout from './default.vue';
export default DefaultLayout;

`

exports[`__tests__/commands/create/layout.js TAP LAYOUT_CONTENT: src/layouts/default/default.js > output 1`] = `
/* @flow */

export default {
  name: 'layout-default',
  data() {
    return {}
  }
}

`

exports[`__tests__/commands/create/layout.js TAP LAYOUT_CONTENT: src/layouts/default/default.vue > output 1`] = `
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

`

exports[`__tests__/commands/create/layout.js TAP LAYOUT_CONTENT: src/layouts/default/default.scss > output 1`] = `
.layout-default {
}

`

exports[`__tests__/commands/create/layout.js TAP LAYOUT_CONTENT: src/layouts/default/default.spec.js > output 1`] = `
import { shallowMount } from '@vue/test-utils';
import DefaultLayout from './default.vue';

describe('DefaultLayout', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DefaultLayout);
  });

  it('has layout className', () => {
    expect(wrapper.classes()).toContain('layout-default');
  });
});

`
