<template>
  <v-container>
    <h1 class="mb-6 text-center">
      Pokédex
      <!--
      bouton pour ajouter un pokémon
        * aria-label permet d'ajouter une description pour les lecteurs d'écran utilisés par les personnes malvoyantes
        * v-tooltip permet d'afficher une info-bulle au survol du bouton
        * @click permet de naviguer vers la page d'ajout de pokémon
      -->
      <v-btn
        v-tooltip.bottom="'Ajouter un Pokémon'"
        aria-label="Ajouter un Pokémon"
        class="ml-4"
        color="primary"
        icon="mdi-plus"
        @click="$router.push('pokemon/add')"
      />

    </h1>

    <!--
    champ de recherche
      * v-model permet de lier la valeur du champ de recherche à la variable search
      * clearable permet d'ajouter un bouton pour vider le champ de recherche
      * label permet d'ajouter un label au champ de recherche
      * prepend-icon permet d'ajouter une icône loupe avant le champ de recherche
    -->
    <v-text-field
      v-model="search"
      clearable
      label="Trouver un Pokémon"
      prepend-icon="mdi-magnify"
    />

    <!--
    grille de cartes de pokémons
      * v-row permet de définir une ligne
      * v-col permet de définir une colonne
    -->
    <v-row>
      <!--
      Si les pokémons sont en cours de chargement on affiche un spinner
        * cols="12" permet d'occuper toute la largeur de la grille
      -->
      <v-col v-if="pokemonStore.isLoading" class="text-center" cols="12">
        <!-- spinner de chargement -->
        <v-progress-circular
          class="mx-auto"
          color="primary"
          indeterminate
          size="64"
        />
      </v-col>
      <!--
      Affiche les cartes des pokémons
      * v-for permet de parcourir les pokémons
      * :key permet de donner une clé unique à chaque pokémon
      * cols définit la taille par défaut d'une colonne sur un maximum de 12 cols
        si on met cols="6" un colonne occupe au maximum la moitié de la grille (12/6=2)
        Ici on met cols="12" pour que chaque carte puisse occuper toute la largeur de la grille
      * xl, lg, md, sm, xs permettent de définir le nombre de colonnes max pour chaque taille d'écran
        par exmple lg="3" signifie que sur grand écran on affiche 4 cartes par ligne (12/3=4)
        https://vuetifyjs.com/en/components/grids/
      -->
      <v-col
        v-for="pokemon in filteredPokemons"
        v-else
        :key="pokemon.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
        xl="2"
        xs="12"
        xxl="2"
      >
        <pokemon-card :pokemon="pokemon" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { usePokemonStore } from '@/stores/pokemonStore'
  import PokemonCard from '@/components/PokemonCard.vue'

  const pokemonStore = usePokemonStore()
  const { pokemons } = storeToRefs(pokemonStore)

  const search = defineModel({ default: '' })

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
