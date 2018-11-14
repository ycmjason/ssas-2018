<template>
  <div class="noGameFound" v-if="games.length <= 0">No games found.</div>
  <section v-else class="gameCards">
    <div v-for="{ id, title, description, creator, created } in games" :key="id" class="gameCard">
      <h3>{{ title }}</h3>
      <p>
        {{ description }}
      </p>
      <footer>
        <div>
          created by: {{ creator.displayName }}
        </div>
        <div>
          created on: {{ created | date }}
        </div>
      </footer>
    </div>
  </section>
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
  max-width: 400px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--color-border);
  padding: 1rem;
}

.gameCard h3 {
  margin: 0;
}
</style>
