<template>
  <div id="app">
    <header>
      <h1>
        Secret Santa Allocation System
        <small>SSAS</small>
      </h1>
    </header>

    <main>
      <router-view/>
    </main>

    <footer>
      &copy; Jason Yu 2018
    </footer>
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

<style scoped>
header {
  margin-bottom: 1rem;
}

footer {
  padding-top: 1rem;
}
</style>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lora|Open+Sans');

html {
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Lora', serif;

  small {
    display: block;
    font-family: 'Open Sans', sans-serif;
  }
}

*, *::before, *::after {
  box-sizing: border-box;
}

#app {
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
</style>
