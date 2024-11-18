import { defineStore } from 'pinia'

/*
Magasin d'authentification factice utilisant des données simulées
  - Simule la connexion et la déconnexion d'un utilisateur.
  - Illustratif pour démontrer le fonctionnement d'un magasin Pinia.
  - Remarque : en production, une API réelle d'authentification devrait être utilisée.
*/

// Données factices pour la simulation de connexion
const utilisateurFactice = {
  email: 'sacha@pokemon.com', // Email utilisé pour la connexion simulée.
  name: 'Sacha Ketchum', // Nom de l'utilisateur simulé.
}

const passwordFactice = 'pika' // Mot de passe associé à l'utilisateur factice.
const tokenFactice = '0b042934e5df02c9786efb364d946e64' // Jeton factice simulant une session active.

/*
Définition du magasin Pinia pour gérer l'état d'authentification
  - Nom du magasin : 'auth'
  - Fournit des états, actions, et getters pour gérer la connexion et la déconnexion.
*/
export const useAuthStore = defineStore('auth', {
  /*
  État initial du magasin
    - user : Représente les informations de l'utilisateur connecté (null si non connecté).
    - token : Jeton d'authentification (null si non connecté).
  */
  state: () => ({
    user: null,
    token: null,
  }),

  /*
  Actions : Fonctions permettant de modifier l'état du magasin
    - Inclut des méthodes pour simuler la connexion et la déconnexion.
  */
  actions: {
    /*
    Simule une connexion utilisateur
      - email : Adresse email saisie par l'utilisateur.
      - password : Mot de passe saisi par l'utilisateur.
      - Si les identifiants correspondent aux données factices, met à jour `user` et `token`.
      - Retourne un message de succès ou d'échec en fonction des informations saisies.
    */
    login (email, password) {
      if (email === utilisateurFactice.email && password === passwordFactice) {
        // Succès de la connexion : Mise à jour de l'utilisateur et du token.
        this.user = utilisateurFactice
        this.token = tokenFactice
        return {
          success: true,
          message: 'Connexion réussie',
        }
      } else {
        // Échec de la connexion : Réinitialisation de l'état.
        this.user = null
        this.token = null
        return {
          success: false,
          message: 'Mauvais email ou mot de passe !',
        }
      }
    },

    /*
    Simule une déconnexion utilisateur
      - Réinitialise l'état `user` et `token` pour déconnecter l'utilisateur.
      - Retourne un message de confirmation de déconnexion.
    */
    logout () {
      this.user = null
      this.token = null
      return {
        success: true,
        message: 'Déconnexion réussie',
      }
    },
  },

  /*
  Getters : Propriétés dérivées basées sur l'état du magasin
    - Fournit une méthode pour vérifier si un utilisateur est authentifié.
  */
  getters: {
    /*
    Vérifie si un utilisateur est connecté
      - Retourne `true` si un token est présent, sinon `false`.
      - Utilise `!!state.token` pour convertir le token en booléen.
    */
    isAuthenticated: state => !!state.token,
  },
})
