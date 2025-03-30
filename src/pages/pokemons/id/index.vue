<template>
  <!--
  Conteneur principal pour les détails du Pokémon
    * v-container : Composant Vuetify pour fournir un conteneur réactif centré.
    * v-if="selectedPokemon" : Directive conditionnelle pour afficher le conteneur uniquement si un Pokémon est sélectionné.
  -->
  <v-container v-if="selectedPokemon">
    <!--
    Carte contenant les informations et l'image du Pokémon
      * v-card : Composant Vuetify pour créer une structure de carte stylisée.
      * class="pt-4" : Ajoute un padding en haut de la carte pour espacer le contenu (4 * 4px = 16px).
    -->
    <v-card class="pt-4">
      <!--
      Image du Pokémon ou image par défaut si aucune image n'est disponible
        * v-img : Composant Vuetify pour afficher une image.
        * v-if="selectedPokemon.img" : Directive conditionnelle pour vérifier si une image est disponible.
        * contain : Ajuste l'image pour qu'elle soit entièrement contenue dans le conteneur.
        * height="300px" : Fixe une hauteur de 300px pour l'image.
        * :src="`/images/${selectedPokemon.img}`" : Génère dynamiquement le chemin de l'image du Pokémon.
      -->
      <v-img v-if="selectedPokemon.img" contain height="300px" :src="`/images/${selectedPokemon.img}`" />
      <!--
      Image par défaut affichée lorsque l'image du Pokémon n'est pas disponible.
        * src="/images/pokeball.png" : Chemin statique vers l'image par défaut.
      -->
      <v-img v-else contain height="300px" src="/images/pokeball.png" />

      <!--
      Titre de la carte affichant le nom du Pokémon
        * v-card-title : Composant Vuetify pour afficher un titre stylisé dans la carte.
      -->
      <v-card-title>{{ selectedPokemon.name }}</v-card-title>

      <!--
      Sous-titre de la carte contenant des informations supplémentaires
        * v-card-subtitle : Composant Vuetify pour afficher un sous-titre dans la carte.
      -->
      <v-card-subtitle>
        <!-- Niveau du Pokémon -->
        <div class="mb-2">Niveau : {{ selectedPokemon.level }}</div>
        <!--
        Types du Pokémon affichés sous forme de puces
          * Composant PokemonTypesChips personnalisé pour afficher les types.
          * class="mb-2" : Ajoute une marge inférieure de 8px (2 * 4px).
        -->
        <div class="mb-2">Types: <pokemon-types-chips :pokemon="selectedPokemon" /></div>
      </v-card-subtitle>

      <!--
      Texte principal contenant la description et les statistiques du Pokémon
        * v-card-text : Composant Vuetify pour une zone de texte dans la carte.
      -->
      <v-card-text>
        <!-- Description du Pokémon -->
        <p>{{ selectedPokemon.description }}</p>
        <!--
        Séparateur visuel entre la description et les statistiques
          * v-divider : Composant Vuetify pour ajouter une ligne horizontale.
          * class="my-3" : Ajoute une marge verticale de 12px (3 * 4px) en haut et en bas.
        -->
        <v-divider class="my-3" />
        <!--
        Section des statistiques
          * Utilise le composant PokemonStats pour afficher les statistiques.
          * :stats : Passe les statistiques du Pokémon en tant que propriété réactive.
        -->
        <h3>Stats</h3>
        <pokemon-stats v-if="selectedPokemon.stats" :stats="selectedPokemon.stats" />
      </v-card-text>

      <!--
      Actions de la carte
        * v-card-actions : Composant Vuetify pour afficher des actions dans la carte.
      -->
      <v-card-actions>
        <!--
        Bouton pour ajouter/retirer le Pokémon des favoris
          * v-btn : Composant Vuetify pour créer un bouton.
          * icon : Style de bouton en mode icône.
          * @click="toggleFavorite(selectedPokemon)" : Ajoute ou retire le Pokémon des favoris lorsque le bouton est cliqué.
        -->
        <v-btn icon @click="toggleFavorite(selectedPokemon)">
          <!--
          Icône représentant l'état de favori
            * v-icon : Composant Vuetify pour afficher une icône.
            * :color : Change la couleur de l'icône en rouge si le Pokémon est favori.
            * {{ ... }} : Affiche une icône pleine ou vide en fonction de l'état.
          -->
          <v-icon :color="isFavorite(selectedPokemon) ? 'red' : ''">
            {{ isFavorite(selectedPokemon) ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>
        <!--
        Bouton de navigation pour revenir au Pokédex
          * to="/" : Redirige vers la route racine lorsque cliqué.
        -->
        <v-btn to="/">Retour au Pokédex</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
  /*
  Importation des dépendances
  */
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { usePokemonStore } from '@/stores/pokemonStore'
  import PokemonTypesChips from '@/components/PokemonTypesChips.vue'
  import PokemonStats from '@/components/PokemonStats.vue'

  // Initialisation des outils de navigation et du magasin Pinia
  const router = useRouter() // Récupère le routeur pour la navigation
  const route = useRoute() // Récupère les informations de la route actuelle
  const pokemonStore = usePokemonStore() // Récupère le magasin des Pokémon
  // Récupération des actions et méthodes du magasin des Pokémon
  const { toggleFavorite, isFavorite, getPokemonById } = pokemonStore

  // Pokémon sélectionné pour afficher les détails
  const selectedPokemon = ref(null)
  /*
  Chargement du Pokémon à l'initialisation du composant
    - Si l'ID ne correspond à aucun Pokémon, redirection vers une page 404.
  */
  onMounted(() => {
    // Le nom de ce fichier pokemon/[id].vue créer une route dynamique avec un paramètre `id`
    // route.params.id permet de récupérer la valeur de l'ID dans l'URL
    // Par exemple, pour l'URL `/pokemon/25-pika`, route.params.id vaudra `25-pika`
    const idPokemon = route.params.id
    // Vérification et récupération du Pokémon avec l'ID fourni
    selectedPokemon.value = getPokemonById(idPokemon)
    // Si le Pokémon n'existe pas, redirection vers une page 404
    if (!selectedPokemon.value) {
      router.push('/404') // Redirection en cas d'ID invalide
    }
  })
</script>

<style scoped>
  /* Animation pour le battement du cœur */
.mdi-heart {
  /* L'animation 'heartbeat' est définie dans le fichier global src/style/styles.css */
  animation: heartbeat 1s ease-in-out;
}

/* Animation pour la suppression des favoris */
.mdi-heart-outline {
  /* L'animation 'shrink' est définie dans le fichier global src/style/styles.css */
  animation: shrink 0.6s ease-in-out;
}
</style>
