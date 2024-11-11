<template>
  <!-- Barre d'application plate avec navigation -->
  <v-app-bar flat>
    <v-container class="d-flex align-start align-center">
      <!-- Logo cliquable ramenant à l'accueil -->
      <v-avatar
        class="mr-4 pa-0 cursor-pointer"
        image="@/assets/pokeball.svg"
        size="64"
        @click="$router.push('/')"
      />
      <!-- Titre de l'application -->
      <v-toolbar-title>Pokedex</v-toolbar-title>

      <!-- Liens de navigation dynamiques issus de la liste `menuItems` -->
      <v-btn
        v-for="link in menuItems"
        :key="link.title"
        :icon="link.icon"
        :to="link.path"
      />

      <!-- Bouton Login ou Logout selon l'état de connexion de l'utilisateur -->
      <v-btn
        v-if="store.token"
        icon="mdi-logout"
        @click="logout"
      />
      <!-- Si pas connecté, affiche le bouton Login -->
      <v-btn
        v-else
        icon="mdi-login"
        @click="$router.push('/login')"
      />
    </v-container>
  </v-app-bar>
</template>

<script setup>
  import router from '@/router'
  import { ref } from 'vue'
  import { usePokemonStore } from '@/stores/pokemonStore'

  // Utilisation du store pour gérer l'état de connexion de l'utilisateur
  const store = usePokemonStore()

  // Définition des éléments de menu avec leurs icônes et chemins
  const menuItems = ref([
    { title: 'Accueil', path: '/', icon: 'mdi-pokeball' },
    { title: 'Favoris', path: '/favoris', icon: 'mdi-heart' },
    { title: 'FAQ', path: '/faq', icon: 'mdi-frequently-asked-questions' },
    { title: 'Kanto', path: '/kantomap', icon: 'mdi-map' },
  ])

  // Fonction de déconnexion
  function logout () {
    store.logout()
    router.push('/')
  }
</script>
