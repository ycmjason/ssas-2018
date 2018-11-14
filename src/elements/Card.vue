<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  background: white;
  padding: 1rem;
  border-radius: 5px;
  border: 1px var(--color-border) solid;
}
</style>
