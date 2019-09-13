<template>
  <button @click="allocate" :disabled="allocating">allocate</button>
</template>

<script>
const sort = ([...xs], fn) => xs.sort(fn);

export default {
  props: ['participants'],
  data: () => ({
    allocating: false,
  }),
  methods: {
    allocate() {
      this.allocating = true;
      const shuffled = sort(this.participants, () => Math.random() - 0.5);
      this.$emit(
        'allocated',
        shuffled.map((parti, i) => ({
          from: parti,
          to: shuffled[(i + 1) % shuffled.length],
        })),
      );
    },
  },
};
</script>
