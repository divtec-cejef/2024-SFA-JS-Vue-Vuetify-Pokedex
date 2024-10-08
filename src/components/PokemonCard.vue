<template>
  <v-card :to="`/pokemon/${pokemon.id}`">
    <v-img contain height="200px" :src="`images/${pokemon.img}`" />
    <v-card-title>{{ pokemon.name }}</v-card-title>
    <v-card-subtitle>
      <v-chip
        v-for="type in pokemon.type.split(',')"
        :key="type"
        class="ma-1"
        :color="getTypeColor(type)"
        text-color="white"
      >
        {{ type }}
      </v-chip>
    </v-card-subtitle>
    <v-card-text>Level: {{ pokemon.level }}</v-card-text>
    <v-card-actions>
      <v-btn icon @click.prevent="toggleFavorite">
        <v-icon :color="isFavorite ? 'red' : ''">
          {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { computed } from 'vue'
  import { usePokemonStore } from '@/stores/pokemonStore'

  const props = defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
  })

  const pokemonStore = usePokemonStore()
  const isFavorite = computed(() => pokemonStore.isFavorite(props.pokemon))

  function toggleFavorite () {
    pokemonStore.toggleFavorite(props.pokemon)
  }

  function getTypeColor (type) {
    return pokemonStore.getTypeColor(type)
  }
</script>
