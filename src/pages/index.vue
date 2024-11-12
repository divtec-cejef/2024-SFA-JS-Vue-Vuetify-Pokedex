<template>
  <v-container>
    <h1 class="mb-6 text-center">
      Pokédex
      <!-- bouton pour ajouter un pokémon -->
      <v-btn
        v-tooltip.bottom="'Ajouter un Pokémon'"
        aria-label="Ajouter un Pokémon"
        class="ml-4"
        color="primary"
        fab
        icon="mdi-plus"
        @click="$router.push('pokemon/add')"
      />

    </h1>
    <pokemon-search v-model="search" />
    <v-row>
      <v-col v-if="pokemonStore.isLoading" class="text-center" cols="12">
        <v-progress-circular
          class="mx-auto"
          color="primary"
          indeterminate
          size="64"
        />
      </v-col>
      <v-col
        v-for="pokemon in filteredPokemons"
        v-else
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

  // Fonction de recherche améliorée avec localeCompare pour les correspondances partielles
  const filteredPokemons = computed(() => {
    // on récupère la valeur de la recherche en minuscule et sans espaces (trim)
    const searchQuery = search.value.trim().toLowerCase()
    // si la recherche est vide on retourne tous les pokemons
    if (!searchQuery) return pokemons.value
    // sinon on retourne les pokemons dont le nom contient la recherche
    return pokemons.value.filter(pokemon =>
      pokemon.nom.toLowerCase().includes(searchQuery)
    )
  })

</script>
