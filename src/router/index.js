import Vue from 'vue';
import Router from 'vue-router';
import Landing from '@/views/Landing.vue';
import Dashboard from '@/views/Dashboard/Dashboard.vue';
import CreateGame from '@/views/CreateGame.vue';
import Game from '@/views/Game/Game.vue';
import NotFound from '@/views/NotFound';

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
      name: 'Landing',
      component: Landing,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
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
      path: '/404',
      name: 'Not Found',
      props: true,
      component: NotFound,
    },
    {
      path: '*',
      redirect: '/404',
    },
  ].map(route => ({
    ...route,
    component: route.component? giphyfy(route.component): route.component,
  })),
});

export default router;
