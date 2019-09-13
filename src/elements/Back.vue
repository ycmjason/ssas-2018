<template>
  <div @click="back">
    <CircleCharacterIcon class="backIcon">&lt;</CircleCharacterIcon> {{ label }}
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
    },
    label: {
      type: String,
      default: 'Back',
    },
  },
  methods: {
    back() {
      if (!this.to) this.$router.go(-1);
      this.$router.push(this.to);
    },
  },
};
</script>

<style scoped>
.backIcon.backIcon {
  margin-right: 3px;
}

div {
  cursor: pointer;
  display: inline;
  color: var(--color-link);
}
</style>
