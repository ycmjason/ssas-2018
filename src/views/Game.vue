<template>
  <MainLayout>
    <div v-if="!game">
      <Back />
      Loading...
    </div>
    <div v-else>
      <header>
        <h2>
          <Back />
          {{ game.title }}
        </h2>
        <p>{{ game.description }}</p>
      </header>
      <main>
        <Card class="participants_card">
          <h3>Enrolled participants</h3>
          <ul>
            <li v-for="parti in game.participants" :key="parti.id">
              <img :src="parti.photoURL">
              {{ parti.displayName }}
              <template v-if="parti.uid === game.creator.uid">(owner)</template>
            </li>
          </ul>
        </Card>
      </main>
    </div>
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
    game: null,
  }),
};
</script>

<style lang="scss" scoped>
.participants_card {
  ul {
    padding-left: 0;
  }

  li {
    list-style: none;
    display: flex;
    align-items: center;
    img {
      margin-right: 1rem;
    }
  }
}
</style>
