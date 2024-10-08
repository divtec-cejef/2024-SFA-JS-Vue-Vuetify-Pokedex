<template>
  <v-app-bar flat>
    <v-container class="d-flex align-start align-center">
      <v-avatar
        class="mr-4 pa-0 cursor-pointer"
        image="@/assets/pokeball.svg"
        size="64"
        @click="$router.push('/')"
      />
      <v-toolbar-title>Pokedex</v-toolbar-title>
      <v-btn
        v-for="link in menuItems"
        :key="link.title"
        :text="link.title"
        :to="link.path"
        variant="text"
      />
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
