<template>
  <div class="inputWrapper">
    <input class="input" type="text" :value="linkToGame" readonly ref="input">
    <button @click="copy">{{ copied ? copiedLine : copyLine }}</button>
  </div>
</template>

<script>
export default {
  props: ['game'],
  data: () => ({
    copied: false,
    copyLine: 'copy invite link',
    copiedLine: 'copied!',
    timeoutId: null,
  }),
  computed: {
    linkToGame () {
      const { protocol, host } = window.location;
      return `${protocol}//${host}/game/${this.game.id}`;
    },
  },
  methods: {
    copy () {
      clearTimeout(this.timeoutId);
      this.$refs.input.select();
      document.execCommand('copy');
      this.copied = true;
      this.timeoutId = setTimeout(() => this.copied = false, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.inputWrapper {
  display: flex;
}

.input {
  opacity: 0;
  position: absolute;
  z-index: -1;
}
</style>
