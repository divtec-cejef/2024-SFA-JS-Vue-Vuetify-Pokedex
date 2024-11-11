<template>
  <v-container>
    <h2>Connexion</h2>
    <v-form @submit.prevent="handleLogin">
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

    <!-- Message de succès ou d'erreur de connexion -->
    <v-alert v-if="loginMessage" :type="loginSuccess ? 'success' : 'error'">
      {{ loginMessage }}
    </v-alert>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { usePokemonStore } from '@/stores/pokemonStore'

  // Initialisation du routeur et du store
  const router = useRouter()
  const pokemonStore = usePokemonStore()

  // Champs du formulaire de connexion
  const loginEmail = ref('')
  const loginPassword = ref('')

  // État pour le message et le statut de succès de la connexion
  const loginMessage = ref(null)
  const loginSuccess = ref(false)

  /**
   * Fonction de connexion
   * @async
   * Utilise l'action login du store pour authentifier l'utilisateur
   */
  const handleLogin = async () => {
    const response = await pokemonStore.login(loginEmail.value, loginPassword.value)
    loginSuccess.value = response.success
    loginMessage.value = response.message

    // Redirection en cas de succès
    if (loginSuccess.value) {
      router.push('/')
    }
  }
</script>

<style scoped>
/* Ajoutez ici des styles spécifiques à cette page si nécessaire */
</style>
