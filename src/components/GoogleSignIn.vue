<template>
  <button @click="signIn">
    Sign in with Google
  </button>
</template>

<script>
export default {
  props: {
    returnTo: {
      default: '/dashboard',
    },
  },
  methods: {
    async signIn () {
      if (await this.$store.dispatch('signInWithGoogle')) {
        this.$router.push(this.returnTo);
      }
    },
  },
};
</script>

<style scoped>
button {
  background: #4285F4;
  color: #ffffff;
  padding: 0.8rem;
  display: block;
  width: 100%;
}
</style>
