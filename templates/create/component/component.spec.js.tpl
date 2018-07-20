import { shallowMount } from '@vue/test-utils';
import ${name.pascal} from './${name.param}.vue';

describe('${name.pascal}', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(${name.pascal});
  });

  it('has component className', () => {
    expect(wrapper.classes()).toContain('component-${name.param}');
  });
});
