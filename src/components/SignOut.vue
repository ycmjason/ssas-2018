<template>
  <router-link to="/" @click.native="signOut">Sign out</router-link>
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
