<template>
  <button @click="toggle">
    <i class="material-icons">{{ checked ? 'check_box' : 'check_box_outline_blank' }}</i
    >&nbsp;
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { createComponent, ref, computed, toRefs } from '@vue/composition-api';

export default createComponent({
  props: {
    checked: {
      type: Boolean,
      required: true,
    },
  },

  setup(props, { emit }) {
    const toggle = () => emit('toggle', !props.checked);

    return { toggle };
  },
});
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
}
</style>
