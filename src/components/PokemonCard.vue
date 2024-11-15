<template>
  <v-card :to="`/pokemon/${pokemon.id}`">
    <v-img contain height="200px" :src="`images/${pokemon.img}`" />
    <v-card-title>{{ pokemon.name }}</v-card-title>
    <v-card-subtitle>
      <pokemon-types-chips :pokemon="pokemon" />
      <v-card-text>Level: {{ pokemon.level }}</v-card-text>
      <v-card-actions>
        <v-btn icon @click.prevent="pokemonStore.toggleFavorite(pokemon)">
          <v-icon :color="pokemonStore.isFavorite(pokemon)? 'red' : ''">
            {{ pokemonStore.isFavorite(pokemon) ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card-subtitle></v-card>
</template>

<script setup>
  import PokemonTypesChips from '@/components/PokemonTypesChips.vue'
  import { usePokemonStore } from '@/stores/pokemonStore'
  const pokemonStore = usePokemonStore()

  defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
  })

</script>
