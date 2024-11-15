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
        <!-- Champ pour le nom du Pokémon -->
        <v-text-field
          v-model="pokemonData.name"
          label="Nom"
          required
        />
        <!-- Champ pour le niveau du Pokédex -->
        <v-text-field
          v-model.number="pokemonData.level"
          label="Niveau"
          required
          type="number"
        />

        <!-- Champ pour la description du Pokémon -->
        <v-textarea
          v-model="pokemonData.description"
          label="Description"
          required
        />

        <!-- Groupe de cases à cocher pour les types de Pokémon -->
        <fieldset class="pa-6 mb-6">
          <legend class="font-weight-bold">Types</legend>
          <v-row>
            <v-col
              v-for="type in pokemonStore.types"
              :key="type.id"
              class="pa-0 ma-0"
              cols="4"
            >
              <v-checkbox
                v-model="pokemonData.types"
                cols="2"
                density="compact"
                :label="type.name"
                :value="type.id"
              />
            </v-col>
          </v-row>
        </fieldset>
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
        <v-btn
          color="primary"
          size="large"
          type="submit"
        >
          Ajouter le Pokémon
        </v-btn>
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
    name: null,
    level: '',
    description: '',
    types: [],
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
      await pokemonStore.addPokemon(pokemonData.value)
      addSuccess.value = true
      // Réinitialise les champs du formulaire après un ajout réussi
      pokemonData.value = { name: '', level: '', description: '', types: [] }
    } catch (error) {
      // Enregistre le message d'erreur en cas d'échec de l'ajout
      addError.value = error.message
    }
  }
</script>

<style scoped>
/* Ajoutez ici des styles spécifiques à cette page si nécessaire */
</style>
