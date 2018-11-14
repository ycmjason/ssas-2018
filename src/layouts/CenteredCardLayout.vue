<template functional>
  <section class="wrapper">
    <Card class="centeredCard">
      <slot></slot>
    </Card>
  </section>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.centeredCard {
  max-width: 300px;
}
</style>
