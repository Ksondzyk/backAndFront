<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <form @submit.prevent="registrationOk()">
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              :label="$t('registration.email')"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="name"
              :error-messages="nameErrors"
              :counter="10"
              :label="$t('registration.name')"
              required
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :error-messages="nameErrors"
              :label="$t('registration.password')"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>

            <v-text-field
              v-model="birthday"
              :error-messages="nameErrors"
              :counter="10"
              :label="$t('registration.birthday')"
              required
              @input="$v.birthday.$touch()"
              @blur="$v.birthday.$touch()"
            ></v-text-field>

            <v-btn class="mr-4" type="sumbit">
              {{ $t('registration.createAcount') }}
            </v-btn>
            <v-btn @click="clear">
              {{ $t('registration.clear') }}
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
import { required, maxLength, email } from 'vuelidate/lib/validators';
import User from '../../models/city.js';
export default {
  mixins: [validationMixin],
  validations: {
    name: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required },
    birthday: { required, maxLength: maxLength(10) },
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      birthday: '',
    };
  },
  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.birthday.$dirty) return errors;
      !this.$v.birthday.checked && errors.push('You must agree to continue!');
      return errors;
    },
    selectErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Item is required');
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long');
      !this.$v.name.required && errors.push('Name is required.');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Must be valid e-mail');
      !this.$v.email.required && errors.push('E-mail is required');
      return errors;
    },
    ...mapState({
      user: state => state.user.user,
    }),
  },
  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = '';
      this.email = '';
      this.password = '';
      this.birthday = '';
    },
    ...mapActions(['registerUser']),
    async registrationOk() {
      try {
        const data = new User(this.email, this.password, this.name, this.birthday);
        const responce = await this.registerUser(data);

        if (responce) {
          this.$router.push('/cities');
        }
      } catch (err) {
        throw new Error(`register failed ${err}`);
      }
    },
  },
};
</script>
