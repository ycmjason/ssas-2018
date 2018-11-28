<template>
  <a v-bind="$attrs"
      v-on="$listeners"
      target="_blank"
      rel="noopener noreferrer">
    <slot></slot>
  </a>
</template>
