<template>
  <MainLayout>
    <div v-if="!game">
      <Back />
      Loading...
    </div>
    <div v-else>
      <header>
        <Back />
        <h2>
          {{ game.title }}
        </h2>
        <p>{{ game.description }}</p>
      </header>
      <main>
        <Card class="participants_card">
          <h3>Enrolled participants</h3>
          <ul>
            <li v-for="parti in game.participants" :key="parti.id">
              <a class="profile_link" target="_blank" :href="parti.link">
                <img :src="parti.photoURL">
                {{ parti.displayName }}
                <template v-if="parti.uid === game.creator.uid">(owner)</template>
              </a>
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
header {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  h2 {
    margin-left: 1rem;
  }

  p {
    flex-grow: 1;
    width: 100%;
    margin-top: 0;
  }
}
.participants_card {
  ul {
    padding-left: 0;
    margin-bottom: 0;
  }

  li {
    list-style: none;
    display: flex;
    align-items: center;

    .profile_link {
      display: inline-flex;
      align-items: center;
    }

    img {
      margin-right: 1rem;
    }
  }
}
</style>
