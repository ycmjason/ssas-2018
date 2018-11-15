<template>
  <div>
    <main>
      <Card class="participants_card">
      <h3>Enrolled participants</h3>
      <ul>
        <li v-for="parti in game.participants" :key="parti.id">
          <a class="profile_link" target="_blank" :href="parti.link">
            <img :src="parti.photoURL">
            {{ parti.displayName }}
            <template v-if="parti.uid === game.creator.uid">(owner)</template>
          </a>
        </li>
      </ul>
      </Card>
    </main>
  </div>
</template>

<script>
export default {
  props: ['game'],
};
</script>

<style lang="scss" scoped>
.participants_card {
  ul {
    padding-left: 0;
    margin-bottom: 0;
  }

  li {
    list-style: none;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    .profile_link {
      display: inline-flex;
      align-items: center;
    }

    img {
      margin-right: 1rem;
    }
  }
}
</style>
