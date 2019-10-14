<template>
  <MainLayout>
    <YourGames />
  </MainLayout>
</template>

<script>
import YourGames from '/views/Dashboard/YourGames.vue';
import MainLayout from '/layouts/MainLayout.vue';

export default {
  name: 'dashboard',
  components: {
    YourGames,
    MainLayout,
  },
};
</script>

<style scoped></style>
