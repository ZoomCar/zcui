import {
  mutations,
  // actions,
  state
} from '../${name.param}';

/** Write your test cases here **/

describe('${name.pascal}Module', () => {

  /* Test all mutations here */
  describe('mutation', () => {

    it('default name', () => {
      expect(state.name).toBe('${name.pascal}');
    });

    it('name after mutation', () => {
      mutations.updateName(state);
      expect(state.name).toBe('${name.pascal}-updated');
    });

  });

  /* Test all actions here */
  describe('actions', () => {
  });

});
