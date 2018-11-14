import Vue from 'vue';
import Router from 'vue-router';
import Landing from '@/views/Landing.vue';
import Dashboard from '@/views/Dashboard/index.vue';
import CreateGame from '@/views/CreateGame.vue';
import Game from '@/views/Game.vue';

import authGuard from './guards/authGuard';

Vue.use(Router);

const giphyfy = (component) => ({
  functional: true,
  render (h, { data, children }) {
    return h('GiphyBackgroundLayout', {}, [
      h(component, data, children),
    ]);
  },
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
      component: Game,
      props: true,
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
