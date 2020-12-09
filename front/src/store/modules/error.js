export default {
  state: {
    error: '',
  },
  actions: {
    errorMethod({ commit }, newError) {
      if (newError) {
        commit('ERROR', newError);
      }
    },
    errorClean({ commit }, newError) {
      if (newError) {
        commit('ERROR', newError);
      }
    },
  },
  mutations: {
    ERROR(state, payload) {
      state.error = payload;
    },
  },
};
