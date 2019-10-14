<template functional>
  <main>
    <Card class="late_card">
      <h3>Late Santa</h3>
      <p>
        This game's secret santas have been allocated. Join earlier next time mate.
      </p>
    </Card>
    <p>Here is a little video for you to enjoy:</p>
    <Card class="late_santa">
      <img src="https://media.giphy.com/media/3o6ZtnGrjdCl0VoCCA/giphy.gif" />
    </Card>
  </main>
</template>

<script>
import Card from '/elements/Card';

export default {
  components: { Card },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.late_card {
  max-width: 470px;
  margin-bottom: 1rem;
}

.late_santa {
  max-width: 270px;
  max-height: 480px;
  box-sizing: content-box;
}
</style>
