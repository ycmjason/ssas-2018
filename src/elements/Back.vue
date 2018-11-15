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
      if (!this.to) this.$router.go(-1);
      this.$router.push(this.to);
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
