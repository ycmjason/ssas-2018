<template>
  <router-link to="/" @click="signOut">Sign out</router-link>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: mapActions(['signOut']),
};
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>
