<template>
  <v-app>
    <v-container>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="mx-auto" max-width="400">
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
              <v-card-title>{{ city.title }}</v-card-title>
            </v-img>
            <v-card-subtitle class="pb-0"> location:{{ city.location }} </v-card-subtitle>
            <v-card-subtitle class="pb-0">
              numberOfResidents:{{ city.numberOfResidents }}
            </v-card-subtitle>
            <v-card-subtitle class="pb-0"> square:{{ city.square }} </v-card-subtitle>
            <v-card-subtitle class="pb-0">
              yearOfFoundation:{{ city.yearOfFoundation }}
            </v-card-subtitle>
            <v-card-actions>
              <v-btn color="orange" to="/cities">{{ $t('city.back') }} </v-btn>
              <v-card-actions v-if="user">
                <v-btn color="orange" :to="'/cities/update/' + this.$route.params.id">
                  {{ $t('city.update') }}
                </v-btn>
                <v-btn color="orange" @click="deleteCityNow(city._id)">
                  {{ $t('city.delete') }}
                </v-btn>
              </v-card-actions>
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
      city: state => state.city.city,
      user: state => state.user.user,
    }),
  },

  methods: {
    ...mapActions(['getCitiesById', 'deleteCity']),

    async deleteCityNow(id) {
      try {
        await this.deleteCity(id);
        if (this.city) {
          this.$router.push('/cities');
        }
      } catch (err) {
        throw new Error(`error delite city ${err} `);
      }
    },
  },
  async mounted() {
    try {
      await this.getCitiesById(this.$route.params.id);
    } catch (err) {
      throw new Error(`error getCitiesById ${err}`);
    }
  },
};
</script>
