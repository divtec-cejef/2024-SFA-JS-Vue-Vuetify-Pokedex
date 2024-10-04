<!-- src/pages/index.vue -->
<template>
  <v-container>
    <v-text-field
      v-model="search"
      label="Search Pokémon"
      prepend-icon="mdi-magnify"
    />
    <v-row>
      <v-col
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <v-card :to="`/pokemon/${pokemon.id}`">
          <v-img contain height="200px" :src="`/images/${pokemon.img}`" />
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
            <v-btn icon @click.stop="toggleFavorite(pokemon)">
              <v-icon :color="isFavorite(pokemon) ? 'red' : ''">
                {{ isFavorite(pokemon) ? 'mdi-heart' : 'mdi-heart-outline' }}
              </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { usePokemonStore } from '@/stores/pokemonStore'

  const pokemonStore = usePokemonStore()
  const { pokemons } = storeToRefs(pokemonStore)
  const { toggleFavorite, isFavorite, getTypeColor } = pokemonStore

  const search = ref('')

  const filteredPokemons = computed(() => {
    return pokemons.value.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.value.toLowerCase())
    )
  })
</script>
