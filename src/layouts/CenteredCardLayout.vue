<template functional>
  <section class="wrapper">
    <Card class="centeredCard">
      <slot></slot>
    </Card>
  </section>
</template>

<script>
import Card from '/elements/Card';

export default {
  components: { Card },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.centeredCard {
  min-width: 300px;
}
</style>
