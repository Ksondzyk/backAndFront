import Vue from 'vue';
import VueRouter from 'vue-router';
import AuthGuard from './auth-guard';

Vue.use(VueRouter);

const routes = [
  {
    path: '/cities',
    name: 'Home',
    props: true,
    component: () => import('../components/Home.vue'),
  },
  {
    path: '/cities/:id',
    name: 'City',
    component: () => import('../components/Cities/City.vue'),
  },
  {
    path: '/cities/update/:id',
    name: 'UpdateCity',
    component: () => import('../components/Cities/UpdateCity.vue'),
    beforeEnter: AuthGuard,
  },

  {
    path: '/addcity',
    name: 'AddCity',
    component: () => import('../components/Cities/AddCity.vue'),
    beforeEnter: AuthGuard,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Auth/Login.vue'),
  },

  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../components/Auth/Registration.vue'),
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../components/Auth/Logout.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => import('../components/Cities/Page404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
