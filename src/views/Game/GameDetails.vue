<template>
  <div>
    <MasterCard :master="game.creator" class="master_card"/>
    <ParticipantsCard
        :participants="game.participants"
        :creatorUid="game.creator.uid" />
  </div>
</template>

<script>
import MasterCard from '@/components/MasterCard.vue';
import ParticipantsCard from '@/components/ParticipantsCard.vue';

export default {
  props: ['game'],
  components: { MasterCard, ParticipantsCard },
};
</script>

<style scoped>
.master_card {
  margin-bottom: 1rem;
}
</style>
