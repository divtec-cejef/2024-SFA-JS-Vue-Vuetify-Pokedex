<template>
  <!--
  Indicateur de chargement lorsque les données du Pokémon sont en cours de chargement
    * v-if="pokemonStore.isLoading" affiche ce composant uniquement si le chargement est en cours
    * class="text-center" centre le spinner horizontalement
    * cols="12" occupe toute la largeur disponible
  -->
  <v-col v-if="pokemonStore.isLoading" class="text-center" cols="12">
    <v-progress-circular
      class="mx-auto"
      color="primary"
      indeterminate
      size="64"
    />
  </v-col>

  <!--
  Conteneur principal affichant les détails du Pokémon une fois chargé
    * v-if="selectedPokemon" ne s'affiche que si selectedPokemon est défini
  -->
  <v-container v-if="selectedPokemon">
    <v-card>
      <!--
      Image principale du Pokémon
        * contain ajuste l'image pour qu'elle reste contenue dans la zone définie
        * height="300px" fixe la hauteur de l'image
        * :src utilise l'URL de base du store pour charger l'image du Pokémon
      -->
      <v-img contain height="300px" :src="`${pokemonStore.imageUrl}/${selectedPokemon.image}`" />

      <!-- Titre de la carte avec le nom du Pokémon -->
      <v-card-title>{{ selectedPokemon.nom }}</v-card-title>

      <!--
      Sous-titre affichant les types du Pokémon et son niveau
        * class="d-flex align-center" aligne horizontalement et centre les éléments
      -->
      <v-card-subtitle class="d-flex align-center">
        <span>Type:</span>
        <!--
        Boucle pour afficher chaque type du Pokémon
          * v-for parcourt les types de selectedPokemon
          * :key définit une clé unique pour chaque type
          * :alt et :title ajoutent le nom du type pour l'accessibilité
          * class="ma-1" ajoute une marge autour de chaque icône de type
          * max-height et max-width limitent la taille de chaque icône à 30px
          * :src utilise l'URL de l'icône du type depuis le store
        -->
        <v-img
          v-for="type in selectedPokemon.types"
          :key="type.type_id.id"
          :alt="`Type ${type.type_id.name}`"
          class="ma-1"
          max-height="30"
          max-width="30"
          :src="`${pokemonStore.imageUrl}/${type.type_id.image}`"
        />
        | Niveau: {{ selectedPokemon.generation }}
      </v-card-subtitle>

      <!--
      Section des statistiques du Pokémon
        * v-list-item-title affiche le titre et la valeur de chaque statistique
        * v-progress-linear visualise chaque statistique avec une couleur spécifique
      -->
      <v-card-text>
        <h3>Stats</h3>
        <v-list-item>
          <v-list-item-title>HP: {{ selectedPokemon.pointsDeVie }}</v-list-item-title>
          <v-progress-linear color="green" height="25" :model-value="selectedPokemon.pointsDeVie">
            <strong>{{ selectedPokemon.pointsDeVie }}</strong>
          </v-progress-linear>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>ATTACK: {{ selectedPokemon.attaque }}</v-list-item-title>
          <v-progress-linear color="red" height="25" :model-value="selectedPokemon.attaque">
            <strong>{{ selectedPokemon.attaque }}</strong>
          </v-progress-linear>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>DEFENSE: {{ selectedPokemon.defense }}</v-list-item-title>
          <v-progress-linear color="blue" height="25" :model-value="selectedPokemon.defense">
            <strong>{{ selectedPokemon.defense }}</strong>
          </v-progress-linear>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>SPEED: {{ selectedPokemon.vitesse }}</v-list-item-title>
          <v-progress-linear color="yellow" height="25" :model-value="selectedPokemon.vitesse">
            <strong>{{ selectedPokemon.vitesse }}</strong>
          </v-progress-linear>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>SPECIAL ATTACK: {{ selectedPokemon.attaqueSpeciale }}</v-list-item-title>
          <v-progress-linear color="purple" height="25" :model-value="selectedPokemon.attaqueSpeciale">
            <strong>{{ selectedPokemon.attaqueSpeciale }}</strong>
          </v-progress-linear>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>SPECIAL DEFENSE: {{ selectedPokemon.defenseSpeciale }}</v-list-item-title>
          <v-progress-linear color="teal" height="25" :model-value="selectedPokemon.defenseSpeciale">
            <strong>{{ selectedPokemon.defenseSpeciale }}</strong>
          </v-progress-linear>
        </v-list-item>
      </v-card-text>

      <!--
      Actions de la carte
        * Inclut un bouton pour ajouter le Pokémon aux favoris et un bouton de retour
      -->
      <v-card-actions>
        <!--
        Bouton pour ajouter ou retirer le Pokémon des favoris
          * icon applique un style d'icône
          * @click.toggle appelle toggleFavorite pour changer l'état de favori
          * :color change l'icône en rouge si le Pokémon est favori
        -->
        <v-btn icon @click="pokemonStore.toggleFavorite(selectedPokemon)">
          <v-icon :color="pokemonStore.isFavorite(selectedPokemon) ? 'red' : ''">
            {{ pokemonStore.isFavorite(selectedPokemon) ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>

        <!--
        Bouton pour retourner à la liste du Pokédex
          * to="/" redirige vers la page d'accueil
        -->
        <v-btn to="/">Retour au Pokédex</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { usePokemonStore } from '@/stores/pokemonStore'

  // Récupération de la route active pour accéder aux paramètres
  const route = useRoute()
  const pokemonStore = usePokemonStore()

  // Extraction de selectedPokemon du store en tant que donnée réactive
  const { selectedPokemon } = storeToRefs(pokemonStore)

  /*
Chargement du Pokémon à l'affichage du composant
  - Si le chargement n'est pas en cours, appelle directement selectPokemon avec l'ID de la route
  - Sinon, utilise un watcher pour attendre la fin du chargement et sélectionner le Pokémon
*/
  onMounted(() => {
    if (!pokemonStore.isLoading) {
      pokemonStore.selectPokemon(parseInt(route.params.id))
    } else {
      // Utilise un watcher pour appeler selectPokemon une fois le chargement terminé
      watch(
        () => pokemonStore.isLoading,
        isLoading => {
          if (!isLoading) {
            pokemonStore.selectPokemon(parseInt(route.params.id))
          }
        }
      )
    }
  })
</script>
