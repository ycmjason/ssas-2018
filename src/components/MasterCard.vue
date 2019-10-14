<template>
  <Card v-bind="$attrs">
    <h3>You are the secret santa of</h3>
    <p v-if="!master" class="no_master">
      Waiting for everyone to join this game.
    </p>
    <ExternalLink v-else :href="master.link" class="master_card_content">
      <img :src="imgSrc" />
      {{ master.displayName }}
    </ExternalLink>
  </Card>
</template>

<script>
import Card from '/elements/Card.vue.vue';
import ExternalLink from '/elements/ExternalLink.vue';

export default {
  components: { Card },
  props: ['master', 'isMaster'],
  computed: {
    imgSrc() {
      const { master } = this;
      if (master.fbid) {
        return `//graph.facebook.com/${master.fbid}/picture?type=large`;
      }

      if (master.gid) {
        return master.photoURL;
      }

      return 'https://dummyimage.com/200x200/efefef/000';
    },
  },
};
</script>

<style lang="postcss" scoped>
.no_master {
  text-align: center;
  font-style: italic;
}

.master_card_content {
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    margin-bottom: 1rem;
    max-width: 200px;
  }

  @media (min-width: 900px) {
    flex-direction: row;

    img {
      margin-right: 2rem;
      margin-bottom: 0;
    }
  }
}
</style>
