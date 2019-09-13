import Vue from 'vue';
import Vuex from 'vuex';
import { signInWithFacebook, signInWithGoogle, signOut, getCurrentUser } from '../firebase/auth';
import {
  findGamesForUser,
  createGame,
  joinGame,
  leaveGame,
  setAllocation,
  findGameById,
} from '@/firebase/db/games';
import { uniqBy } from '@/utils/array';

Vue.use(Vuex);

const uniqById = xs => uniqBy(xs, ({ id }) => id);

const store = new Vuex.Store({
  state: {
    user: null,
    games: null,
    currentGameId: null,
  },
  getters: {
    isSignedIn: ({ user }) => !!user,
    myGames: ({ user, games }) =>
      games &&
      games.filter(({ participants }) => {
        return participants.map(({ uid }) => uid).includes(user.uid);
      }),
    currentGame: ({ games, currentGameId }) => {
      if (!games) return null;
      return games.find(({ id }) => currentGameId === id);
    },
  },
  mutations: {
    setUser: (state, user) => (state.user = user),
    setCurrentGameId: (state, id) => (state.currentGameId = id),
    addGame: (state, game) => {
      state.games = uniqById([game, ...(state.games || [])]);
    },
    addGames: (state, games) => {
      state.games = uniqById([...games, ...(state.games || [])]);
    },
    clearGames: state => (state.games = null),
  },
  actions: {
    async signInWithGoogle({ commit }) {
      const user = await signInWithGoogle();
      commit('setUser', user);
      return user;
    },

    async signInWithFacebook({ commit }) {
      const user = await signInWithFacebook();
      commit('setUser', user);
      return user;
    },

    async signOut({ commit }) {
      await signOut();
      commit('setUser', null);
    },

    async fetchMyGames({ state, getters, commit }) {
      if (!getters.isSignedIn) {
        return commit('clearGames');
      }
      const games = await findGamesForUser(state.user);
      commit('addGames', games);
      return games;
    },

    async fetchGameById({ state, commit }, id) {
      const game = await findGameById(id);
      commit('addGame', game);
      if (state.currentGameId && state.currentGameId === id) {
        commit('setCurrentGameId', id);
      }
      return game;
    },

    async setCurrentGameId({ dispatch, commit }, id) {
      await dispatch('getGameById', id);
      commit('setCurrentGameId', id);
    },

    async getGameById({ state, dispatch }, id) {
      if (state.games) {
        const found = state.games.find(game => game.id === id);
        if (found) return found;
      }

      return await dispatch('fetchGameById', id);
    },

    async createGame(context, { title, description }) {
      return await createGame({ title, description });
    },

    async joinGame({ dispatch }, game) {
      await joinGame(game, await getCurrentUser());
      await dispatch('fetchGameById', game.id);
    },

    async setAllocation({ dispatch }, { game, allocation }) {
      await setAllocation(game, allocation);
      await dispatch('fetchGameById', game.id);
    },

    async leaveGame({ dispatch }, game) {
      await leaveGame(game, await getCurrentUser());
      await dispatch('fetchGameById', game.id);
    },
  },
});

store.watch(
  ({ user }) => user,
  user => {
    if (user && !user.uid) {
      store.dispatch('signOut');
    }
  },
);

export default store;
