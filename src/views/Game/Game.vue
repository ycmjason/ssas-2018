<template>
  <MainLayout>
    <div v-if="!game">Loading...</div>
    <main v-else>
      <header>
        <Back to="/dashboard" />
        <h2>
          {{ game.title }}
        </h2>
        <p>{{ game.description }}</p>
      </header>

      <GameDetails :game="game" v-if="isParticipant" />
      <GameEnded :game="game" v-else-if="game.allocation" />
      <GameJoin :game="game" v-else />
    </main>
  </MainLayout>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import GameDetails from './GameDetails.vue';
import GameEnded from './GameEnded.vue';
import GameJoin from './GameJoin.vue';

export default {
  components: {
    GameDetails,
    GameEnded,
    GameJoin,
  },

  async created () {
    await this.setCurrentGameId(this.id);
    if (!this.game) this.$router.replace('/404');
  },

  props: ['id'],

  methods: {
    ...mapActions(['setCurrentGameId']),
  },

  computed: {
    isParticipant () {
      if (!this.game) return false;
      return this.game.participants.map(({ uid }) => uid).includes(this.user.uid);
    },
    ...mapState(['user']),
    ...mapGetters({
      game: 'currentGame',
    }),
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
