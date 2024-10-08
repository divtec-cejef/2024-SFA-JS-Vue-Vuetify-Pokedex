<template>
  <v-container>
    <h1 class="mb-6 text-center">Pokédex</h1>
    <pokemon-search v-model="search" />
    <v-row>
      <v-col
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
      >
        <pokemon-card :pokemon="pokemon" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { usePokemonStore } from '@/stores/pokemonStore'
  import PokemonSearch from '@/components/PokemonSearch.vue'
  import PokemonCard from '@/components/PokemonCard.vue'

  const pokemonStore = usePokemonStore()
  const { pokemons } = storeToRefs(pokemonStore)

  const search = ref('')

  const filteredPokemons = computed(() => {
    if (!search.value) return pokemons.value
    return pokemons.value.filter(pokemon =>
      pokemon.name.toLowerCase().includes(search.value.toLowerCase())
    )
  })
</script>
