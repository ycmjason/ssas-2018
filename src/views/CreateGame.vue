<template>
  <MainLayout>
    <Back to="/dashboard" label="View all games" />
    <h2>Create new game</h2>
    <Survey :fields="fields" @submit="createGame" />
  </MainLayout>
</template>

<script>
import Survey from '@/components/Survey.vue';

export default {
  name: 'createGame',
  components: {
    Survey,
  },
  data: () => ({
    fields: {
      title: {
        type: 'text',
        label: 'Title',
        placeholder: `Christmas party @ Jason's`,
        optional: false,
      },
      description: {
        type: 'textarea',
        label: 'Description',
        placeholder: `The party is on 20th December. Remember to bring your booze!`,
        optional: true,
      },
    },
  }),
  methods: {
    async createGame({ title, description }) {
      await this.$store.dispatch('createGame', { title, description });
      this.$router.push('/dashboard');
    },
  },
};
</script>

<style scoped></style>
