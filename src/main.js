import 'normalize.css';

import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = process.env.NODE_ENV === 'development';

Vue.filter('date', date => {
  if (!(date instanceof Date)) {
    console.error(`${date} is not an instane of Date`);
    return date;
  }

  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
});

const registerAll = (context, prefix = '') => context.keys().forEach(p => {
  let name = p.match(/\.\/(.*?)\.vue/)[1];
  Vue.component(prefix + name, context(p).default);
});

registerAll(require.context('@/elements', false, /.*\.vue/));
registerAll(require.context('@/layouts', false, /.*\.vue/));

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
