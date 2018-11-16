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
  --color-brand-disabled: #ffbc7a;
  --color-danger: #e00000;
  --color-danger-disabled: #f28080;
  --color-brand-contrast: #fff;
  --color-border: #acacac;
}

html {
  font-size: 18px;
  font-family: var(--font-family-body);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-family-heading);
  font-style: italic;
  line-height: 1.1rem;
}

*, *::before, *::after {
  box-sizing: border-box;
  line-height: 1.5rem;
}

a {
  text-decoration: none;

  &:visited {
    color: #0000EE;
  }
}

input, textarea {
  padding: 0.8rem;
  border: 1px solid var(--color-border);
  line-height: inherit;
}

button, input[type=submit], input[type=button] {
  padding: 0.8rem;
  background: var(--color-brand);
  color: var(--color-brand-contrast);
  border: 0;
  cursor: pointer;

  &:disabled {
    background: var(--color-brand-disabled);
    cursor: default;
  }

  &.dangerBtn {
    background: var(--color-danger);

    &:disabled {
      background: var(--color-danger-disabled);
    }
  }
}
</style>
