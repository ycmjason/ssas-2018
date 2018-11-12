<template>
  <div class="home">
    <section>
      <FacebookSignIn />
    </section>
  </div>
</template>

<script>
import FacebookSignIn from '@/components/FacebookSignIn.vue';

export default {
  name: 'home',
  components: {
    FacebookSignIn,
  },
};
</script>

<style scoped>
section {
  max-width: 300px;
  margin: 0 auto;
}
</style>
