<template>
  <!-- Conteneur principal pour la page des favoris -->
  <v-container>
    <!--
    Titre de la page
      * class="mb-8 text-center" ajoute une Marge en Bas de 8 unités et centre le texte
    -->
    <h1 class="mb-8 text-center">Mes Pokémons Favoris</h1>

    <!--
    Grille pour afficher les cartes des Pokémon favoris
      * v-if="getFavorites.length > 0" affiche la grille uniquement si la liste des favoris n'est pas vide
    -->
    <v-row v-if="getFavorites.length > 0">
      <!--
      Boucle pour afficher chaque Pokémon favori
       * v-for permet de parcourir les pokémons favoris
      * :key permet de donner une clé unique à chaque pokémon
      * cols définit la taille par défaut d'une colonne sur un maximum de 12 cols
        si on met cols="6" un colonne occupe au maximum la moitié de la grille (12/6=2)
        Ici on met cols="12" pour que chaque carte puisse occuper toute la largeur de la grille
      * xl, lg, md, sm, xs permettent de définir le nombre de colonnes max pour chaque taille d'écran
        par exmple lg="3" signifie que sur grand écran on affiche 4 cartes par ligne (12/3=4)
        https://vuetifyjs.com/en/components/grids/
      -->
      <v-col
        v-for="pokemon in getFavorites"
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
        Composant de carte pour afficher les informations du Pokémon
          * :pokemon transmet l'objet Pokémon au composant PokemonCard
        -->
        <pokemon-card :pokemon="pokemon" />
      </v-col>
    </v-row>

    <!--
    Alerte informative affichée lorsque la liste des favoris est vide
      * v-else affiche cette alerte lorsque la liste des favoris est vide
      * type="info" applique le style informatif à l'alerte
      * class="text-center" centre le texte de l'alerte
    -->
    <v-alert v-else type="info">
      Vous n'avez pas encore de Pokémon favoris.
      <!--
      Bouton pour retourner à la liste des Pokémon
        * @click navigue vers la liste des Pokémon
      -->
      <v-btn to="/">
        Retourner à la liste des Pokémon
      </v-btn>
    </v-alert>
  </v-container>
</template>

<script setup>
// Importation des outils et composants nécessaires
  import { usePokemonStore } from '@/stores/pokemonStore'
  import PokemonCard from '@/components/PokemonCard.vue'

  // Récupération du magasin des Pokémon
  const pokemonStore = usePokemonStore()

  // Récupération de la liste des favoris via la méthode getFavorites du magasin
  const { getFavorites } = pokemonStore
</script>
