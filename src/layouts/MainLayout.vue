<template>
  <GiphyBackgroundLayout>
    <div class="container">
      <header>
        <HomeLink to="/" tag="h1" class="brand">
          <img src="@/assets/logo.svg" class="logo">
          <div class="siteName">
            <u>S</u>ecret <u>S</u>anta <u>A</u>llocation <u>S</u>ystem
          </div>
          <div class="siteName-short">
            SSAS
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

<style lang="scss" scoped>
.logo {
  height: 1.5em;
  margin-right: 1rem;
  display: block;
}

.brand {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: 0;

  &::after {
    content: 'BETA';
    font-size: 0.4em;
    display: block;
    align-self: flex-end;
    margin-left: 5px;
  }
}

.siteName {
  display: none;
  &-short {
    display: block;
  }

  @media (min-width: 900px) {
    display: block;
    &-short {
      display: none;
    }
  }
}

footer {
  padding-top: 1rem;
}

.container {
  max-width: 1000px;
  min-height: 100vh;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.98);
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 900px) {
    padding-left: 5rem;
    padding-right: 5rem;
  }
}

.welcome-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
