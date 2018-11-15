<template>
  <MainLayout>
    <div v-if="!game"><Back /> Loading...</div>
    <main v-else>
      <header>
        <Back />
        <h2>
          {{ game.title }}
        </h2>
        <p>{{ game.description }}</p>
      </header>

      <GameDetails :game="game" v-if="isParticipant" />
      <GameJoin :game="game" @join="fetchGame" v-else />
    </main>
  </MainLayout>
</template>

<script>
import { mapState } from 'vuex';
import { findGameById } from '@/firebase/db/games';
import GameDetails from './GameDetails.vue';
import GameJoin from './GameJoin.vue';

export default {
  components: {
    GameDetails,
    GameJoin,
  },

  async created () {
    await this.fetchGame();
    if (!this.game) this.$router.replace('/404');
  },

  props: ['id'],

  data: () => ({
    game: null,
  }),

  methods: {
    async fetchGame () {
      this.game = await findGameById(this.id);
    },
  },

  computed: {
    isParticipant () {
      if (!this.game) return false;
      return this.game.participants.map(({ uid }) => uid).includes(this.user.uid);
    },
    ...mapState(['user']),
  },
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
</style>
