<template>
  <div>
    <Card v-if="isOwner" class="owner-actions-card">
      <h3>Owner Actions</h3>
      <div class="owner-actions">
        <InviteLink :game="game" class="owner-action" :disabled="isAllocated" />
        <AllocateButton
          class="owner-action"
          :disabled="!canAllocate"
          :participants="game.participants"
          @allocated="allocation => setAllocation({ game, allocation })"
        />
        <CheckButton
          class="owner-action"
          :checked="!!game.isParticipantsHidden"
          :disabled="isSaving"
          @toggle="isParticipantsHidden => setIsParticipantsHidden(isParticipantsHidden)"
        >
          Hide participants from users
        </CheckButton>
      </div>
    </Card>
    <Card v-else>
      <h3>Actions</h3>
      <div>
        <GameLeaveButton :game="game" :disabled="!canLeave" />
      </div>
    </Card>

    <MasterCard :master="yourMaster" class="master_card" />
    <ParticipantsCard
      v-if="isOwner || !game.isParticipantsHidden"
      class="participants_card"
      :class="game.isParticipantsHidden ? 'participants_card--secret' : ''"
      :participants="game.participants"
      :creatorUid="game.creator.uid"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import AllocateButton from '/components/AllocateButton.vue';
import Card from '/elements/Card.vue';
import InviteLink from '/components/InviteLink.vue';
import MasterCard from '/components/MasterCard.vue';
import ParticipantsCard from '/components/ParticipantsCard.vue';
import GameLeaveButton from '/views/Game/GameLeaveButton.vue';
import CheckButton from '/elements/CheckButton.vue';

export default {
  props: ['game'],
  data: () => ({
    isSaving: false,
  }),
  components: {
    MasterCard,
    ParticipantsCard,
    AllocateButton,
    GameLeaveButton,
    InviteLink,
    Card,
    CheckButton,
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
  methods: {
    ...mapActions(['setAllocation']),
    async setIsParticipantsHidden(isParticipantsHidden) {
      this.isSaving = true;
      await this.$store.dispatch('setIsParticipantsHidden', { game: this.game, isParticipantsHidden });
      this.isSaving = false;
    },
  },
};
</script>

<style lang="postcss" scoped>
.master_card,
.participants_card {
  margin-top: 1rem;
}

.participants_card--secret {
  position: relative;

  &::after {
    content: 'lock';
    font-family: 'Material Icons';
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
}

.owner-actions-card {
  position: relative;

  &::after {
    content: 'lock';
    font-family: 'Material Icons';
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  .owner-actions {
    display: flex;

    .owner-action {
      margin-right: 1rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
