<template>
  <button @click="signIn">
    Continue with Facebook
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
    async signIn() {
      if (await this.$store.dispatch('signInWithFacebook')) {
        this.$router.push(this.returnTo);
      }
    },
  },
};
</script>

<style scoped>
button {
  background: #4267b2;
  color: white;
  padding: 0.8rem;
  display: block;
  width: 100%;
}
</style>
