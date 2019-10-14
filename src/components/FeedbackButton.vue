<template>
  <ExternalLink class="link btn btnInversed" :class="show ? 'show' : ''" href="https://goo.gl/forms/5diWqYShzXvGpuUt2">
    Got feedback?
  </ExternalLink>
</template>

<script>
import ExternalLink from '/elements/ExternalLink.vue';

export default {
  components: { ExternalLink },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 3000);
  },
  data: () => ({
    show: false,
  }),
};
</script>

<style lang="postcss" scoped>
.link {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  transform: translateX(2rem) translateX(100%);
  transition: transform 0.3s;

  &.show {
    transform: translateX(2rem) translateX(100%);

    @media (min-width: 900px) {
      transform: none;
    }
  }
}
</style>
