<template>
  <section class="landing">
    <Card class="loginCard">
      <img class="logo" src="@/assets/logo.svg" />
      <h1>SSAS</h1>
      <p v-if="query.returnTo && query.invite">Please login to join.</p>
      <p v-else-if="query.returnTo">Please login to continue.</p>
      <div class="loginButtons">
        <GoogleSignIn :returnTo="query.returnTo" />
        <FacebookSignIn :returnTo="query.returnTo" />
      </div>
    </Card>
  </section>
</template>

<script>
import FacebookSignIn from '@/components/FacebookSignIn.vue';
import GoogleSignIn from '@/components/GoogleSignIn.vue';

export default {
  name: 'landing',
  components: {
    FacebookSignIn,
    GoogleSignIn,
  },
  computed: {
    query: vm => vm.$route.query,
  },
};
</script>

<style lang="scss" scoped>
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

.loginCard {
  flex-grow: 1;
  max-width: 500px;
}

h1,
p {
  text-align: center;
}

p {
  color: var(--color-danger);
}

.loginButtons {
  button {
    margin-bottom: 1rem;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
