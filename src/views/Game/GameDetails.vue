<template>
  <div>
    <AllocateButton
        v-if="!isAllocated && isMaster"
        :disabled="!canAllocate"
        :participants="game.participants"
        @allocated="allocation => setAllocation({ game, allocation })" />
    <MasterCard v-else :master="yourMaster" />
    <ParticipantsCard
        class="participants_card"
        :participants="game.participants"
        :creatorUid="game.creator.uid" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import AllocateButton from '@/components/AllocateButton.vue';
import MasterCard from '@/components/MasterCard.vue';
import ParticipantsCard from '@/components/ParticipantsCard.vue';

export default {
  props: ['game'],
  components: { MasterCard, ParticipantsCard, AllocateButton },
  computed: {
    ...mapState(['user']),
    yourMaster () {
      if (!this.game.allocation) return null;
      return this.game.allocation.find(({ from }) => from.uid === this.user.uid).to;
    },
    isMaster () {
      return this.game.creator.uid === this.user.uid;
    },
    isAllocated () {
      return !!this.game.allocation;
    },
    canAllocate () {
      return this.game.participants.length >= 3;
    },
  },
  methods: mapActions(['setAllocation']),
};
</script>

<style scoped>
.participants_card {
  margin-top: 1rem;
}
</style>
