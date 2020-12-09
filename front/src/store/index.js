import Vue from 'vue';
import Vuex from 'vuex';
// import createPersistedState from 'vuex-persistedstate';
import cities from './modules/cities';
import city from './modules/city';
import user from './modules/user';
import error from './modules/error';
import addCity from './modules/addCity';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    cities,
    city,
    user,
    addCity,
    error,
  },
  // plugins: [createPersistedState()],
});
