<template>
  <MainLayout>
    <header>
      <h2>{{ game.title }}</h2>
      <p>{{ game.description }}</p>
    </header>
    <main>
      <h3>Enrolled participants</h3>
      <ul>
        <li v-for="parti in game.participants" :key="parti.id">
          {{ parti.displayName }}
          <template v-if="parti.uid === game.creator.uid">(owner)</template>
        </li>
      </ul>
    </main>
  </MainLayout>
</template>

<script>
import { findGameById } from '@/firebase/db/games';
export default {
  async created () {
    this.game = await findGameById(this.id);
    if (!this.game) this.$router.replace('/404');
  },
  props: ['id'],
  data: () => ({
    game: {},
  }),
};
</script>

<style>

</style>
