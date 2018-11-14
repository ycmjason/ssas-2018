<template>
  <div class="noGameFound" v-if="games.length <= 0">No games found.</div>
  <div v-else class="gameCards">
    <Card v-for="{ id, title, description, creator, timestamps } in games" :key="id" class="gameCard">
      <h3>{{ title }}</h3>
      <footer class="gameCard_footer">
        <ul>
          <li>created by: {{ creator.displayName }}</li>
          <li>created on: {{ timestamps.created | date }}</li>
        </ul>
      </footer>
    </Card>
  </div>
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

.gameCards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.gameCard {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  margin-left: 1rem;
}

.gameCard:first-child {
  margin-left: 0;
}

.gameCard h3 {
  margin-top: 0;
}

.gameCard_footer ul {
  font-size: 0.8rem;
  padding: 0;
  margin: 0;
}

.gameCard_footer li {
  list-style: none;
}
</style>
