<template>
  <GiphyBackgroundLayout>
    <div class="container">
      <header>
        <HomeLink to="/" tag="h1" class="siteName">
          <img src="@/assets/logo.svg" class="logo">
          <div>
            <u>S</u>ecret <u>S</u>anta <u>A</u>llocation <u>S</u>ystem
          </div>
        </HomeLink>
      </header>

      <main>
        <header class="welcome-banner" v-if="user">
          <p>Welcome back, {{ user.displayName }}!</p>
          <SignOut />
        </header>
        <slot></slot>
      </main>

      <footer>
        &copy; Jason Yu 2018
      </footer>
    </div>
  </GiphyBackgroundLayout>
</template>

<script>
import { mapState } from 'vuex';

import GiphyBackgroundLayout from './GiphyBackgroundLayout.vue';
import SignOut from '@/components/SignOut';

export default {
  components: { GiphyBackgroundLayout, SignOut },
  computed: mapState(['user']),
};
</script>

<style scoped>
.logo {
  height: 1.5em;
  margin-right: 1rem;
}

.siteName {
  display: flex;
  align-items: center;
  cursor: pointer;
}

footer {
  padding-top: 1rem;
}

.container {
  max-width: 1000px;
  min-height: 100vh;
  padding: 1px 5rem;
  margin-left: auto;
  margin-right: auto;
  background: rgba(255, 255, 255, 0.98);
}

.welcome-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
