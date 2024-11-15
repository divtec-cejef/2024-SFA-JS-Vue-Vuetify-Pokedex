<template>
  <v-chip
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
    typeId: { // Id du type du Pokémon à afficher
      type: Number,
      required: true,
    },
  })

  // Récupération du magasin Pinia des Pokémon
  const pokemonStore = usePokemonStore()
</script>
