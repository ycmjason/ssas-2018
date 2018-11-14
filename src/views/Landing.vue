<template>
  <section class="landing">
    <Card class="loginCard">
      <img class="logo" src="@/assets/logo.svg">
      <h1>SSAS</h1>
      <FacebookSignIn />
    </Card>
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

>>> .loginCard {
  flex-grow: 1;
  max-width: 500px;
}

h1 {
  text-align: center;
}
</style>
