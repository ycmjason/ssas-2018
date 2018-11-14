<template>
  <section class="bg" :style="`background-image: url(${bgImg})`">
    <slot></slot>
  </section>
</template>

<script>
const GIPHY_ENDPOINT = 'http://api.giphy.com/v1/gifs/random?api_key=5ZiDzE9O3Ey92la0cgHyXPVL2klNIRkm&tag=christmas';

export default {
  name: 'GiphyBackground',
  async created () {
    const res = await fetch(GIPHY_ENDPOINT);
    const { data } = await res.json();
    this.bgImg = data.image_original_url;
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
