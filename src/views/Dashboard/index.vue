<template>
  <MainLayout v-if="user">
    <section class="welcome-banner">
      <p>Welcome back, {{ user.displayName }}!</p>
      <SignOut />
    </section>

    <YourGames />
  </MainLayout>
</template>

<script>
import { mapState } from 'vuex';

import MainLayout from '@/layouts/MainLayout.vue';
import SignOut from '@/components/SignOut.vue';
import YourGames from './YourGames.vue';

export default {
  name: 'dashboard',
  computed: mapState(['user']),
  components: {
    MainLayout,
    SignOut,
    YourGames,
  },
};
</script>

<style scoped>
.welcome-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
