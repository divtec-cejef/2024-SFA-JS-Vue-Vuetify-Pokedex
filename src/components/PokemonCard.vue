<template>
  <!--
  Carte Pokémon cliquable qui redirige vers une page de détails
    * :to utilise un lien dynamique basé sur l'identifiant unique du Pokémon (pokemon.id)
    *  pt-4 ajoute un padding en haut de la carte pour l'espacement
  -->
  <v-card class="pt-4" :to="`/pokemon/${pokemon.id}`">
    <!--
    Image du Pokémon
      * contain ajuste l'image pour être entièrement contenue dans la zone définie
      * height="200px" fixe la hauteur de l'image pour un affichage uniforme
      * :src charge dynamiquement l'image à partir du chemin 'images' et du nom de fichier du Pokémon
    -->
    <v-img v-if="pokemon.img" contain height="200px" :src="`images/${pokemon.img}`" />
    <v-img v-else contain height="200px" src="/images/pokeball.png" />

    <!--
    Titre de la carte affichant le nom du Pokémon
      * Utilise une interpolation Vue pour afficher pokemon.name
    -->
    <v-card-title>{{ pokemon.name }}</v-card-title>

    <!-- Sous-titre de la carte contenant les informations supplémentaires -->
    <v-card-subtitle>
      <!--
      Composant affichant tous les types du Pokémon sous forme de puces
        * :pokemon passe l'objet Pokémon complet en tant que propriété au composant enfant
      -->
      <pokemon-types-chips :pokemon="pokemon" />

      <!--
      Texte indiquant le niveau du Pokémon
        * Niveau affiché avec une structure texte simple
      -->
      <v-card-text>Level: {{ pokemon.level }}</v-card-text>

      <!--
      Actions de la carte : inclut un bouton pour ajouter/enlever des favoris
        * Appelle une fonction du magasin pour basculer l'état de favori
      -->
      <v-card-actions>
        <!--
        Bouton icône pour basculer l'état de favori du Pokémon
          * @click.prevent empêche l'action par défaut et appelle pokemonStore.toggleFavorite
        -->
        <v-btn icon @click.prevent="pokemonStore.toggleFavorite(pokemon)">
          <!--
          Icône dynamique affichant un cœur plein ou vide selon l'état de favori
            * :color applique la couleur rouge si le Pokémon est marqué comme favori
            * Vérifie l'état via pokemonStore.isFavorite
          -->
          <v-icon :color="pokemonStore.isFavorite(pokemon) ? 'red' : ''">
            {{ pokemonStore.isFavorite(pokemon) ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card-subtitle>
  </v-card>
</template>

<script setup>
  /*
  Importation des dépendances nécessaires
    - PokemonTypesChips : Composant enfant utilisé pour afficher les types d'un Pokémon
    - usePokemonStore : Magasin Pinia pour gérer les données et interactions des Pokémon
  */
  import PokemonTypesChips from '@/components/PokemonTypesChips.vue'
  import { usePokemonStore } from '@/stores/pokemonStore'

  // Initialisation du magasin Pokémon
  const pokemonStore = usePokemonStore()

  /*
  Définition des propriétés attendues par le composant
    - pokemon : Objet représentant un Pokémon
      * type Object : Vérifie que la propriété est un objet
      * required : Rend cette propriété obligatoire pour le bon fonctionnement du composant
  */
  defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
  })
</script>

<style scoped>
/* Animation pour le battement du cœur */
.mdi-heart {
  animation: heartbeat 1s ease-in-out;
}

@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.5);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(2);
  }
}

/* Animation pour la suppression des favoris */
.mdi-heart-outline {
  animation: shrink 0.6s ease-in-out;
}

@keyframes shrink {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.1);
  }
  100% {
    transform: scale(1);
  }
}

</style>
