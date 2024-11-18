<template>
  <!-- Conteneur principal affichant les types d'un Pokémon -->
  <div>
    <!--
    Puce pour chaque type de Pokémon
      * v-for : Parcourt le tableau des types associés au Pokémon pour afficher chaque type sous forme de puce.
      * :key="type.id" : Utilise `type.id` comme clé unique pour optimiser le rendu.
      * class="ma-1" : Ajoute une marge uniforme autour de chaque puce (1 unité).
      * :color : Définit dynamiquement la couleur de la puce à partir de la propriété `color` du type (valeur par défaut : 'grey').
      * text-color="white" : Rend le texte des puces blanc pour un meilleur contraste.
    -->
    <v-chip
      v-for="type in thisPokemonTypes"
      :key="type.id"
      class="ma-1"
      :color="type?.color || 'grey'"
      text-color="white"
    >
      <!-- Affiche le nom du type ou "Inconnu" si le type est introuvable -->
      {{ type?.name || 'Inconnu' }}
    </v-chip>
  </div>
</template>

<script setup>
/*
Importation des dépendances nécessaires :
- defineProps : Permet de définir les propriétés reçues par le composant.
- usePokemonStore : Fournit l'accès au magasin Pinia pour récupérer les données des types.
*/
  import { computed, defineProps } from 'vue'
  import { usePokemonStore } from '@/stores/pokemonStore'

  // Définition des propriétés du composant
  const props = defineProps({
    pokemon: {
      // Objet représentant un Pokémon. Contient un tableau `types` listant les identifiants des types associés.
      type: Object,
      required: true, // Cette propriété est obligatoire pour le bon fonctionnement du composant.
    },
  })

  // Initialisation du magasin Pinia
  const pokemonStore = usePokemonStore()

  /*
Récupération des types associés au Pokémon
  - Utilise computed pour créer une propriété réactive.
    Ainsi, si les types du Pokémon changent, cette propriété sera mise à jour automatiquement.
  - Parcourt les identifiants des types (`props.pokemon.types`) et récupère leurs données depuis le magasin.
  - Fournit un tableau de types avec leurs propriétés (`name`, `color`, etc.).
*/
  const thisPokemonTypes = computed(() =>
    props.pokemon.types.map(typeId => pokemonStore.getTypeById(typeId))
  )
</script>

<style scoped>
/*
Styles locaux :
- ma-1 : Classe Vuetify ajoutant une marge uniforme autour de chaque puce.
*/
</style>
