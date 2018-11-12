<template>
  <button @click="signIn">
    Continue with facebook
  </button>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: mapActions(['signIn']),
};
</script>

<style scoped>
button {
  background: #4267B2;
  color: white;
  padding: 0.8rem;
  display: block;
  width: 100%;
}
</style>
