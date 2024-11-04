<template>
  <v-card :to="`/pokemon/${pokemon.id}`">
    <v-img contain height="200px" :src="`${pokemonStore.imageUrl}/${pokemon.image}`" />
    <v-card-title>
      {{ pokemon.nom }}
    </v-card-title>
    <v-card-subtitle class="d-flex align-center">
      <v-img
        v-for="type in pokemon.types"
        :key="type.type_id?.id"
        :alt="type.type_id?.name"
        class="ma-1"
        max-height="40"
        max-width="40"
        :src="pokemonStore.imageUrl + '/' + type.type_id?.image"
        :title="type.type_id?.name"
      />
    </v-card-subtitle>
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

  function getTypeById (typeId) {
    return pokemonStore.getTypeById(typeId)
  }
</script>
