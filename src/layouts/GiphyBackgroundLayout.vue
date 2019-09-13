<template>
  <section class="bg" :style="`background-image: url(${bgImg})`">
    <slot></slot>
  </section>
</template>

<script>
import { getRandomGif } from '@/utils/giphy';

export default {
  name: 'GiphyBackground',
  async created() {
    this.bgImg = await getRandomGif('christmas');
  },
  data: () => ({
    bgImg: '',
  }),
};
</script>

<style scoped>
.bg {
  min-height: 100vh;
  min-width: 100vw;
}
</style>
