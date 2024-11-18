<template>
  <!-- Conteneur principal affichant les types d'un Pokémon -->
  <div>
    <!--
    Puce pour chaque type de Pokémon
      * v-for : Parcourt le tableau des types associés au Pokémon pour afficher chaque type sous forme de puce.
      * :key="type.id" : Utilise `type.id` comme clé unique pour chaque élément.
      * class="ma-1" : Ajoute une marge uniforme autour de chaque puce.
      * :color : Définit la couleur de la puce en fonction de la propriété `color` du type (valeur par défaut : 'grey').
      * text-color="white" : Rend le texte des puces blanc pour assurer la lisibilité.
    -->
    <v-chip
      v-for="type in thisPokemonTypes"
      :key="type.id"
      class="ma-1"
      :color="type?.color || 'grey'"
      text-color="white"
    >
      <!-- Nom du type ou "Inconnu" si le type est introuvable -->
      {{ type?.name || 'Inconnu' }}
    </v-chip>
  </div>
</template>

<script setup>
/*
Importation des dépendances nécessaires :
- defineProps : Permet de définir les propriétés du composant.
- usePokemonStore : Fournit l'accès au magasin Pinia pour récupérer les informations des types.
*/
  import { defineProps } from 'vue'
  import { usePokemonStore } from '@/stores/pokemonStore'

  // Définition des propriétés du composant
  const props = defineProps({
    pokemon: {
      // Objet représentant un Pokémon, contenant un tableau `types` avec les identifiants des types.
      type: Object,
      required: true, // Propriété obligatoire.
    },
  })

  // Initialisation du magasin Pinia et calcul des types associés au Pokémon
  const pokemonStore = usePokemonStore()
  const thisPokemonTypes = ref(
    props.pokemon.types.map(typeId => pokemonStore.getTypeById(typeId))
  )
</script>

<style scoped>
/*
Styles locaux :
- ma-1 : Classe Vuetify ajoutant une marge uniforme autour des puces.
*/
</style>
