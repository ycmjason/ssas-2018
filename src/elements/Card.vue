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
  *:first-child {
    margin-top: 0;
  }

  *:last-child {
    margin-bottom: 0;
  }
}
</style>
