<template>
  <!--
  Conteneur principal pour structurer la disposition de la page
  -->
  <v-container>
    <!--
        Titre de la page
          * mb-6 permet d'ajouter une Marge en Bas de 6 unités
          * text-center permet de centrer le texte
        -->
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
    Champ de texte pour la recherche de Pokémon
      * v-model lie bidirectionnellement la valeur de la recherche (search) avec l'entrée utilisateur
      * clearable ajoute une icône pour effacer rapidement le champ
      * label affiche un texte indicatif pour guider l'utilisateur
      * prepend-icon ajoute une icône "loupe" (mdi-magnify) à gauche du champ
    -->
    <v-text-field
      v-model="search"
      clearable
      label="Trouver un Pokémon"
      prepend-icon="mdi-magnify"
    />

    <!--
    Grille pour afficher les cartes des Pokémon
      * v-row crée une rangée pour organiser les colonnes des cartes
    -->
    <v-row>
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
        :key="pokemon.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
        xl="2"
        xs="12"
        xxl="2"
      >
        <!--
        composant "maison" de carte de pokémon
          * :pokemon permet de passer le pokémon à afficher au composant via une prop
          * le composant PokemonCard est dans le dossier src/components/PokemonCard.vue
        -->
        <pokemon-card :pokemon="pokemon" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
/*
Importation des dépendances nécessaires
  - computed : permet de créer des propriétés calculées réactives
  - storeToRefs : transforme les propriétés du magasin Pinia en refs réactifs
  - usePokemonStore : accède au magasin des Pokémon
  - PokemonCard : composant pour afficher les détails d'un Pokémon
*/
  import { computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { usePokemonStore } from '@/stores/pokemonStore'
  import PokemonCard from '@/components/PokemonCard.vue'

  /*
Initialisation du magasin Pokémon
  - pokemonStore contient les données et fonctions relatives aux Pokémon
*/
  const pokemonStore = usePokemonStore()

  /*
Extraction des propriétés du magasin
  - storeToRefs transforme pokemons en une donnée réactive (ref) pour faciliter son utilisation
*/
  const { pokemons } = storeToRefs(pokemonStore)

  /*
Définition de la recherche utilisateur comme une propriété réactive
  - v-model est lié à search pour capturer les entrées de recherche
  - defineModel initialise la recherche avec une valeur par défaut vide ('')
*/
  const search = defineModel({ default: '' })

  /*
Propriété calculée pour filtrer les Pokémon en fonction de la recherche
  - Utilise computed pour calculer uniquement si les dépendances (pokemons, search) changent
  - La recherche est convertie en minuscules et espaces inutiles sont supprimés (trim)
  - Si la recherche est vide, retourne tous les Pokémon
  - Sinon, filtre les Pokémon dont le nom contient la chaîne de recherche
*/
  const filteredPokemons = computed(() => {
    const searchQuery = search.value.trim().toLowerCase()
    if (!searchQuery) return pokemons.value
    return pokemons.value.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery)
    )
  })
</script>
