import { defineStore } from 'pinia'

/*
Ce magasin n'utilise pas de véritable API pour l'authentification.
Il utilise des données factices pour simuler la connexion et la déconnexion.
Ces données sont utilisées pour illustrer le fonctionnement d'un magasin d'authentification.
En pratique, vous devriez utiliser une API d'authentification réelle.
*/

// Utilisateur factice pour la simulation de connexion
const utilisateurFactice = {
  email: 'sacha@pokemon.com', // Email utilisé pour la connexion simulée
  name: 'Sacha Ketchum', // Nom de l'utilisateur simulé
}

// Mot de passe factice pour la simulation de connexion
const passwordFactice = 'pika' // Mot de passe correspondant à l'utilisateur factice

// Jeton factice pour la simulation de connexion
/*
Ce jeton est supposé être généré par le serveur d'authentification
après une connexion réussie. Il est ensuite utilisé pour authentifier
les requêtes ultérieures envoyées au serveur.
*/
const tokenFactice = '0b042934e5df02c9786efb364d946e64'

/*
Définition du magasin Pinia pour l'authentification
  - Nom du magasin : 'auth'
  - Contient l'état, les actions et les getters relatifs à l'authentification
*/
export const useAuthStore = defineStore('auth', {
  /*
  État initial du magasin
    - user : Informations sur l'utilisateur actuellement connecté (null si non connecté)
    - token : Jeton d'authentification (null si non connecté)
  */
  state: () => ({
    user: null,
    token: null,
  }),

  /*
  Actions : Fonctions qui modifient l'état du magasin
  */
  actions: {
    /*
    Action pour simuler une connexion
      - email : Adresse email saisie par l'utilisateur
      - password : Mot de passe saisi par l'utilisateur
      - Vérifie si les identifiants correspondent aux données factices
      - En cas de succès : met à jour l'état (user et token) et retourne un message de succès
      - En cas d'échec : retourne un message d'erreur
    */
    login (email, password) {
      if (email === utilisateurFactice.email && password === passwordFactice) {
        // Connexion réussie
        this.user = utilisateurFactice
        this.token = tokenFactice
        return {
          success: true,
          message: 'Connexion réussie',
        }
      } else {
        this.user = null
        this.token = null
        return {
          success: false,
          message: 'Mauvais email ou mot de passe !',
        }
      }
    },

    /*
    Action pour simuler une déconnexion
      - Réinitialise l'état en supprimant les informations de l'utilisateur et le jeton
      - Retourne un message de confirmation
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
  Getters : Fonctions dérivées permettant d'accéder à des informations calculées basées sur l'état
  */
  getters: {
    /*
    Vérifie si l'utilisateur est authentifié
      - Retourne true si un token est présent, sinon false
      - Utilise !!state.token pour convertir le token en une valeur booléenne
    */
    isAuthenticated: state => !!state.token,
  },
})
