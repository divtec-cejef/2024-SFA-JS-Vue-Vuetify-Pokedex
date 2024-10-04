<template>
  <v-container v-if="selectedPokemon">
    <v-card>
      <v-img contain height="300px" :src="selectedPokemon.sprites.front_default" />
      <v-card-title>{{ selectedPokemon.name }}</v-card-title>
      <v-card-text>
        <p>Height: {{ selectedPokemon.height }}</p>
        <p>Weight: {{ selectedPokemon.weight }}</p>
        <p>Types: {{ pokemonTypes }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn icon @click="toggleFavorite(selectedPokemon)">
          <v-icon :color="isFavorite(selectedPokemon) ? 'red' : ''">
            {{ isFavorite(selectedPokemon) ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>
        <v-btn @click="goBack">Back to List</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
  import { computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { usePokemonStore } from '@/stores/pokemonStore'

  const route = useRoute()
  const router = useRouter()
  const pokemonStore = usePokemonStore()
  const { selectedPokemon } = storeToRefs(pokemonStore)
  const { fetchPokemonDetails, toggleFavorite, isFavorite } = pokemonStore

  onMounted(() => {
    fetchPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`)
  })

  const pokemonTypes = computed(() => {
    return selectedPokemon.value?.types.map(type => type.type.name).join(', ')
  })

  const goBack = () => {
    router.push({ name: 'PokemonList' })
  }
</script>
