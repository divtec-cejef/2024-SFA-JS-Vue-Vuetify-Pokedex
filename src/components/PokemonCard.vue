<template>
  <!--
  Carte du Pokémon
    * :to crée un lien vers la page de détails du Pokémon en utilisant son id dans l'URL
  -->
  <v-card :to="`/pokemon/${pokemon.id}`">
    <!--
    Image principale du Pokémon
      * alt nom du Pokémon pour l'accessibilité
      * contain ajuste l'image pour qu'elle reste contenue dans la carte
      * min-height="200px" définit une hauteur minimale pour l'image
      * :src utilise l'URL de base pour l'image du Pokémon depuis le store
    -->
    <v-img
      :alt="pokemon.nom"
      contain
      min-height="200px"
      :src="`${pokemonStore.imageUrl}/${pokemon.image}`"
    />

    <!-- Titre de la carte avec le nom du Pokémon -->
    <v-card-title>
      {{ pokemon.nom }}
    </v-card-title>

    <!--
    Sous-titre pour afficher les types du Pokémon
      * class="d-flex align-center" aligne les icônes des types horizontalement et au centre
    -->
    <v-card-subtitle class="d-flex align-center">
      <!--
      Boucle pour afficher chaque type du Pokémon
        * v-for parcourt les types du Pokémon
        * :key définit une clé unique pour chaque type
        * :alt et :title ajoutent le nom du type pour l'accessibilité et l'infobulle
        * class="ma-1" ajoute une marge autour de chaque icône
        * max-height et max-width limitent la taille de chaque icône à 40px
        * :src utilise l'URL de l'icône du type depuis le store
      -->
      <v-img
        v-for="type in pokemon.types"
        :key="type.type_id?.id"
        :alt="type.type_id?.name"
        class="ma-1"
        max-height="40"
        max-width="40"
        :src="pokemonStore.imageUrl + '/' + type.type_id?.image"
        :title="type.type_id?.name"
      />
    </v-card-subtitle>

    <!-- Actions de la carte pour interagir avec le Pokémon -->
    <v-card-actions>
      <!--
      Bouton pour ajouter ou retirer le Pokémon des favoris
        * icon applique un style d'icône au bouton
        * @click.prevent empêche le comportement par défaut (ouvrir la fiche du pokémon) et exécute la fonction de favori
      -->
      <v-btn icon @click.prevent="pokemonStore.toggleFavorite(props.pokemon)">
        <!--
        Icône de favori
          * :color change la couleur en rouge si le Pokémon est dans les favoris
          * Affiche une icône pleine si favori, sinon une icône de cœur vide
        -->
        <v-icon :color="pokemonStore.isFavorite(pokemon) ? 'red' : ''">
          {{ pokemonStore.isFavorite(pokemon) ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </v-btn>

      <!--
      Bouton pour supprimer le Pokémon (affiché seulement si l'utilisateur est authentifié)
        * v-if="pokemonStore.isAuthenticated" affiche ce bouton seulement si l'utilisateur est connecté
        * color="red" applique une couleur rouge pour indiquer une action de suppression
        * icon="mdi-delete" affiche une icône de suppression
        * @click.prevent empêche le comportement par défaut (ouvrir la fiche du pokémon)
          et ouvre la boîte de dialogue de confirmation de suppression
      -->
      <v-btn
        v-if="pokemonStore.isAuthenticated"
        color="red"
        icon="mdi-delete"
        @click.prevent="dialog = true"
      />
    </v-card-actions>

    <!--
    Boîte de dialogue de confirmation pour la suppression du Pokémon
      * v-model="dialog" contrôle l'affichage de la boîte de dialogue
      * max-width limite la largeur de la boîte de dialogue à 400px
      * persistent empêche la fermeture de la boîte de dialogue en cliquant à l'extérieur
    -->
    <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <!--
      Contenu de la boîte de dialogue pour confirmer la suppression
        * prepend-icon ajoute une icône de suppression
        * text affiche un message de confirmation
        * title donne un titre au dialogue
      -->
      <v-card
        prepend-icon="mdi-delete"
        text="Etes-vous sûr de vouloir supprimer ce pokémon ?"
        title="Suppression"
      >
        <!-- Section des actions de la boîte de dialogue -->
        <template #actions>
          <!-- Espace pour aligner les boutons à droite -->
          <v-spacer />
          <!--
          Bouton pour annuler la suppression
            * @click ferme la boîte de dialogue sans supprimer le Pokémon
          -->
          <v-btn @click="dialog = false">
            Annuler
          </v-btn>

          <!--
          Bouton pour confirmer la suppression du Pokémon
            * @click appelle la fonction deletePokemon avec l'id du Pokémon
          -->
          <v-btn @click="deletePokemon(pokemon.id)">
            Supprimer
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
  // Importation du magasin des Pokémon pour accéder aux fonctions et données partagées
  import { usePokemonStore } from '@/stores/pokemonStore'
  const pokemonStore = usePokemonStore()

  // Déclaration des props pour accepter un objet Pokémon
  const props = defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
  })

  // État réactif pour contrôler l'affichage de la boîte de dialogue de suppression
  const dialog = ref(false)

  /*
  Fonction pour supprimer un Pokémon
    - Appelle la fonction deletePokemon dans le store pour supprimer le Pokémon
    - En cas d'erreur, capture et affiche l'erreur dans la console
    - Ferme la boîte de dialogue après la suppression ou si une erreur survient
*/
  async function deletePokemon (id) {
    try {
      await pokemonStore.deletePokemon(id)
    } catch (error) {
      console.error(error)
    } finally {
      dialog.value = false // Fermer la boîte de dialogue après la suppression
    }
  }
</script>
