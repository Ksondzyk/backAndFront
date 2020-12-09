import store from '../store/index';

export default function(to, from, next) {
  if (store.state.user.user) {
    next();
  } else {
    next('/login?loginError=true');
  }
}
