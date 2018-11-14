<template>
  <a href="#" @click="signOut">Sign out</a>
</template>

<script>
export default {
  methods: {
    async signOut () {
      await this.$store.dispatch('signOut');
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>
