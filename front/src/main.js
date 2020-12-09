import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import { i18n } from './plugins/i18n';
import FlagIcon from 'vue-flag-icon';

Vue.use(Vuetify);
Vue.use(FlagIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app');
