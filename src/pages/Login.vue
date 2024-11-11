<template>
  <v-container>
    <v-sheet class="mx-auto bg-transparent" max-width="400">
      <h1 class="mb-4">Connexion</h1>
      <v-form @submit.prevent="handleLogin">
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
          border="start"
          class="mb-6"
          color="warning"
          text="Mauvais email ou mot de passe !"
        />
        <!-- Bouton de connexion -->
        <v-btn color="primary" size="large" type="submit">Se connecter</v-btn>
      </v-form>
    </v-sheet>

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
