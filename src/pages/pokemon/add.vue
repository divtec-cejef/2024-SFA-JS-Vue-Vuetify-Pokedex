<template>
  <v-container>
    <h1>Ajouter un Pokémon</h1>

    <!-- Formulaire de connexion -->
    <v-form v-if="!isAuthenticated" @submit.prevent="handleLogin">
      <v-text-field
        v-model="loginEmail"
        label="Email"
        required
        type="email"
      />
      <v-text-field
        v-model="loginPassword"
        label="Mot de passe"
        required
        type="password"
      />
      <v-btn color="primary" type="submit">Se connecter</v-btn>
    </v-form>

    <!-- Message d'erreur de connexion -->
    <v-alert v-if="loginError" type="error">
      {{ loginError }}
    </v-alert>

    <!-- Formulaire d'ajout de Pokémon -->
    <v-form v-if="isAuthenticated" @submit.prevent="handleAddPokemon">
      <v-text-field
        v-model="pokedexId"
        label="ID du Pokédex"
        required
        type="number"
      />
      <v-text-field
        v-model="slug"
        label="Slug"
        required
      />
      <v-text-field
        v-model="nom"
        label="Nom du Pokémon"
        required
      />
      <v-btn color="primary" type="submit">Ajouter le Pokémon</v-btn>
    </v-form>

    <!-- Message d'erreur d'ajout -->
    <v-alert v-if="addError" type="error">
      {{ addError }}
    </v-alert>

    <!-- Message de succès d'ajout -->
    <v-alert v-if="addSuccess" type="success">
      Pokémon ajouté avec succès !
    </v-alert>
  </v-container>
</template>

<script>
  import { usePokemonStore } from '@/stores/pokemonStore'
  import { computed, ref } from 'vue'

  export default {
    setup () {
      // Utilisation du store Pokemon
      const pokemonStore = usePokemonStore()

      // Champs du formulaire de connexion
      const loginEmail = ref('')
      const loginPassword = ref('')
      const loginError = ref(null)

      // Champs du formulaire d'ajout de Pokémon
      const pokedexId = ref('')
      const slug = ref('')
      const nom = ref('')
      const addError = ref(null)
      const addSuccess = ref(false)

      // Vérification de l'authentification
      const isAuthenticated = computed(() => pokemonStore.isAuthenticated)

      /**
       * Fonction de connexion
       * @async
       * Utilise l'action login du store pour authentifier l'utilisateur
       */
      const handleLogin = async () => {
        try {
          loginError.value = null
          await pokemonStore.login(loginEmail.value, loginPassword.value)
          if (!pokemonStore.isAuthenticated) {
            loginError.value = 'Échec de la connexion. Vérifiez vos identifiants.'
          }
        } catch (error) {
          loginError.value = 'Une erreur est survenue lors de la connexion.'
        }
      }

      /**
       * Fonction pour ajouter un Pokémon
       * @async
       * Utilise l'action createPokemon du store pour ajouter un Pokémon
       */
      const handleAddPokemon = async () => {
        try {
          addError.value = null
          addSuccess.value = false
          await pokemonStore.createPokemon({
            pokedexId: parseInt(pokedexId.value),
            slug: slug.value,
            nom: nom.value,
          })
          addSuccess.value = true
          // Réinitialise les champs du formulaire après l'ajout
          pokedexId.value = ''
          slug.value = ''
          nom.value = ''
        } catch (error) {
          addError.value = 'Une erreur est survenue lors de l\'ajout du Pokémon.'
        }
      }

      return {
        loginEmail,
        loginPassword,
        loginError,
        isAuthenticated,
        handleLogin,
        pokedexId,
        slug,
        nom,
        addError,
        addSuccess,
        handleAddPokemon,
      }
    },
  }
</script>

<style scoped>
/* Ajoutez ici des styles spécifiques à cette page si nécessaire */
</style>
