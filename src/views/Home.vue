<template>
  <div class="home">
    SSAS
    <FacebookLogin />
  </div>
</template>

<script>
import FacebookLogin from '@/components/FacebookLogin.vue';

export default {
  name: 'home',
  components: {
    FacebookLogin,
  },
};
</script>

<style>
.login {
  background: rgb(59, 89, 152);
  color: white;
  padding: 1rem;
}
</style>
