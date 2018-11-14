<template functional>
  <div :class="['card', data.class, data.staticClass].join(' ')" :style="data.style">
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
