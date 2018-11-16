<template>
  <Card v-bind="$attrs">
    <h3>You are the secret santa of</h3>
    <p v-if="!master" class="no_master">
      Waiting for everyone to join this game.
    </p>
    <a v-else :href="master.link" class="master_link master_card_content" target="_blank">
      <img :src="`//graph.facebook.com/${master.fbid}/picture?type=large`">
      {{ master.displayName }}
    </a>
  </Card>
</template>

<script>
export default {
  props: ['master', 'isMaster'],
};
</script>

<style lang="scss" scoped>
.no_master {
  text-align: center;
  font-style: italic;
}

.master_card_content {
  display: flex;
  align-items: center;

  img {
    margin-right: 2rem;
  }
}

.master_link {
  color: black;
}
</style>
