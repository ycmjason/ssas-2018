import Vue from 'vue';
import Vuex from 'vuex';
import { signIn, signOut, transformUser } from '../firebase/auth';
import { getGamesForUser } from '@/firebase/db/games';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    myGames: [],
  },
  getters: {
    isSignedIn: ({ user }) => !!user,
  },
  mutations: {
    setUser: (state, user) => state.user = user,
    setMyGames: (state, games) => state.games = games,
  },
  actions: {
    async signIn ({ commit }) {
      const { user } = await signIn();
      commit('setUser', transformUser(user));
      return !!user;
    },

    async signOut ({ commit }) {
      await signOut();
      commit('setUser', null);
    },

    async fetchMyGames ({ state, getters, commit }) {
      if (!getters.isSignedIn) {
        return commit('setMyGames', []);
      }
      await getGamesForUser(state.user.uid);
    },
  },
});
