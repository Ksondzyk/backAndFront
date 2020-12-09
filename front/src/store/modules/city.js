import axios from 'axios';
const token = localStorage.getItem('accessToken');
export default {
  state: {
    city: {},
  },
  actions: {
    async getCitiesById({ commit }, id) {
      try {
        const { data } = await axios.get(`http://localhost:4000/cities/${id}`);
        commit('GET_CITY_ID', data);
        return data;
      } catch (e) {
        throw new Error(`error get city by ID : ${e}`);
      }
    },
    async deleteCity({ commit }, id) {
      try {
        if (token) {
          const { data } = await axios.delete(`http://localhost:4000/cities/${id}`, {
            headers: { authorization: `${token}` },
          });
          if (data.status === 2000) {
            commit('DELETE_CITY', data.city);
            return data;
          }
        }
      } catch (err) {
        throw new Error(`error delete city ${err}`);
      }
    },
    async updateCity({ commit }, objData) {
      const { id, data } = objData;
      try {
        if (token) {
          const responce = await axios.put(`http://localhost:4000/cities/${id}`, data, {
            headers: { authorization: `${token}` },
          });
          if (responce.data.status === 200) {
            commit('UPDATE_CITY', responce.data.city);
            return responce;
          } else {
            throw new Error(`Err update city`);
          }
        }
      } catch (err) {
        throw new Error('Error update city');
      }
    },
  },
  mutations: {
    GET_CITY_ID(state, city) {
      state.city = city;
    },
    DELETE_CITY(state, deleteCity) {
      state.city = deleteCity;
    },
    UPDATE_CITY(state, payload) {
      state.city = payload;
    },
  },
};
