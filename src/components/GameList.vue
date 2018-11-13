<template>
  <div class="noGameFound" v-if="games.length <= 0">No games found.</div>
  <ul v-else>
    <li v-for="game in games"
        :key="game.id">game.title</li>
  </ul>
</template>

<script>
export default {
  props: {
    games: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.noGameFound {
  text-align: center;
  font-style: italic;
}
</style>
