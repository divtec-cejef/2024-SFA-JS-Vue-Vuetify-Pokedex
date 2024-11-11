<template>
  <v-container>
    <v-sheet class="mx-auto bg-transparent" max-width="400">
      <h1 class="mb-4">Ajouter un Pokémon</h1>

      <!-- Formulaire d'ajout de Pokémon -->
      <v-form @submit.prevent="addPokemon">
        <v-text-field
          v-model.number="pokemonData.pokedexId"
          label="ID du Pokédex"
          required
          type="number"
        />
        <v-text-field
          v-model="pokemonData.slug"
          label="Slug"
          required
        />
        <v-text-field
          v-model="pokemonData.nom"
          label="Nom du Pokémon"
          required
        />
        <!-- Message d'erreur d'ajout -->
        <v-alert
          v-if="addError"
          border="start"
          class="mb-6"
          color="warning"
          type="error"
        >
          {{ addError }}
        </v-alert>
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
    pokedexId: null, // Assurez-vous qu'il s'agit bien d'un entier
    slug: '',
    nom: '',
  })

  const addError = ref(null)
  const addSuccess = ref(false)

  /**
   * Fonction pour ajouter un Pokémon
   * @async
   * Utilise l'action createPokemon du store pour ajouter un Pokémon
   */
  const addPokemon = async () => {
    try {
      addError.value = null
      addSuccess.value = false
      // Assurez-vous que pokedexId est bien converti en entier
      await pokemonStore.createPokemon(pokemonData.value)
      addSuccess.value = true
      // Réinitialise les champs du formulaire après l'ajout
      pokemonData.value = { pokedexId: null, slug: '', nom: '' }
    } catch (error) {
      addError.value = error.message
    }
  }
</script>

<style scoped>
/* Ajoutez ici des styles spécifiques à cette page si nécessaire */
</style>
