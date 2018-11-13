<template>
  <section class="home">
    <FacebookSignIn />
  </section>
</template>

<script>
import FacebookSignIn from '@/components/FacebookSignIn.vue';

export default {
  name: 'landing',
  components: {
    FacebookSignIn,
  },
};
</script>

<style scoped>
.home {
  text-align: center;
}
</style>
