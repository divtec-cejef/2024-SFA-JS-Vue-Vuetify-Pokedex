<template>
  <v-app-bar flat>
    <v-container class="mx-auto d-flex align-center justify-center">
      <v-avatar
        class="mr-4 pa-0"
        image="/images/pokeball.svg"
        size="64"
      />

      <v-btn
        v-for="link in menuItems"
        :key="link.title"
        :text="link.title"
        :to="link.path"
        variant="text"
      />
      <v-spacer />
    </v-container>
  </v-app-bar>
</template>

<script setup>
  import { ref } from 'vue'

  const menuItems = ref([
    { title: 'Accueil', path: '/' },
    { title: 'FAQ', path: '/faq' },
    { title: 'Kanto', path: '/kantomap' },
  ])
</script>
