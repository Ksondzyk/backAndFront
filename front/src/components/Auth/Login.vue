<template>
  <v-app>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <form color="blue" @submit.prevent="loginIsOk()">
            <v-text-field
              v-model="email"
              :error-messages="emailErrors"
              :label="$t('login.email')"
              required
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            ></v-text-field>
            <v-text-field
              v-model="password"
              :error-messages="nameErrors"
              :label="$t('login.password')"
              required
              @input="$v.password.$touch()"
              @blur="$v.password.$touch()"
            ></v-text-field>
            <v-btn class="mr-4" type="sumbit">
              {{ $t('login.Login') }}
            </v-btn>
            <v-btn @click="clear">
              {{ $t('login.clear') }}
            </v-btn>
          </form>
        </v-flex>
      </v-layout>
      <template v-if="created">
        <v-snackbar
          :timeout="3000"
          :multi-line="true"
          :value="true"
          absolute
          top
          color="error"
          outlined
          center
        >
          {{ errorLog }}
        </v-snackbar>
      </template>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, maxLength, email } from 'vuelidate/lib/validators';
import User from '../../models/user.js';
export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, maxLength: maxLength(10) },
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength && errors.push('Name must be at most 10 characters long');
      !this.$v.password.required && errors.push('Password is required.');
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
      errorLog: state => state.error.error,
      user: state => state.user.user,
    }),
  },
  methods: {
    submit() {
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.email = '';
      this.password = '';
    },
    ...mapActions(['loginUser', 'errorMethod', 'errorClean']),
    async loginIsOk() {
      try {
        const getData = new User(this.email, this.password);
        const responce = await this.loginUser(getData);
        if (responce) {
          this.$router.push('/cities');
        }
      } catch (err) {
        throw new Error(`Login is Error ${err}`);
      }
    },
    created() {
      if (this.$route.query.loginError) {
        this.errorMethod('Please login in to access this page');
      }
      if (this.$route.query) {
        this.errorClean('');
      }
    },
  },
};
</script>
