<template>
  <section class="yourGames">
    <header>
      <h2>Your Games</h2>
      <router-link :to="{ name: 'CreateGame' }" class="createNewGame" title="Create new game">
        <CircleCharacterIcon>+</CircleCharacterIcon>
      </router-link>
    </header>

    <GameList :games="myGames" />
  </section>
</template>

<script>
import { mapState } from 'vuex';

import GameList from '@/components/GameList.vue';

export default {
  computed: mapState(['user', 'myGames']),
  watch: {
    user () {
      this.$store.dispatch('fetchMyGames');
    },
  },
  components: {
    GameList,
  },
};
</script>

<style scoped>
header {
  display: flex;
  align-items: baseline;
}

.createNewGame {
  margin-left: 0.5rem;
}
</style>
