<template>
  <!-- Conteneur principal des statistiques -->
  <div class="pokemon-stats">
    <!-- Boucle pour afficher chaque statistique avec son titre et sa barre de progression -->
    <v-list-item v-for="(value, key) in stats" :key="key">
      <!-- Affichage du nom de la statistique et de sa valeur -->
      <v-list-item-title>{{ key.toUpperCase() }}: {{ value }}</v-list-item-title>

      <!-- Barre de progression avec couleur directement liée à la statistique -->
      <v-progress-linear
        :color="statColors[key] || 'grey'"
        height="25"
        :model-value="value"
      >
        <strong>{{ value }}</strong>
      </v-progress-linear>
    </v-list-item>
  </div>
</template>

<script setup>
/**
 * Composant `PokemonStats`
 * Gère l'affichage des statistiques des Pokémon avec des barres de progression colorées.
 */

// Propriétés (props) du composant
  defineProps({
    stats: {
      type: Object, // Objet contenant les statistiques (par ex. : { hp: 45, attack: 60 }).
      required: true, // Les statistiques sont nécessaires pour ce composant.
    },
  })

  /**
   * Couleurs associées aux statistiques des Pokémon.
   * Ces couleurs sont utilisées directement dans le template.
   */
  const statColors = {
    hp: '#FF5959', // Rouge doux pour la santé.
    attack: '#C03028', // Rouge sombre pour l'attaque.
    defense: '#6890F0', // Bleu clair pour la défense.
    speed: '#F08030', // Orange vif pour la vitesse.
    special: '#78C850', // Vert pour les capacités spéciales.
  }
</script>

<style scoped>
/* Styles locaux pour améliorer la présentation */
.pokemon-stats {
  margin-top: 1rem; /* Ajout d'espace au-dessus du conteneur */
}

.v-list-item {
  margin-bottom: 1rem; /* Ajout d'espace entre les statistiques */
}
</style>
