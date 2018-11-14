<template>
  <div @click="back">
    <CircleCharacterIcon>&lt;</CircleCharacterIcon>
  </div>
</template>

<script>
export default {
  props: ['to'],
  methods: {
    back () {
      this.$router.go(this.to || -1);
    },
  },
};
</script>

<style scoped>
div {
  cursor: pointer;
  display: inline;
}
</style>
