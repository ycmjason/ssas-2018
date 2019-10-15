<template>
  <div>
    <Card v-if="isOwner" class="owner-actions-card">
      <h3>Owner Actions</h3>
      <div class="actions">
        <InviteLink :game="game" class="actions__action" :disabled="isAllocated" />
        <AllocateButton
          class="actions__action"
          :disabled="!canAllocate"
          :participants="game.participants"
          @allocated="allocation => setAllocation({ game, allocation })"
        />
        <CheckButton
          class="actions__action"
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
      <div class="actions">
        <GameLeaveButton :game="game" :disabled="!canLeave" class="actions__action" />
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
}

.actions {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  @media (min-width: 900px) {
    flex-direction: row;
  }

  &__action {
    flex-grow: 1;

    @media (min-width: 900px) {
      flex-grow: 0;
    }
    & + & {
      margin-top: 1rem;

      @media (min-width: 900px) {
        margin-left: 1rem;
        margin-top: 0;
      }
    }
  }
}
</style>
