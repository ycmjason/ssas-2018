<template>
  <section class="yourGames">
    <header>
      <h2>Your Games</h2>
      <router-link :to="{ name: 'CreateGame' }" class="createNewGame" title="Create new game">
        <CircleCharacterIcon>+</CircleCharacterIcon>
        Create new game
      </router-link>
    </header>

    <GameList :games="myGames" />
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

import GameList from '@/components/GameList.vue';

export default {
  computed: {
    ...mapState(['user']),
    ...mapGetters(['myGames']),
  },
  watch: {
    user: {
      handler () {
        this.$store.dispatch('fetchMyGames');
      },
      immediate: true,
    },
  },
  components: {
    GameList,
  },
};
</script>

<style scoped>
.createNewGame {
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: block;
}
</style>
