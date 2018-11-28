<template>
  <span v-bind="$attrs" v-on="$listeners" class="icon">
    <slot></slot>
  </span>
</template>

<style scoped>
.icon {
  font-family: var(--font-family-body);
  font-style: normal;
  text-decoration: none;
  font-size: 1rem;
  display: block;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  line-height: 0;
  color: var(--color-border);
  border: 1px solid var(--color-border);
  box-sizing: content-box;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
</style>
