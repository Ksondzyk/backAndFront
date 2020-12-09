import axios from 'axios';

export default {
  state: {
    add: false,
  },
  actions: {
    async addCity({ commit }, newData) {
      const token = localStorage.getItem('accessToken');
      try {
        if (token) {
          const { data } = await axios.post('http://localhost:4000/addcity', newData, {
            headers: { authorization: `${token}` },
          });
          if (data.status === 200) {
            commit('ADD_CITY', data.user);
            return data;
          } else {
            return `Error`;
          }
        }
      } catch (err) {
        throw new Error(`Error Logout ${err}`);
      }
    },
  },
  mutations: {
    ADD_CITY(state, city) {
      state.add = city;
    },
  },
};
