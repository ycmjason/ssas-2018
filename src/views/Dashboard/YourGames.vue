<template>
  <section class="yourGames">
    <h2>Your Games</h2>
    <router-link :to="{ name: 'CreateGame' }">+</router-link>
    <div class="yourGames_GameList">
      <GameList :games="myGames" />
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

import GameList from '@/components/GameList.vue';
export default {

  name: 'dashboard',
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
.yourGames_GameList {
  border: 1px #efefef solid;
  padding: 1rem;
}
</style>
