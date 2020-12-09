<template>
  <v-app>
    <v-card>
      <v-navigation-drawer app v-model="drawer" temporary>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-title>{{ $t('user') }}</v-list-item-title>

          <v-btn icon @click="drawer = !drawer">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>

          <v-btn @click="setLocale('en')"><flag iso="us"></flag></v-btn>
          <v-btn @click="setLocale('ru')"><flag iso="ru"></flag></v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="link in links" :key="link.title" :to="link.url">
            <v-list-item-content>
              <v-list-item-title v-text="link.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-app-bar app dark color="blue">
      <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"> </v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/cities" tag="span" class="pointer"></router-link>{{ $t('nameCity') }}
      </v-toolbar-title>

      <v-tabs class="hidden-sm-and-down">
        <v-spacer></v-spacer>

        <v-spacer align-center justify-center>
          <v-btn @click="setLocale('en')" dark color="blue"><flag iso="us"></flag></v-btn>
          <v-btn @click="setLocale('ru')" dark color="blue"><flag iso="ru"></flag></v-btn
        ></v-spacer>
        <v-tab v-for="link in links" :key="link.title" :to="link.url">{{ link.title }}</v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <template v-if="error">
      <v-snackbar
        :timeout="5000"
        :multi-line="true"
        :value="true"
        absolute
        bottom
        color="error"
        outlined
        left
        @input="closeError"
      >
        {{ error }}
        <v-btn dark text v-bind="attrs" @click="closeError">
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    ...mapState({
      login: state => state.user.user,
    }),
    links() {
      if (this.login) {
        return [
          { title: this.$t('cities.cities'), url: '/cities' },
          { title: this.$t('cities.addCity'), url: '/addcity' },
          { title: this.$t('cities.logout'), url: '/logout' },
        ];
      } else {
        return [
          { title: this.$t('cities.cities'), url: '/cities' },
          { title: this.$t('cities.login'), url: '/login' },
          { title: this.$t('cities.registration'), url: '/registration' },
        ];
      }
    },
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError');
    },
    ...mapActions(['isUserLoggeIn']),
    setLocale(locale) {
      this.$i18n.locale = locale;
    },
  },
  async mounted() {
    try {
      await this.isUserLoggeIn();
    } catch (err) {
      throw new Error(`Token is upsend ${err}`);
    }
  },
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
  width: 100%;
}
</style>
