const tap = require('tap');
const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

const test = tap.test;
const zcui = `node ${path.resolve(__dirname, '../../../index.js')} create store`;
const testProjPath = path.resolve(__dirname, '../../../temp/test-proj');

/*
 * hello-world was project created
 * in new command testing
 */
shell.cd(path.join(testProjPath, 'hello-world'));

test("CREATE_STORE: Shows help on --help", t => {
  const command = `${zcui} --help`;
  shell.exec(command, {silent:true}, (code, stdout) => {
    if(code === 1) t.fail();
    t.equal(stdout.trim(), `index.js create store <name>

create new store

Options:
  -v, --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Examples:
  index.js create store User
    `.trim());
    t.end();
  });
});

test("CREATE_STORE: success", t => {
  const command = `${zcui} user`;

  /**
   * Cleanup user store
   */
  shell.rm('-rf', 'src/store', {silent: true});

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 1) t.fail(stderr);
    t.equal(stdout.trim(), `✔ user Store module created`.trim());
    t.end();
  });
});

test("CREATE_STORE: has store module files", t => {

  /**
   * Don not remove user store
   * user store created in previous test
   */
  t.ok(shell.test('-f', 'src/store/modules/user.js'));
  t.ok(shell.test('-f', 'src/store/modules/__tests__/user.spec.js'));
  t.end();
});

test("CREATE_STORE: error on duplicate", t => {
  const command = `${zcui} user`;

  /**
   * Don not remove user store
   * user store created in previous test
   */

  shell.exec(command, {silent:true}, (code, stdout, stderr) => {
    if(code === 0) t.fail(stderr);
    t.equal(stdout.trim(), '✖ user store already exits! Please choose some another name!!!');
    t.end();
  });
});

test("STORE_CONTENT: store.js", t => {
  t.equal(fs.readFileSync('src/store/modules/user.js', 'utf-8').trim(), `
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
  `.trim());
  t.end();
});

test("STORE_CONTENT: __tests__/module.spec.js", t => {
  t.equal(fs.readFileSync('src/store/modules/__tests__/user.spec.js', 'utf-8').trim(), `
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
  `.trim());
  t.end();
});
