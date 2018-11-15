<template>
  <router-link v-bind="$attrs" v-on="$listeners" :to="link">
    <slot></slot>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isSignedIn']),
    link () {
      return this.isSignedIn ? '/dashboard' : '/';
    },
  },
};
</script>
