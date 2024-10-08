<template>
  <v-container>
    <h1 class="mb-6 text-center">Pokédex</h1>
  </v-container>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { usePokemonStore } from '@/stores/pokemonStore'

  // On récupère les données du store Pokemon
  const pokemonStore = usePokemonStore()
  // On transforme le store en refs (données réactives)
  const { pokemons } = storeToRefs(pokemonStore)
</script>
