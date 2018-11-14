import Vue from 'vue';
import Router from 'vue-router';
import Landing from '@/views/Landing.vue';
import Dashboard from '@/views/Dashboard/index.vue';
import CreateGame from '@/views/CreateGame.vue';

import authGuard from './guards/authGuard';

Vue.use(Router);

const giphyfy = (component) => ({
  render: h => h('GiphyBackgroundLayout', {}, [h(component)]),
});

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: authGuard,
    },
    {
      path: '/create',
      name: 'CreateGame',
      component: CreateGame,
      beforeEnter: authGuard,
    },
    {
      path: '/game/:id',
      name: 'Game',
      component: Landing,
      beforeEnter: authGuard,
    },
    {
      path: '*',
      redirect: '/',
    },
  ].map(route => ({
    ...route,
    component: route.component? giphyfy(route.component): route.component,
  })),
});

export default router;
