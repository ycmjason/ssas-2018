<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { getCurrentUser } from '@/firebase/auth';

export default {
  async created () {
    this.$store.commit('setUser', await getCurrentUser());
  },
};
</script>

<style>
html {
  font-size: 18px;
}

*, *::before, *::after {
  box-sizing: border-box;
}
</style>
