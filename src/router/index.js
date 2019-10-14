import Vue from 'vue';
import Router from 'vue-router';
import Landing from '/views/Landing.vue';
import GiphyBackgroundLayout from '/layouts/GiphyBackgroundLayout.vue';
import authGuard from '/router/guards/authGuard';

Vue.use(Router);

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
      component: () => import('/views/Dashboard/Dashboard.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/create',
      name: 'CreateGame',
      component: () => import('/views/CreateGame.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/game/:id',
      name: 'Game',
      component: () => import('/views/Game/Game.vue'),
      props: true,
      beforeEnter: authGuard,
    },
    {
      path: '/404',
      name: 'Not Found',
      props: true,
      component: () => import('/views/NotFound.vue'),
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
});

export default router;
