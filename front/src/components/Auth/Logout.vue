<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <div class="text-center">
            <v-btn rounded color="primary" dark @click="LogoutIsOk()">
              {{ $t('logout.text') }}
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      user: state => state.user.user,
    }),
  },
  methods: {
    ...mapActions(['logout']),
    async LogoutIsOk() {
      try {
        const responce = await this.logout(false);
        if (responce) {
          this.$router.push('/login');
        }
      } catch (err) {
        throw new Error(`Logout ${err}`);
      }
    },
  },
};
</script>
