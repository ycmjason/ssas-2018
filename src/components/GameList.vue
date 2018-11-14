<template>
  <div class="noGameFound" v-if="games.length <= 0">No games found.</div>
  <table v-else>
    <tr>
      <th>Title</th>
      <th>Created By</th>
      <th>Creation Date</th>
    </tr>
    <tr v-for="{ id, title, creator_uid, created } in games" :key="id">
      <td>{{ title }}</td>
      <td>{{ creator_uid }}</td>
      <td>{{ created | date }}</td>
    </tr>
  </table>
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

table {
  width: 100%;
}
</style>
