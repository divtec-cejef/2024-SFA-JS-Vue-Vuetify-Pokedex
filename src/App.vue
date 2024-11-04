<template>
  <v-app>
    <menu-principal />

    <v-main>
      <router-view />
    </v-main>
    <v-footer>
      <div class="px-4 text-center w-100">
        2024 - Pokedex
      </div>
    </v-footer>
  </v-app>
</template>

<script setup>
  // importe le composant MenuPrincipal
  import MenuPrincipal from '@/components/AppHeader.vue'
  // importe le lyfecycle onMounted
  import { onMounted } from 'vue'
  // importe le magasin des pokemons
  import { usePokemonStore } from '@/stores/pokemonStore'
  // récupère le magasin des pokemons
  const pokemonStore = usePokemonStore()

  // lorsque le composant est monté on récupère les favoris du local storage
  onMounted(async () => {
    pokemonStore.loadFavorites() // charge les favoris depuis le local storage
    await pokemonStore.fetchTypes() // charge les types depuis l'API
    await pokemonStore.fetchPokemons() // charge les pokemons depuis l'API
  })
</script>
