import 'normalize.css';

import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

Vue.filter('date', date => {
  if (!(date instanceof Date)) {
    console.error(`${date} is not an instane of Date`);
    return date;
  }

  return `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
