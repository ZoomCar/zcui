import { shallowMount } from '@vue/test-utils';
import ${name.pascal}Layout from './${name.param}.vue';

describe('${name.pascal}Layout', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(${name.pascal}Layout);
  });

  it('has layout className', () => {
    expect(wrapper.classes()).toContain('layout-${name.param}');
  });
});
