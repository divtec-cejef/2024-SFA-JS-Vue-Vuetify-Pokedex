<template>
  <!--
  Conteneur principal pour le formulaire d'ajout de Pokémon
    * v-container offre une mise en page fluide et centrée
  -->
  <v-container>
    <!--
    Feuille d'affichage du formulaire, centrée avec une largeur maximale
      * class="mx-auto bg-transparent" centre la feuille et rend le fond transparent
      * max-width="400" limite la largeur à 400px
    -->
    <v-sheet class="mx-auto bg-transparent" max-width="400">
      <!-- Titre de la page -->
      <h1 class="mb-4">Ajouter un Pokémon</h1>

      <!-- Formulaire d'ajout de Pokémon -->
      <v-form @submit.prevent="addPokemon">
        <!-- Champ pour l'ID du Pokédex -->
        <v-text-field
          v-model.number="pokemonData.pokedexId"
          label="ID du Pokédex"
          required
          type="number"
        />
        <!-- Champ pour le slug du Pokémon -->
        <v-text-field
          v-model="pokemonData.slug"
          label="Slug"
          required
        />
        <!-- Champ pour le nom du Pokémon -->
        <v-text-field
          v-model="pokemonData.nom"
          label="Nom du Pokémon"
          required
        />

        <!-- Message d'erreur d'ajout affiché en cas d'échec -->
        <v-alert
          v-if="addError"
          border="start"
          class="mb-6"
          color="warning"
          type="error"
        >
          {{ addError }}
        </v-alert>

        <!-- Bouton pour soumettre le formulaire d'ajout -->
        <v-btn color="primary" type="submit">Ajouter le Pokémon</v-btn>
      </v-form>

      <!-- Notification de succès d'ajout -->
      <v-snackbar
        v-model="addSuccess"
        color="success"
      >
        Pokémon créé avec succès !
      </v-snackbar>
    </v-sheet>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { usePokemonStore } from '@/stores/pokemonStore'

  // Utilisation du store Pokemon
  const pokemonStore = usePokemonStore()

  // Objet contenant les champs du formulaire d'ajout de Pokémon
  const pokemonData = ref({
    pokedexId: null, // ID numérique du Pokédex du Pokémon
    slug: '', // Slug du Pokémon
    nom: '', // Nom du Pokémon
  })

  // État pour gérer les erreurs lors de l'ajout de Pokémon
  const addError = ref(null)
  // État pour afficher le message de succès
  const addSuccess = ref(false)

  /**
   * Fonction pour ajouter un Pokémon
   * @async
   * Utilise l'action createPokemon du store pour ajouter un Pokémon
   */
  const addPokemon = async () => {
    try {
      // Réinitialise les messages d'erreur et de succès avant de soumettre
      addError.value = null
      addSuccess.value = false
      // Appelle la fonction createPokemon du store pour ajouter le Pokémon
      await pokemonStore.createPokemon(pokemonData.value)
      addSuccess.value = true
      // Réinitialise les champs du formulaire après un ajout réussi
      pokemonData.value = { pokedexId: null, slug: '', nom: '' }
    } catch (error) {
      // Enregistre le message d'erreur en cas d'échec de l'ajout
      addError.value = error.message
    }
  }
</script>

<style scoped>
/* Ajoutez ici des styles spécifiques à cette page si nécessaire */
</style>
