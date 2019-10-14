<template>
  <div>
    <Card v-if="isOwner">
      <h3>Owner Actions</h3>
      <div class="owner-actions">
        <InviteLink :game="game" class="invite-link" :disabled="isAllocated" />
        <AllocateButton
          class="allocateButton"
          :disabled="!canAllocate"
          :participants="game.participants"
          @allocated="allocation => setAllocation({ game, allocation })"
        />
      </div>
    </Card>
    <Card v-else>
      <h3>Actions</h3>
      <div>
        <GameLeaveButton :game="game" v-if="canLeave" />
      </div>
    </Card>

    <MasterCard :master="yourMaster" class="master_card" />
    <ParticipantsCard class="participants_card" :participants="game.participants" :creatorUid="game.creator.uid" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import AllocateButton from '/components/AllocateButton.vue';
import Card from '/elements/Card.vue';
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
    Card,
  },
  computed: {
    ...mapState(['user']),
    yourMaster() {
      if (!this.game.allocation) return null;
      return this.game.allocation.find(({ from }) => from.uid === this.user.uid).to;
    },
    isOwner() {
      return this.game.creator.uid === this.user.uid;
    },
    isAllocated() {
      return !!this.game.allocation;
    },
    canAllocate() {
      return !this.isAllocated && this.game.participants.length >= 3;
    },
    canLeave() {
      return !this.isOwner && !this.isAllocated;
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

.owner-actions {
  display: flex;

  .invite-link {
    margin-right: 1rem;
  }
}
</style>
