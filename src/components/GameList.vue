<template>
  <div class="noGameFound" v-if="!games">Loading...</div>
  <div class="noGameFound" v-else-if="games.length <= 0">No games found.</div>
  <div v-else class="gameCards">
    <router-link
      v-for="{ id, title, description, creator, timestamps } in games"
      :key="id"
      :to="`/game/${id}`"
      tag="div"
      class="gameCard_wrapper"
    >
      <Card class="gameCard">
        <h3>{{ title }}</h3>
        <footer class="gameCard_footer">
          <ul>
            <li>created by: {{ creator.displayName }}</li>
            <li>created on: {{ timestamps.created | date }}</li>
          </ul>
        </footer>
      </Card>
    </router-link>
  </div>
</template>

<script>
import Card from '/elements/Card';

export default {
  components: { Card },
  props: {
    games: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="postcss" scoped>
.noGameFound {
  text-align: center;
  font-style: italic;
}

.gameCards {
  display: grid;
  justify-items: stretch;
  align-items: stretch;
  grid-row-gap: 1rem;
  grid-column-gap: 1rem;
  grid-template-columns: 1fr;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
}

.gameCard_wrapper {
}

.gameCard {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
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
