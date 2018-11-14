<template>
  <section class="yourGames">
    <h2>Your Games</h2>
    <router-link :to="{ name: 'CreateGame' }">+</router-link>
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
</style>
