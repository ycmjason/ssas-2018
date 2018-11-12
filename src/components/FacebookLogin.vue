<template>
  <button v-if="!isLoggedIn" @click="signIn">
    Sign in with facebook
  </button>
  <button v-else @click="signOut">
    Sign out with facebook
  </button>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: mapGetters(['isLoggedIn']),
  methods: mapActions(['signIn', 'signOut']),
};
</script>

<style scoped>
button {
  background: rgb(59, 89, 152);
  color: white;
  padding: 0.8rem;
}
</style>
