import 'regenerator-runtime/runtime';
import Vue from 'vue';
import App from '/App.vue';
import store from '/store';
import router from '/router';
import CompositionApi from '@vue/composition-api';

Vue.config.productionTip = process.env.NODE_ENV === 'development';

Vue.use(CompositionApi);

Vue.filter('date', date => {
  if (!(date instanceof Date)) {
    new Error(`${date} is not an instane of Date`);
    return date;
  }

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
