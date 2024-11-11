<template>
  <v-container>
    <v-sheet class="mx-auto bg-transparent" max-width="400">
      <h1 class="mb-4">Connexion</h1>
      <v-form @submit.prevent="login">
        <!-- Champ d'email -->
        <v-text-field
          v-model="loginEmail"
          label="Email"
          required
          type="email"
        />
        <!-- Champ de mot de passe -->
        <v-text-field
          v-model="loginPassword"
          label="Mot de passe"
          required
          type="password"
        />
        <!-- Affichage du message d'erreur en cas d'échec de connexion -->
        <v-alert
          v-if="errorMessage"
          border="start"
          class="mb-6"
          color="warning"
        > {{ errorMessage }}</v-alert>
        <!-- Bouton de connexion -->
        <v-btn
          color="primary"
          :loading="pokemonStore.isLoading"
          size="large"
          type="submit"
        >Se connecter</v-btn>
      </v-form>
    </v-sheet>

  </v-container>
</template>

<script setup>
  import { useRoute, useRouter } from 'vue-router'
  import { ref } from 'vue'
  import { usePokemonStore } from '@/stores/pokemonStore'

  // Récupération du router pour la redirection
  const router = useRouter()
  // Récupération des paramètres de l'URL pour la redirection
  const route = useRoute()

  // Initialisation du store
  const pokemonStore = usePokemonStore()

  // Champs du formulaire de connexion
  const loginEmail = ref('')
  const loginPassword = ref('')

  // État pour le message et le statut de succès de la connexion
  const errorMessage = ref('')

  /**
   * Fonction de connexion
   * @async
   * Utilise l'action login du store pour authentifier l'utilisateur
   */
  const login = async () => {
    const response = await pokemonStore.login(loginEmail.value, loginPassword.value)
    if (response.success) {
      // Rediriger l'utilisateur vers la page précédente ou la page d'accueil
      router.push(route.query.redirect || '/') // route.query.redirect récupère le paramètre d'URL redirect
    } else {
      // Afficher un message d'erreur
      errorMessage.value = response.message
    }
  }
</script>

<style scoped>
/* Ajoutez ici des styles spécifiques à cette page si nécessaire */
</style>
