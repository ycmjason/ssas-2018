import Vue from 'vue';
import Vuex from 'vuex';
import { signIn, signOut, transformUser } from '../firebase/auth';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  getters: {
    isLoggedIn: ({ user }) => !!user,
  },
  mutations: {
    setUser: (state, user) => state.user = user,
  },
  actions: {
    async signIn ({ commit }) {
      const { user } = await signIn();
      commit('setUser', transformUser(user));
    },
    async signOut ({ commit }) {
      await signOut();
      commit('setUser', null);
    },
  },
});
