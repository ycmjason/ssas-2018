<template>
<CenteredCardLayout>
  <HomeLink tag="div" class="content">
    <h1>404 Not Found</h1>
    <p>{{ m }}</p>
    <img v-if="img" :src="img">
  </HomeLink>
</CenteredCardLayout>
</template>

<script>
import { getRandomGif } from '@/utils/giphy';

export default {
  async created () {
    this.img = await getRandomGif('puppy');
  },
  data: () => ({
    img: null,
  }),
  props: {
    m: {
      default: 'Captain, nothing is found!',
    },
  },
};
</script>

<style scoped>
.content {
  cursor: pointer;
}

img {
  width: 100%;
}
</style>
