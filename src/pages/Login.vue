<template>
  <v-container>
    <!-- Feuille de connexion centrée avec largeur maximale définie -->
    <v-sheet class="mx-auto bg-transparent" max-width="400">
      <!-- Titre de la page de connexion -->
      <h1 class="mb-4">Connexion</h1>

      <!-- Formulaire de connexion -->
      <v-form @submit.prevent="login">
        <!-- Champ d'email avec validation et accessibilité -->
        <v-text-field
          v-model="loginEmail"
          aria-label="Champ de saisie pour l'email"
          label="Email"
          required
          :rules="[validateEmail]"
          type="email"
        />
        <!-- Champ de mot de passe avec validation et accessibilité -->
        <v-text-field
          v-model="loginPassword"
          aria-label="Champ de saisie pour le mot de passe"
          label="Mot de passe"
          required
          :rules="[validatePassword]"
          type="password"
        />

        <!-- Affichage du message d'erreur général en cas d'échec de connexion -->
        <v-alert
          v-if="errorMessage"
          border="start"
          class="mb-6"
          color="warning"
        >
          {{ errorMessage }}
        </v-alert>

        <!-- Bouton de connexion avec gestion de chargement -->
        <v-btn
          aria-label="Bouton pour se connecter"
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

  // Initialisation du router et de la route
  const router = useRouter()
  const route = useRoute()

  // Initialisation du store
  const pokemonStore = usePokemonStore()

  // Champs du formulaire de connexion
  const loginEmail = ref('')
  const loginPassword = ref('')

  // Message d'erreur en cas d'échec de connexion
  const errorMessage = ref('')

  /**
   * Fonction de connexion
   * Utilise l'action login du store pour authentifier l'utilisateur
   */
  function login () {
    const response = pokemonStore.login(loginEmail.value, loginPassword.value)
    if (response.success) {
      // Rediriger l'utilisateur vers la page précédente ou la page d'accueil
      router.push(route.query.redirect || '/')
      // Réinitialiser les champs après connexion
      loginEmail.value = ''
      loginPassword.value = ''
      errorMessage.value = ''
    } else {
      // Afficher un message d'erreur
      errorMessage.value = response.message
    }
  }

  // Règles de validation pour le champ email
  const validateEmail = email => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email) || 'Veuillez entrer un email valide.'
  }

  // Règles de validation pour le champ mot de passe
  const validatePassword = password => {
    return password.length > 3 || 'Le mot de passe doit comporter au moins 4 caractères.'
  }
</script>

<style scoped>
/* Styles spécifiques pour centrer et styliser la page */
</style>
