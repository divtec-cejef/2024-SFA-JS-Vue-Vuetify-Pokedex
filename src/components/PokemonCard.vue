<template>
  <v-card :to="`/pokemon/${pokemon.id}`">
    <v-img contain height="200px" :src="`images/${pokemon.img}`" />
    <v-card-title>{{ pokemon.name }}</v-card-title>
    <v-card-subtitle>
      <v-chip
        v-for="typeId in pokemon.types"
        :key="typeId"
        class="ma-1"
        :color="pokemonStore.getTypeById(typeId).color"
        text-color="white"
      >
        {{ pokemonStore.getTypeById(typeId).name }}
      </v-chip>
    </v-card-subtitle>
    <v-card-text>Level: {{ pokemon.level }}</v-card-text>
    <v-card-actions>
      <v-btn icon @click.prevent="pokemonStore.toggleFavorite()">
        <v-icon :color="pokemonStore.isFavorite(pokemon)? 'red' : ''">
          {{ pokemonStore.isFavorite(pokemon) ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { usePokemonStore } from '@/stores/pokemonStore'
  const pokemonStore = usePokemonStore()

  const props = defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
  })

</script>
