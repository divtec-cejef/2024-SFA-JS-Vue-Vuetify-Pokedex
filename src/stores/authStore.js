import { defineStore } from 'pinia'

/*
Ce magasin n'utilise pas de véritable API pour l'authentification.
Il utilise des données factices pour simuler la connexion et la déconnexion.
Ces données sont utilisées pour illustrer le fonctionnement d'un magasin d'authentification.
En pratique, vous devriez utiliser une API d'authentification réelle.
*/

// Utilisateur factice pour la simulation de connexion
const utilisateurFactice = {
  email: 'Sacha@pokemon.com',
  name: 'Sacha Ketchum',
}
// Mot de passe factice pour la simulation de connexion
const passwordFactice = 'pika'
// Jeton factice pour la simulation de connexion
// Ce jeton est généré par le serveur d'authentification après une connexion réussie et est utilisé pour authentifier les requêtes ultérieures.
const tokenFactice = '0b042934e5df02c9786efb364d946e64'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  actions: {
    login (email, password) {
      if (email === utilisateurFactice.email && password === passwordFactice) {
        this.user = utilisateurFactice
        this.token = tokenFactice
        return {
          success: true,
          message: 'Connexion réussie',
        }
      } else {
        this.authenticated = false
        return {
          success: false,
          message: 'Mauvais email ou mot de passe !',
        }
      }
    },
    logout () {
      this.user = null
      this.token = null
      return {
        success: true,
        message: 'Déconnexion réussie',
      }
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
})
