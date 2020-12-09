<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <form @submit.prevent="addNewCity()">
            <v-text-field
              v-model="title"
              :error-messages="titleErrors"
              :label="$t('addCity.title')"
              required
              @input="$v.title.$touch()"
              @blur="$v.title.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="location"
              :error-messages="locationErrors"
              :label="$t('addCity.location')"
              required
              @input="$v.location.$touch()"
              @blur="$v.location.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="numberOfResidents"
              :error-messages="numberOfResidentsErrors"
              :counter="10"
              :label="$t('addCity.numberOfResidents')"
              required
              @input="$v.numberOfResidents.$touch()"
              @blur="$v.numberOfResidents.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="square"
              :error-messages="squareErrors"
              :counter="10"
              :label="$t('addCity.square')"
              required
              @input="$v.square.$touch()"
              @blur="$v.square.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="yearOfFoundation"
              :error-messages="yearOfFoundationErrors"
              :counter="10"
              :label="$t('addCity.yearOfFoundation')"
              required
              @input="$v.yearOfFoundation.$touch()"
              @blur="$v.yearOfFoundation.$touch()"
            ></v-text-field>

            <v-btn class="mr-4" type="sumbit">
              {{ $t('addCity.addCity') }}
            </v-btn>
            <v-btn @click="clear">
              {{ $t('addCity.clear') }}
            </v-btn>
          </form>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
import City from '../../models/city.js';

export default {
  mixins: [validationMixin],
  validations: {
    title: { required, maxLength: maxLength(10) },
    location: { required },
    numberOfResidents: { required, maxLength: maxLength(10) },
    square: { required, maxLength: maxLength(10) },
    yearOfFoundation: { required, maxLength: maxLength(4) },
  },
  data() {
    return {
      title: '',
      location: '',
      numberOfResidents: '',
      square: '',
      yearOfFoundation: '',
    };
  },
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push('Item is required');
      return errors;
    },
    locationErrors() {
      const errors = [];
      if (!this.$v.location.$dirty) return errors;
      !this.$v.location.required && errors.push('Location is required.');
      return errors;
    },
    numberOfResidentsErrors() {
      const errors = [];
      if (!this.$v.numberOfResidents.$dirty) return errors;
      !this.$v.numberOfResidents.maxLength &&
        errors.push('numberOfResidentsErrors must be at most 10 characters long');
      !this.$v.numberOfResidents.required && errors.push('numberOfResidentsErrors is required');
      return errors;
    },
    squareErrors() {
      const errors = [];
      if (!this.$v.square.$dirty) return errors;
      !this.$v.square.maxLength && errors.push('Square must be at most 10 characters long');
      !this.$v.square.required && errors.push('Square is required');
      return errors;
    },
    yearOfFoundationErrors() {
      const errors = [];
      if (!this.$v.yearOfFoundation.$dirty) return errors;
      !this.$v.yearOfFoundation.maxLength &&
        errors.push('yearOfFoundation must be at most 10 characters long');
      !this.$v.yearOfFoundation.required && errors.push('yearOfFoundation is required');
      return errors;
    },
    ...mapState({
      add: state => state.addCity.add,
    }),
  },
  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.title = '';
      this.location = '';
      this.numberOfResidents = '';
      this.square = '';
      this.yearOfFoundation = '';
    },
    ...mapActions(['addCity']),

    async addNewCity() {
      try {
        const data = new City(
          this.title,
          this.location,
          this.numberOfResidents,
          this.square,
          this.yearOfFoundation,
        );
        const result = await this.addCity(data);

        if (result) {
          this.$router.push('/cities');
        }
      } catch (err) {
        throw new Error(` error add city ${err}`);
      }
    },
  },
};
</script>
