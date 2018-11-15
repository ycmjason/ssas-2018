import Vue from 'vue';
import Vuex from 'vuex';
import { signIn, signOut, getCurrentUser } from '../firebase/auth';
import { findGamesForUser, createGame, joinGame } from '@/firebase/db/games';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    myGames: null,
  },
  getters: {
    isSignedIn: ({ user }) => !!user,
  },
  mutations: {
    setUser: (state, user) => state.user = user,
    setMyGames: (state, games) => state.myGames = games,
  },
  actions: {
    async signIn ({ commit }) {
      const user = await signIn();
      commit('setUser', user);
      return user;
    },

    async signOut ({ commit }) {
      await signOut();
      commit('setUser', null);
    },

    async fetchMyGames ({ state, getters, commit }) {
      if (!getters.isSignedIn) {
        return commit('setMyGames', null);
      }
      const games = await findGamesForUser(state.user);
      commit('setMyGames', games);
      return games;
    },

    async createGame (context, { title, description }) {
      return await createGame({ title, description });
    },

    async joinGame (context, game) {
      await joinGame(game, await getCurrentUser());
    },
  },
});
