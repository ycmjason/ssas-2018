import Vue from 'vue';
import Vuex from 'vuex';
import { signIn, signOut, getCurrentUser } from '../firebase/auth';
import {
  findGamesForUser,
  createGame,
  joinGame,
  setAllocation,
  findGameById,
} from '@/firebase/db/games';
import { uniqBy } from '@/utils/array';

Vue.use(Vuex);

const uniqById = xs => uniqBy(xs, ({ id }) => id);

export default new Vuex.Store({
  state: {
    user: null,
    games: null,
  },
  getters: {
    isSignedIn: ({ user }) => !!user,
    myGames: ({ user, games }) => games && games.filter(({ participants }) => {
      return participants.map(({ uid }) => uid).includes(user.uid);
    }),
  },
  mutations: {
    setUser: (state, user) => state.user = user,
    addGame: (state, game) => {
      state.games = uniqById([game, ...(state.games || [])]);
    },
    addGames: (state, games) => {
      state.games = uniqById([...games, ...(state.games || [])]);
    },
    clearGames: state => state.games = null,
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
        return commit('clearGames');
      }
      const games = await findGamesForUser(state.user);
      commit('addGames', games);
      return games;
    },

    async fetchGameById ({ state, commit }, id) {
      const game = await findGameById(id);
      commit('addGame', game);
      return game;
    },

    async getGameById ({ state, dispatch }, id) {
      if (state.games) {
        const found = state.games.find(game => game.id === id);
        if (found) return found;
      }

      return await dispatch('fetchGameById', id);
    },

    async createGame (context, { title, description }) {
      return await createGame({ title, description });
    },

    async joinGame (context, game) {
      await joinGame(game, await getCurrentUser());
    },

    async setAllocation (context, { game, allocation }) {
      await setAllocation(game, allocation);
    },
  },
});
