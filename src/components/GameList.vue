<template>
  <div class="noGameFound" v-if="games.length <= 0">No games found.</div>
  <div v-else class="gameCards">
    <Card class="gameCard">
      <div v-for="{ id, title, description, creator, timestamps } in games" :key="id" class="gameCard_content">
        <h3>{{ title }}</h3>
        <footer>
          <div>
            created by: {{ creator.displayName }}
          </div>
          <div>
            created on: {{ timestamps.created | date }}
          </div>
        </footer>
      </div>
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

.gameCard_content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 500px;
}

>>> .gameCard {
  cursor: pointer;
}
</style>
