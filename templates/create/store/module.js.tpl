/* @flow */
type ${name.pascal}State = {
  name: string,
};

type actionArg = {
  commit: (string) => void,
};

export const state: ${name.pascal}State = {
  name: '${name.pascal}',
};

export const mutations = {
  updateName: (state: ${name.pascal}State) => {
    state.name = "${name.pascal}-updated";
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
