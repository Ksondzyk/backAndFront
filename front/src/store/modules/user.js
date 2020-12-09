import axios from 'axios';

export default {
  state: {
    user: false,
  },
  actions: {
    async registerUser({ commit }, RegisterData) {
      try {
        const { data } = await axios.post(`http://localhost:4000/registration`, RegisterData);
        commit('REGISTRATION', data);
        return data;
      } catch (e) {
        throw new Error(`error in registration: ${e}`);
      }
    },
    async loginUser({ commit }, { email, password }) {
      try {
        const { data } = await axios.post(`http://localhost:4000/login`, { email, password });
        if (data.status === 200) {
          commit('LOGIN', data.user);
          localStorage.setItem('accessToken', data.accessToken);
          return data;
        } else {
          commit('LOGIN', false);
        }
      } catch (e) {
        throw new Error(`error Login: ${e}`);
      }
    },
    async isUserLoggeIn({ commit }) {
      try {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const responce = await axios.post(
            'http://localhost:4000/auth',
            {},
            {
              headers: { authorization: `${token}` },
            },
          );
          if (responce.data.status === 200) {
            commit('IS_USER_LOGGED_IN', responce.data.user);
            return responce;
          }
        }
      } catch (err) {
        localStorage.removeItem('accessToken');
        throw new Error(`error login tocken ${err}`);
      }
    },
    async logout({ commit }, data) {
      commit('LOGOUT', data);
      window.localStorage.clear();
    },
  },
  mutations: {
    REGISTRATION(state, payload) {
      state.user = payload;
    },
    LOGIN(state, payload) {
      state.user = payload;
    },
    IS_USER_LOGGED_IN(state, payload) {
      state.user = payload;
    },
    LOGOUT(state, payload) {
      state.user = payload;
    },
  },
};
