<template>
  <section class="landing" :style="`background-image: url(${bgImg})`">
    <div class="card">
      <img class="logo" src="@/assets/logo.svg">
      <h1>SSAS</h1>
      <FacebookSignIn />
    </div>
  </section>
</template>

<script>
import FacebookSignIn from '@/components/FacebookSignIn.vue';
const GIPHY_ENDPOINT = 'http://api.giphy.com/v1/gifs/random?api_key=5ZiDzE9O3Ey92la0cgHyXPVL2klNIRkm&tag=christmas';

export default {
  name: 'landing',
  async created () {
    const res = await fetch(GIPHY_ENDPOINT);
    const { data } = await res.json();
    this.bgImg = data.image_original_url;
  },
  data: () => ({
    bgImg: '',
  }),
  components: {
    FacebookSignIn,
  },
};
</script>

<style scoped>
.landing {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  display: block;
  margin: 1rem auto;
  max-width: 70%;
}

.card {
  background: white;
  flex-grow: 1;
  max-width: 500px;
  padding: 1rem;
  border-radius: 5px;
  border: 1px var(--color-border) solid;
}

h1 {
  text-align: center;
}
</style>
