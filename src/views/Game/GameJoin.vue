<template>
  <Card>
    <div>
      <p>
        You have been invited to join this secret santa game. Do you wish to join?
      </p>

      <button @click="join" :disabled="joining">Join now</button>
    </div>
  </Card>
</template>

<script>
import Card from '/elements/Card.vue';
export default {
  components: { Card },
  props: ['game'],
  data: () => ({
    joining: false,
  }),
  methods: {
    async join() {
      if (!this.game) throw Error('No game is passed');
      this.joining = true;
      await this.$store.dispatch('joinGame', this.game);
      this.joining = false;
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
