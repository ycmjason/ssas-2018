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

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lora:800i|Open+Sans');

:root {
  --font-family-heading: 'Lora', serif;
  --font-family-body: 'Open Sans', sans-serif;
  --color-brand: #ff9021;
  --color-brand-contrast: #fff;
  --color-border: #dddddd;
}

html {
  font-size: 18px;
  font-family: var(--font-family-body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-family-heading);
  font-style: italic;
}

*, *::before, *::after {
  box-sizing: border-box;
}

input, textarea {
  padding: 0.8rem;
  border: 1px solid var(--color-border);
}

button, input[type=submit], input[type=button] {
  padding: 0.8rem;
  background: var(--color-brand);
  color: var(--color-brand-contrast);
  border: 0;
  cursor: pointer;
}
</style>
