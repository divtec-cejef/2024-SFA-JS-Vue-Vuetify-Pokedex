<template>
  <!--
  Carte Pokémon cliquable redirigeant vers une page de détails.
    * v-card : Composant Vuetify pour créer une carte stylisée.
    * :to : Génère dynamiquement un lien basé sur l'identifiant unique du Pokémon (`pokemon.id`).
    * class="pt-4" : Ajoute un padding en haut (4 unités) pour espacer le contenu.
  -->
  <v-card class="pt-4" :to="`/pokemons/${pokemon.id}`">
    <!--
    Image du Pokémon ou image par défaut si aucune image n'est fournie.
      * v-img : Composant Vuetify pour afficher des images avec mise à l'échelle.
      * v-if/v-else : Affiche une image spécifique si elle existe, sinon une image de Pokéball par défaut.
      * contain : Adapte l'image pour qu'elle soit entièrement visible dans le conteneur.
      * height="200px" : Définit une hauteur fixe pour une présentation uniforme.
      * :src : Lien dynamique vers l'image.
    -->
    <v-img v-if="pokemon.img" contain height="200px" :src="getImageUrl(pokemon.img)" />
    <v-img v-else contain height="200px" src="/images/pokeball.png" />

    <!--
    Titre de la carte affichant le nom du Pokémon.
      * v-card-title : Composant Vuetify pour styliser un titre dans une carte.
      * Interpolation Vue : Affiche dynamiquement le nom du Pokémon.
    -->
    <v-card-title>{{ pokemon.name }}</v-card-title>

    <!--
    Sous-titre de la carte contenant des informations supplémentaires.
      * v-card-subtitle : Composant Vuetify pour styliser une section sous le titre principal.
    -->
    <v-card-subtitle>
      <!--
      Composant personnalisé pour afficher les types du Pokémon sous forme de puces.
        * :pokemon : Passe l'objet Pokémon en tant que prop au composant enfant `pokemon-types-chips`.
      -->
      <pokemon-types-chips :pokemon="pokemon" />

      <!--
      Niveau du Pokémon affiché sous forme de texte simple.
        * v-card-text : Composant Vuetify pour afficher du texte dans une carte.
      -->
      <v-card-text>Level: {{ pokemon.level }}</v-card-text>

      <!--
      Section des actions de la carte (ajouter aux favoris, supprimer).
        * v-card-actions : Composant Vuetify pour organiser les actions associées à la carte.
      -->
      <v-card-actions>
        <!--
        Bouton pour ajouter ou retirer le Pokémon des favoris.
          * v-btn : Bouton Vuetify avec une icône intégrée.
          * icon : Style de bouton compact avec une icône.
          * @click.prevent : Empêche l'action par défaut et appelle `pokemonStore.toggleFavorite`.
        -->
        <v-btn icon @click.prevent="pokemonStore.toggleFavorite(pokemon)">
          <!--
          Icône dynamique selon l'état de favori du Pokémon.
            * v-icon : Composant Vuetify pour afficher des icônes.
            * :color : Change dynamiquement la couleur en rouge si le Pokémon est marqué comme favori.
            * Interpolation Vue : Alterne entre `mdi-heart` et `mdi-heart-outline`.
          -->
          <v-icon :color="pokemonStore.isFavorite(pokemon) ? 'red' : ''">
            {{ pokemonStore.isFavorite(pokemon) ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>

        <!--
        Bouton pour demander confirmation avant de supprimer le Pokémon.
          * v-if : Affiche le bouton uniquement si l'utilisateur est authentifié.
          * v-btn : Bouton Vuetify avec une icône intégrée.
          * @click.prevent : Empêche l'action par défaut et appelle `confirmDelete`.
        -->
        <v-btn
          v-if="authStore.isAuthenticated"
          icon
          @click.prevent="confirmDelete(pokemon.id)"
        >
          <!-- Icône pour indiquer la suppression -->
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card-subtitle>
  </v-card>

  <!--
  Dialog de confirmation pour supprimer un Pokémon.
    * v-dialog : Composant Vuetify pour afficher une boîte de dialogue modale.
    * v-model : Liaison bidirectionnelle pour gérer l'affichage de la boîte de dialogue.
    * max-width="400" : Limite la largeur de la boîte de dialogue à 400px.
  -->
  <v-dialog v-model="dialogDelete" max-width="400">
    <!-- Contenu de la boîte de dialogue -->
    <v-card>
      <!-- Titre de la boîte de dialogue -->
      <v-card-title class="text-h6">Confirmer la suppression</v-card-title>
      <!-- Message de confirmation -->
      <v-card-text>
        Êtes-vous sûr de vouloir supprimer ce Pokémon ?
      </v-card-text>
      <!-- Actions de la boîte de dialogue -->
      <v-card-actions>
        <!--
        Bouton pour annuler la suppression.
          * color="primary" : Bouton avec un style bleu.
          * text : Bouton textuel.
          * @click : Ferme la boîte de dialogue en mettant `dialogDelete` à `false`.
        -->
        <v-btn color="primary" text @click="dialogDelete = false">Annuler</v-btn>
        <!--
        Bouton pour confirmer la suppression.
          * color="red" : Bouton avec un style rouge pour indiquer une action dangereuse.
          * text : Bouton textuel.
          * @click : Appelle `pokemonStore.deletePokemon` avec l'identifiant du Pokémon à supprimer.
        -->
        <v-btn color="red" text @click="pokemonStore.deletePokemon(idPokemonToDelete)">
          Supprimer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import PokemonTypesChips from '@/components/PokemonTypesChips.vue'
  import { usePokemonStore } from '@/stores/pokemonStore'
  import { useAuthStore } from '@/stores/authStore'
  import { getImageUrl } from '@/utils/imageUrl'
  import { ref } from 'vue'

  // Initialisation des magasins Pinia
  const pokemonStore = usePokemonStore() // Gère les données des Pokémon.
  const authStore = useAuthStore() // Gère l'état d'authentification.

  // Props attendues pour le composant
  defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
  })

  // Gestion de l'affichage de la boîte de dialogue et de l'identifiant du Pokémon à supprimer
  const dialogDelete = ref(false) // État de la boîte de dialogue
  const idPokemonToDelete = ref(null) // Identifiant du Pokémon à supprimer

  // Fonction pour afficher le dialog de confirmation avant suppression
  function confirmDelete (id) {
    idPokemonToDelete.value = id // Enregistre l'identifiant du Pokémon à supprimer.
    dialogDelete.value = true // Affiche le dialog.
  }
</script>

<style scoped>
/* Animation pour l'icône de favori */
.mdi-heart {
  animation: heartbeat 1s ease-in-out;
}

/* Animation pour l'icône de suppression */
.mdi-heart-outline {
  animation: shrink 0.6s ease-in-out;
}
</style>
