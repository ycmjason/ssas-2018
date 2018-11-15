<template>
  <MainLayout>
    <YourGames />
  </MainLayout>
</template>

<script>

import YourGames from './YourGames.vue';

export default {
  name: 'dashboard',
  components: {
    YourGames,
  },
};
</script>

<style scoped>
</style>
