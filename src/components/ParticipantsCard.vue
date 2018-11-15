<template>
  <Card class="participants_card">
    <h3>Enrolled participants</h3>
    <ul>
      <li v-for="parti in participants" :key="parti.id">
        <a class="profile_link" target="_blank" :href="parti.link">
          <img class="profile_picture" :src="parti.photoURL">
          {{ parti.displayName }}
          <template v-if="parti.uid === creatorUid"> (owner)</template>
          <template v-if="parti.uid === user.uid"> (you)</template>
        </a>
      </li>
    </ul>
  </Card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: ['participants', 'creatorUid'],
  computed: mapState(['user']),
};
</script>

<style lang="scss" scoped>
ul {
  padding-left: 0;
  margin-bottom: 0;
}

li {
  list-style: none;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.profile_link {
  display: inline-flex;
  align-items: center;
}

.profile_picture {
  margin-right: 1rem;
}
</style>
