import axios from 'axios';
export default {
  state: {
    cities: [],
  },
  actions: {
    async getCities({ commit }) {
      try {
        const { data } = await axios.get('http://localhost:4000/cities');
        commit('SET_CITIES', data);
        return data;
      } catch (err) {
        throw new Error(`error in actions cities: ${err}`);
      }
    },
  },
  mutations: {
    SET_CITIES(state, cities) {
      state.cities = cities;
    },
  },
};
