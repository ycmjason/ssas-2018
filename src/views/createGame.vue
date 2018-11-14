<template>
  <MainLayout>
    <h2>Create new game</h2>
    <Survey :fields="fields" @submit="createGame" />
  </MainLayout>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue';
import Survey from '@/components/Survey.vue';

export default {
  name: 'createGame',
  components: {
    MainLayout,
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
    async createGame ({ title, description }) {
      await this.$store.dispatch('createGame', { title, description });
    },
  },
};
</script>

<style scoped>
</style>
