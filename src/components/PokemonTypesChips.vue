<template>
  <v-chip
    v-for="typeId in pokemon.types"
    :key="typeId"
    class="ma-1"
    :color="pokemonStore.getTypeById(typeId).color"
    text-color="white"
  >
    {{ pokemonStore.getTypeById(typeId).name }}
  </v-chip>
</template>

<script setup>
  import { defineProps } from 'vue'
  import { usePokemonStore } from '@/stores/pokemonStore'

  // Définition des props du composant
  defineProps({
    pokemon: { // Pokémon dont on veut afficher les types
      type: Object,
      required: true,
    },
  })

  // Récupération du magasin Pinia des Pokémon
  const pokemonStore = usePokemonStore()
</script>
