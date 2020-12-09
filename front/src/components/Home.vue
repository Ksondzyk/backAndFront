<template>
  <v-app>
    <v-container>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="mx-auto" max-width="400" v-for="(city, index) in cities" :key="index">
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title>{{ city.title }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">
              numberOfResidents:{{ city.numberOfResidents }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn color="orange" :to="'/cities/' + city.id">
                {{ $t('home.details') }}
              </v-btn>
            </v-card-actions>
          </v-card>
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
      cities: state => state.cities.cities,
      city: state => state.city.city,
    }),
  },
  methods: {
    ...mapActions(['getCities']),
  },

  async mounted() {
    try {
      await this.getCities();
    } catch (err) {
      throw new Error(`filed loadgin get Cities ${err}`);
    }
  },
};
</script>
