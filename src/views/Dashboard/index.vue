<template>
  <div class="home">
    <section>
      Welcome back, {{ user.displayName }}!
    </section>

    <YourGame />
  </div>
</template>

<script>
import { mapState } from 'vuex';

import YourGame from './YourGame.vue';

export default {
  name: 'dashboard',
  computed: mapState(['user']),
  components: {
    YourGame,
  },
};
</script>

<style scoped>
</style>
