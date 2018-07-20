import Vuex from 'vuex';
import { shallowMount, createLocalVue } from '@vue/test-utils';
import ${name.pascal}Page from './${name.param}.vue';

/* Import state from store modules */
// import {state as AppState} from '~/store/modules/app';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('${name.pascal}Page', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(${name.pascal}Page, {
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
    expect(wrapper.classes()).toContain('page-${name.param}');
  });
});
