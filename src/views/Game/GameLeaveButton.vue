<template>
  <button @click="leave" :disabled="leaving" class="btnDanger">leave the game</button>
</template>

<script>
export default {
  props: ['game'],
  data: () => ({
    leaving: false,
  }),
  methods: {
    async leave() {
      if (!this.game) throw Error('No game is passed');
      this.leaving = true;
      await this.$store.dispatch('leaveGame', this.game);
      this.leaving = false;
    },
  },
};
</script>

<style lang="postcss" scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
