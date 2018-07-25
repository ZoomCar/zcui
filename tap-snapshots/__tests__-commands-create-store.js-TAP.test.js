/* IMPORTANT
 * This snapshot file is auto-generated, but designed for humans.
 * It should be checked into source control and tracked carefully.
 * Re-generate by setting TAP_SNAPSHOT=1 and running tests.
 * Make sure to inspect the output below.  Do not ignore changes!
 */
'use strict'
exports[`__tests__/commands/create/store.js TAP CREATE_STORE: Shows help on --help > output 1`] = `
index.js create store <name>

create new store

Options:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  index.js create store User

`

exports[`__tests__/commands/create/store.js TAP CREATE_STORE: success > output 1`] = `
✔ user Store module created

`

exports[`__tests__/commands/create/store.js TAP CREATE_STORE: error on duplicate > output 1`] = `
✖ user store already exits! Please choose some another name!!!

`

exports[`__tests__/commands/create/store.js TAP STORE_CONTENT: src/store/modules/user.js > output 1`] = `
/* @flow */
type UserState = {
  name: string,
};

type actionArg = {
  commit: (string) => void,
};

export const state: UserState = {
  name: 'User',
};

export const mutations = {
  updateName: (state: UserState) => {
    state.name = "User-updated";
  },
};

export const actions = {
  updateName: (act: actionArg) => act.commit('updateName'),
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

`

exports[`__tests__/commands/create/store.js TAP STORE_CONTENT: src/store/modules/__tests__/user.spec.js > output 1`] = `
import {
  mutations,
  // actions,
  state
} from '../user';

/** Write your test cases here **/

describe('UserModule', () => {

  /* Test all mutations here */
  describe('mutation', () => {

    it('default name', () => {
      expect(state.name).toBe('User');
    });

    it('name after mutation', () => {
      mutations.updateName(state);
      expect(state.name).toBe('User-updated');
    });

  });

  /* Test all actions here */
  describe('actions', () => {
  });

});

`
