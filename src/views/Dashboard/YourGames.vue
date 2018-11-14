<template>
  <section class="yourGames">
    <header>
      <h2>Your Games</h2>
      <router-link :to="{ name: 'CreateGame' }" class="newGameLink" title="Create new game">+</router-link>
    </header>

    <GameList :games="myGames" />
  </section>
</template>

<script>
import { mapState } from 'vuex';

import GameList from '@/components/GameList.vue';

export default {
  created () {
    this.$store.dispatch('fetchMyGames');
  },
  computed: mapState(['user', 'myGames']),
  components: {
    GameList,
  },
};
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
}

.newGameLink {
  text-decoration: none;
  font-size: 1.3rem;
  display: block;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  color: var(--color-border);
  border: 1px solid var(--color-border);
  box-sizing: content-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
}
</style>
