<!--
L'accès à cette page est réservé aux utilisateurs connectés
La protection de la route est gérée par vue-router dans le fichier router/index.js lignes 18 à 42
et par le magasin auth dans le fichier stores/authStore.js
-->
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
          v-model.trim="pokemonData.name"
          label="Nom"
        />
        <!-- Champ pour le niveau du Pokédex -->
        <v-text-field
          v-model.number="pokemonData.level"
          label="Niveau"
          type="number"
        />
        <!-- Champ pour l'image du Pokémon -->
        <v-text-field
          v-model.trim="pokemonData.img"
          class="pb-0 mb-0"
          label="Image du pokémon"
        />
        <!-- Composant pour sélectionner une image de test -->
        <!-- Affecte le nom de l'image sélectionnée à l'attribut pokemonData.img -->
        <SelectImageTest @select="(imageTest) => pokemonData.img = imageTest" />

        <!-- Champ pour la description du Pokémon -->
        <v-textarea
          v-model.trim="pokemonData.description"
          label="Description"
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
          v-if="msgErreur"
          border="start"
          class="mb-6"
          color="warning"
          type="error"
        >
          {{ msgErreur }}
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
        v-model="msgSucces"
        color="success"
      >
        Pokémon créé avec succès !
      </v-snackbar>
    </v-sheet>
  </v-container>
</template>

<script setup>
  import SelectImageTest from '@/components/SelectImageTest.vue'
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
  const msgErreur = ref(null)
  // État pour afficher le message de succès
  const msgSucces = ref(false)

  /**
   * Fonction pour ajouter un Pokémon
   * @async
   * Utilise l'action createPokemon du store pour ajouter un Pokémon
   */
  function addPokemon () {
    // Réinitialise les messages d'erreur et de succès
    msgErreur.value = null
    msgSucces.value = false

    // Appelle l'action createPokemon du store pour ajouter un Pokémon et récupère la réponse
    const reponse = pokemonStore.addPokemon(pokemonData.value)

    // Si erreur lors de l'ajout, affiche le message d'erreur et stoppe la fonction
    if (!reponse.success) {
      // Affiche le message d'erreur
      msgErreur.value = reponse.message
      return
    }

    // Réinitialise les champs du formulaire après un ajout réussi
    pokemonData.value = {
      name: '',
      level: '',
      description: '',
      types: [],
    }
    // Affiche le message de succès
    msgSucces.value = true
    // Stoppe la fonction pour éviter l'exécution du code suivant
  }
</script>

<style scoped>
/* Ajoutez ici des styles spécifiques à cette page si nécessaire */
</style>
