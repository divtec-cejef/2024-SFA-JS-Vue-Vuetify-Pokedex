<template>
  <!--
  Conteneur principal affichant les détails d'un Pokémon
    * v-container : Fournit un conteneur réactif pour le contenu.
  -->
  <v-container>
    <!--
    Carte principale du Pokémon
      * v-card : Fournit une mise en page structurée et stylisée pour les détails.
    -->
    <v-card>
      <!--
      Image du Pokémon
        * v-img : Affiche une image contenue dans un conteneur.
        * :src : Génère dynamiquement le chemin de l'image à partir de `selectedPokemon.img`.
        * contain : Ajuste l'image pour qu'elle s'inscrive dans le conteneur.
      -->
      <v-img contain height="300px" :src="`/images/${selectedPokemon.img}`" />

      <!--
      Titre de la carte affichant le nom du Pokémon
        * v-card-title : Définit un titre stylisé pour la carte.
      -->
      <v-card-title>{{ selectedPokemon.name }}</v-card-title>

      <!--
      Sous-titre de la carte contenant des informations supplémentaires
        * Niveau et types du Pokémon.
      -->
      <v-card-subtitle>
        <div class="mb-2">Niveau : {{ selectedPokemon.level }}</div>
        <!--
        Types du Pokémon
          * Utilise le composant PokemonTypesChips pour afficher les types sous forme de puces.
        -->
        <div class="mb-2">Types: <pokemon-types-chips :pokemon="selectedPokemon" /></div>
      </v-card-subtitle>

      <!--
      Texte principal de la carte
        * Affiche la description et les statistiques du Pokémon.
      -->
      <v-card-text>
        <!-- Description du Pokémon -->
        <p>{{ selectedPokemon.description }}</p>

        <!--
        Séparateur visuel entre la description et les statistiques
          * v-divider : Barre horizontale avec un espacement vertical (my-3).
        -->
        <v-divider class="my-3" />

        <!--
        Section des statistiques
          * Liste des statistiques du Pokémon.
          * v-list-item : Affiche chaque statistique sous forme d'élément de liste.
        -->
        <h3>Stats</h3>
        <v-list-item v-for="(value, key) in selectedPokemon.stats" :key="key">
          <!-- Titre de la statistique avec sa valeur -->
          <v-list-item-title>{{ key.toUpperCase() }}: {{ value }}</v-list-item-title>
          <!-- Barre de progression représentant visuellement la valeur de la statistique -->
          <v-progress-linear
            :color="pokemonStore.getStatColor(key)"
            height="25"
            :model-value="value"
          >
            <strong>{{ value }}</strong>
          </v-progress-linear>
        </v-list-item>
      </v-card-text>

      <!--
      Actions de la carte
        * Inclut un bouton pour ajouter/enlever des favoris et un bouton pour revenir au Pokédex.
      -->
      <v-card-actions>
        <!--
        Bouton pour basculer l'état de favori du Pokémon
          * toggleFavorite : Ajoute ou retire le Pokémon des favoris.
          * v-icon : Affiche une icône de cœur pleine ou vide selon l'état.
        -->
        <v-btn icon @click="toggleFavorite(selectedPokemon)">
          <v-icon :color="isFavorite(selectedPokemon) ? 'red' : ''">
            {{ isFavorite(selectedPokemon) ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>
        <!-- Bouton pour revenir au Pokédex -->
        <v-btn to="/">Retour au Pokédex</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
/*
Importation des dépendances nécessaires
*/
  import { computed, onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { usePokemonStore } from '@/stores/pokemonStore'
  import PokemonTypesChips from '@/components/PokemonTypesChips.vue'

  // Initialisation du routeur Vue Router
  const router = useRouter()
  const route = useRoute()

  // Initialisation du magasin Pinia
  const pokemonStore = usePokemonStore()

  // Extraction des propriétés réactives du magasin
  const { selectedPokemon } = storeToRefs(pokemonStore)
  const { toggleFavorite, isFavorite, selectPokemonById } = pokemonStore

  // Récupère l'ID du Pokémon depuis les paramètres de la route.
  const pokemonId = computed(() => route.params.id)

  /*
  Hook onMounted
    - Sélectionne le Pokémon correspondant à l'ID extrait de la route.
    - Redirige vers une page 404 si le Pokémon n'existe pas.
  */
  onMounted(() => {
    // Sélectionne le Pokémon correspondant à l'ID
    const pokemonExists = selectPokemonById(pokemonId.value)
    // Si le Pokémon n'existe pas, redirige vers une page 404
    if (!pokemonExists) {
      router.push('/404') // Redirection en cas d'erreur
    }
  })
</script>
