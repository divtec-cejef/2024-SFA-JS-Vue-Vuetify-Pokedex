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
        :key="pokemon.name"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <v-card @click="goToPokemonDetail(pokemon)">
          <v-img contain height="200px" :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(pokemon.url)}.png`" />
          <v-card-title>{{ pokemon.name }}</v-card-title>
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
  import { computed, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { usePokemonStore } from '@/stores/pokemonStore'

  const router = useRouter()
  const pokemonStore = usePokemonStore()
  const { pokemons } = storeToRefs(pokemonStore)
  const { fetchPokemons, toggleFavorite, isFavorite } = pokemonStore

  const search = ref('')

  onMounted(() => {
    fetchPokemons()
  })

  const filteredPokemons = computed(() => {
    return pokemons.value.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.value.toLowerCase())
    )
  })

  const getPokemonId = url => {
    const id = url.split('/').filter(Boolean).pop()
    return id
  }

  const goToPokemonDetail = pokemon => {
    router.push({ name: 'PokemonDetail', params: { id: getPokemonId(pokemon.url) } })
  }
</script>
