<template>
  <Card v-bind="$attrs">
    <h3>You are the secret santa of</h3>
    <p v-if="!master" class="no_master">
      Waiting for everyone to join this game.
    </p>
    <ExternalLink v-else :href="master.link" class="master_card_content">
      <img :src="`//graph.facebook.com/${master.fbid}/picture?type=large`">
      {{ master.displayName }}
    </ExternalLink>
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
</style>
