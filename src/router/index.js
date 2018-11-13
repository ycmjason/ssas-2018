import Vue from 'vue';
import Router from 'vue-router';
import Landing from '@/views/Landing.vue';
import Dashboard from '@/views/Dashboard/index.vue';
import createGame from '@/views/createGame.vue';

import authGuard from './guards/authGuard';

Vue.use(Router);

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
      name: 'createGame',
      component: createGame,
      beforeEnter: authGuard,
    },
  ],
});

export default router;
