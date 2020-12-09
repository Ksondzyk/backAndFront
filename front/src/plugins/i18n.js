import Vue from 'vue';
import VueI18n from 'vue-i18n';
import ru from '../languages/ru';
import en from '../languages/en';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'ru',
  messages: {
    en,
    ru,
  },
});
