<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background: white;
  padding: 1rem;
  border-radius: 5px;
  border: 1px var(--color-border) solid;
}

.card > {
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
  }
}
</style>
