<template>
  <v-container>
    <h1 class="mb-8 text-center">Mes Pokémons Favoris</h1>

    <v-row v-if="favorites.length > 0">
      <v-col
        v-for="pokemon in favorites"
        :key="pokemon.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <pokemon-card :pokemon="pokemon" />
      </v-col>
    </v-row>

    <v-alert
      v-else
      text="Vous n'avez pas encore de Pokémon favoris. Retournez à la liste des Pokémon pour en ajouter !"
      type="info"
    />
  </v-container>
</template>

<script setup>
  import { storeToRefs } from 'pinia'
  import { usePokemonStore } from '@/stores/pokemonStore'
  import PokemonCard from '@/components/PokemonCard.vue'

  const pokemonStore = usePokemonStore()
  const { favorites } = storeToRefs(pokemonStore)
</script>
