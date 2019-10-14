<template>
  <div>
    <div class="actions">
      <InviteLink :game="game" class="inviteLink" :disabled="isAllocated" />
      <AllocateButton
        class="allocateButton"
        v-if="isMaster"
        :disabled="!canAllocate"
        :participants="game.participants"
        @allocated="allocation => setAllocation({ game, allocation })"
      />
      <GameLeaveButton class="gameLeaveButton" :game="game" v-if="!isMaster && !isAllocated" />
    </div>

    <MasterCard :isMaster="isMaster" :master="yourMaster" class="master_card" />
    <ParticipantsCard class="participants_card" :participants="game.participants" :creatorUid="game.creator.uid" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import AllocateButton from '/components/AllocateButton.vue';
import InviteLink from '/components/InviteLink.vue';
import MasterCard from '/components/MasterCard.vue';
import ParticipantsCard from '/components/ParticipantsCard.vue';
import GameLeaveButton from './GameLeaveButton.vue';

export default {
  props: ['game'],
  components: {
    MasterCard,
    ParticipantsCard,
    AllocateButton,
    GameLeaveButton,
    InviteLink,
  },
  computed: {
    ...mapState(['user']),
    yourMaster() {
      if (!this.game.allocation) return null;
      return this.game.allocation.find(({ from }) => from.uid === this.user.uid).to;
    },
    isMaster() {
      return this.game.creator.uid === this.user.uid;
    },
    isAllocated() {
      return !!this.game.allocation;
    },
    canAllocate() {
      return !this.isAllocated && this.game.participants.length >= 3;
    },
  },
  methods: mapActions(['setAllocation']),
};
</script>

<style lang="postcss" scoped>
.master_card,
.participants_card {
  margin-top: 1rem;
}

.actions {
  display: flex;

  .inviteLink {
    margin-right: 1rem;
  }

  .gameLeaveButton {
    margin-left: auto;
  }
}
</style>
