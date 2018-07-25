/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`__tests__/commands/create/page.js TAP CREATE_PAGE: Shows help on --help > output 1`] = `
index.js create page <name>

create new page

Options:
  --layout, -l   layout for the page        [string] [required] [choices: false]
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  index.js create page Home --layout default # for page with layout default
  index.js create page Home --no-layout      # for page without any layout

`

exports[`__tests__/commands/create/page.js TAP CREATE_PAGE: error without layout > output 1`] = `
Missing required argument: layout

`

exports[`__tests__/commands/create/page.js TAP CREATE_PAGE: error on empty layout name > output 1`] = `
Invalid values:
  Argument: layout, Given: "", Choices: false

`

exports[`__tests__/commands/create/page.js TAP CREATE_PAGE: error on invalid layout > output 1`] = `
Invalid values:
  Argument: layout, Given: "invalid", Choices: false

`

exports[`__tests__/commands/create/page.js TAP CREATE_PAGE: success without layout > output 1`] = `
✔ home Page created

  Use:
  import Home from '~/pages/home';
  

`

exports[`__tests__/commands/create/page.js TAP CREATE_PAGE: success with layout > output 1`] = `
✔ home Page created

  Use:
  import Home from '~/pages/home';
  

`

exports[`__tests__/commands/create/page.js TAP CREATE_PAGE: error on duplicate > output 1`] = `
✖ home page already exits! Please choose some another name!!!

`

exports[`__tests__/commands/create/page.js TAP PAGE_CONTENT: src/pages/home/index.js > output 1`] = `
import HomePage from './home.vue';
export default HomePage;

`

exports[`__tests__/commands/create/page.js TAP PAGE_CONTENT: src/pages/home/home.js > output 1`] = `
/* @flow */

import DefaultLayout from '~/layouts/default';

export default {
  name: 'page-home',
  components: {
    DefaultLayout
  },
  data() {
    return {}
  }
}


`

exports[`__tests__/commands/create/page.js TAP PAGE_CONTENT: src/pages/home/home.vue > output 1`] = `
<template>
  <layout-default>
    <div class="page page-home">home</div>
  </layout-default>
</template>

<script>
import './home.scss';

import HomePage from './home';
export default HomePage;
</script>


`

exports[`__tests__/commands/create/page.js TAP PAGE_CONTENT: src/pages/home/home.scss > output 1`] = `
.page-home {
}

`

exports[`__tests__/commands/create/page.js TAP PAGE_CONTENT: src/pages/home/home.spec.js > output 1`] = `
import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import HomePage from './home.vue';

/* Import state from store modules */
// import {state as AppState} from '~/store/modules/app';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('HomePage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(HomePage, {
      propsData: {},
      mocks: {
        $store: {
          state: {
            /* imported states */
            // App: AppState,
          },
        },
      },
      localVue,
    });
  });

  it('has page className', () => {
    expect(wrapper.classes()).toContain('page-home');
  });
});

`
