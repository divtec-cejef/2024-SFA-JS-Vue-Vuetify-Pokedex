/**
 * @file Gestionnaire de magasin pour les Pokémon.
 * Utilise Pinia pour gérer les types de Pokémon, la liste des Pokémon,
 * ainsi que des fonctionnalités comme la sélection et les favoris.
 * @version 1.2
 * @since 2024-01-31
 */

import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid' // Librairie pour générer des identifiants uniques (UUID).

/**
 * Liste des types de Pokémon avec leurs couleurs associées.
 * Chaque type possède un identifiant, un nom, et une couleur pour l'affichage visuel.
 * @type {Array<{id: number, name: string, color: string}>}
 */
const types = [
  { id: 1, name: 'Électrique', color: '#FFD700' },
  { id: 2, name: 'Plante', color: '#78C850' },
  { id: 3, name: 'Poison', color: '#A040A0' },
  { id: 4, name: 'Feu', color: '#F08030' },
  { id: 5, name: 'Eau', color: '#6890F0' },
  { id: 6, name: 'Normal', color: '#A8A878' },
  { id: 7, name: 'Fée', color: '#EE99AC' },
  { id: 8, name: 'Spectre', color: '#705898' },
  { id: 9, name: 'Combat', color: '#C03028' },
  { id: 10, name: 'Vol', color: '#A890F0' },
  { id: 11, name: 'Glace', color: '#98D8D8' },
  { id: 12, name: 'Roche', color: '#B8A038' },
  { id: 13, name: 'Sol', color: '#E0C068' },
  { id: 14, name: 'Psy', color: '#F85888' },
]

/**
 * Liste des Pokémon avec leurs caractéristiques.
 * Chaque Pokémon possède un identifiant (UUID), un nom, un ou plusieurs types,
 * des statistiques, et une description.
 * @type {Array<{id: string, name: string, types: number[], level: number, img: string, description: string, stats: {hp: number, attack: number, defense: number, speed: number}}>}
 */
const defaultPokemons = [
  {
    id: '5566710e-29c7-43cc-ba04-46415a63e1ef',
    name: 'Pikachu',
    types: [
      1,
    ],
    level: 35,
    img: 'pikachu.png',
    description: "Pikachu stocke de l'électricité dans ses joues. Il peut produire des décharges électriques puissantes.",
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      speed: 90,
    },
  },
  {
    id: '36289749-333c-4c29-aa9c-cae432eeabcb',
    name: 'Bulbizarre',
    types: [
      2,
      3,
    ],
    level: 15,
    img: 'bulbizarre.png',
    description: 'Il y a une graine sur son dos depuis sa naissance. Elle grossit un peu chaque jour.',
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      speed: 45,
    },
  },
  {
    id: 'e6b24211-9016-46e2-b35e-50c8755add54',
    name: 'Salamèche',
    types: [
      4,
    ],
    level: 20,
    img: 'salameche.png',
    description: "La flamme au bout de sa queue indique l'humeur de ce Pokémon. Elle vacille quand Salamèche est content.",
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
      speed: 65,
    },
  },
  {
    id: '8bb39dba-4e85-4f28-b943-474da5c188db',
    name: 'Carapuce',
    types: [
      5,
    ],
    level: 10,
    img: 'carapuce.png',
    description: 'Carapuce est une petite tortue bipède de couleur bleue. Il possède une carapace majoritairement brune avec un contour blanc.',
    stats: {
      hp: 44,
      attack: 48,
      defense: 65,
      speed: 43,
    },
  },
  {
    id: 'a6171313-2035-4a89-90a2-dfa8dc0deefe',
    name: 'Rondoudou',
    types: [
      6,
      7,
    ],
    level: 25,
    img: 'rondoudou.png',
    description: "Quand ses grands yeux s'illuminent, il chante une mystérieuse berceuse qui endort ses ennemis.",
    stats: {
      hp: 115,
      attack: 45,
      defense: 20,
      speed: 20,
    },
  },
  {
    id: '06ea20b3-3923-455c-b507-acf7d2c025b8',
    name: 'Ectoplasma',
    types: [
      8,
      3,
    ],
    level: 45,
    img: 'ectoplasma.png',
    description: "Ectoplasma peut hypnotiser son adversaire en le fixant de ses yeux rouges. Il attaque ensuite en se cachant dans l'ombre de l'ennemi.",
    stats: {
      hp: 60,
      attack: 65,
      defense: 60,
      speed: 110,
    },
  },
  {
    id: 'cebcebb3-2c37-43ae-a8d2-bb64156d54d4',
    name: 'Évoli',
    types: [
      6,
      9,
    ],
    level: 22,
    img: 'evoli.png',
    description: 'Évoli possède une structure génétique instable qui se transforme selon son environnement.',
    stats: {
      hp: 55,
      attack: 55,
      defense: 50,
      speed: 55,
    },
  },
  {
    id: '20687952-9306-4113-aeb4-16b36b77fdfc',
    name: 'Dracaufeu',
    types: [
      4,
      10,
    ],
    level: 50,
    img: 'dracaufeu.png',
    description: "Dracaufeu parcourt les cieux pour trouver des adversaires à sa mesure. Il crache de puissantes flammes capables de faire fondre n'importe quoi.",
    stats: {
      hp: 78,
      attack: 84,
      defense: 78,
      speed: 100,
    },
  },
  {
    id: 'c7f21895-d59f-401e-b0f8-49bd94ccd09c',
    name: 'Florizarre',
    types: [
      2,
      3,
    ],
    level: 55,
    img: 'florizarre.png',
    description: 'Sa plante donne une grosse fleur quand elle absorbe les rayons du soleil. Il est toujours à la recherche des endroits les plus ensoleillés.',
    stats: {
      hp: 80,
      attack: 82,
      defense: 83,
      speed: 80,
    },
  },
  {
    id: 'f749b5c4-4ffe-4151-a913-09f1ce791c24',
    name: 'Tortank',
    types: [
      5,
    ],
    level: 52,
    img: 'tortank.png',
    description: "Il écrase ses adversaires de tout son poids pour les faire évanouir. Il rentre dans sa carapace s'il se sent en danger.",
    stats: {
      hp: 79,
      attack: 83,
      defense: 100,
      speed: 78,
    },
  },
]

/**
 * Magasin Pinia pour gérer les données des Pokémon.
 * Fournit des fonctionnalités pour accéder, manipuler et afficher les données des Pokémon,
 * ainsi que pour gérer les favoris.
 */
export const usePokemonStore = defineStore('pokemon', {
  // État initial du magasin.
  state: () => ({
    types, // Liste des types de Pokémon.
    // On charge la liste de pokémons depuis le localStorage si elle existe, sinon on utilise la liste par défaut.
    pokemons: JSON.parse(localStorage.getItem('pokemons')) || defaultPokemons,
    favorites: [], // ID des Pokémon favoris.
  }),

  // Getters pour accéder aux données calculées.
  getters: {
    /**
     * Récupère un type de Pokémon à partir de son identifiant.
     * @param {Object} state - L'état actuel du magasin.
     * @returns {Object} Le type correspondant à l'identifiant.
     */
    getTypeById: state => id => state.types.find(type => type.id === id),

    /**
     * Getter qui renvoie un Pokémon complet (objet) à partir de son identifiant.
     * On peut ainsi éviter de réécrire state.pokemons.find(...) dans chaque composant.
     * @param {Object} state - L'état actuel du magasin.
     * @returns {function(string): object|undefined} La fonction qui prend un ID
     * et renvoie le Pokémon correspondant ou undefined s'il n'existe pas.
     */
    getPokemonById: state => id => {
      return state.pokemons.find(pokemon => pokemon.id === id)
    },

    /**
     * Vérifie si un Pokémon donné est dans la liste des favoris.
     * @param {Object} state - L'état actuel du magasin.
     * @returns {boolean} `true` si le Pokémon est favori, sinon `false`.
     */
    isFavorite: state => pokemon => state.favorites.some(favId => favId === pokemon.id),

    /**
     * Récupère la liste complète des Pokémon favoris en mappant chaque ID
     * sur l'objet Pokémon correspondant.
     * Si `find()` ne trouve rien, il renvoie undefined ; le .filter(Boolean)
     * élimine tous les éléments "falsy" (undefined, null, etc.) afin de ne
     * garder que les Pokémon valides.
     * @param {Object} state - L'état actuel du magasin.
     * @returns {Array} Liste des Pokémon favoris.
     */
    getFavorites: state => {
      return state.favorites
        .map(id => state.pokemons.find(p => p.id === id))
        .filter(Boolean)
    },

    /**
     * Getter qui renvoie le nombre total de Pokémon dans la liste.
     * Pratique pour afficher un compteur ou des statistiques simples.
     * @param {Object} state - L'état actuel du magasin.
     * @returns {number} Le nombre total de Pokémon enregistrés.
     */
    totalPokemons: state => {
      return state.pokemons.length
    },

    /**
     * Getter qui renvoie le nombre total de Pokémon marqués comme favoris.
     * Permet d'afficher facilement un compteur de favoris.
     * @param {Object} state - L'état actuel du magasin.
     * @returns {number} Le nombre de favoris.
     */
    totalFavorites: state => {
      return state.favorites.length
    },
  },

  // Actions pour modifier l'état.
  actions: {
    /**
     * Ajoute un nouveau Pokémon à la liste.
     * Version simplifiée : on vérifie uniquement que le nom et le niveau sont présents.
     * @param {Object} pokemon - Objet Pokémon à ajouter.
     * @returns {{success: boolean, message: string}}
     */
    addPokemon (pokemon) {
      // Validation ultra-basique
      if (!pokemon.name || !pokemon.level) {
        return { success: false, message: 'Le nom et le niveau du Pokémon sont obligatoires' }
      }

      // Génération d’un identifiant unique
      pokemon.id = uuidv4()

      // Ajout au tableau
      this.pokemons.push(pokemon)

      // Sauvegarde locale
      localStorage.setItem('pokemons', JSON.stringify(this.pokemons))

      return { success: true, message: 'Pokémon ajouté avec succès' }
    },

    /**
     * Met à jour les informations d’un Pokémon existant dans la liste.
     * Version simplifiée : on ne fait plus de vérification de nom dupliqué.
     * @param {Object} updatedPokemon - Nouveau contenu du Pokémon, incluant son id.
     * @returns {{success: boolean, message: string}}
     */
    updatePokemon (updatedPokemon) {
      // On retrouve le Pokémon via son id
      const index = this.pokemons.findIndex(p => p.id === updatedPokemon.id)
      if (index === -1) {
        return { success: false, message: 'Pokémon introuvable' }
      }

      // Fusion du contenu : on écrase les champs existants par ceux du nouvel objet
      this.pokemons[index] = { ...this.pokemons[index], ...updatedPokemon }

      // Sauvegarde locale
      localStorage.setItem('pokemons', JSON.stringify(this.pokemons))

      return { success: true, message: 'Pokémon modifié avec succès' }
    },

    /**
     * Supprime un Pokémon de la liste et des favoris s'il est trouvé.
     * @param pokemonId - Id du pokémon à supprimer.
     * @returns {{success: boolean, message: string}} - Résultat de l'opération avec succès ou message d'erreur.
     */
    deletePokemon (pokemonId) {
      const index = this.pokemons.findIndex(p => p.id === pokemonId)
      // Supprime le Pokémon de la liste s'il est trouvé.
      if (index !== -1) {
        // Supprime le pokemon du tableau
        this.pokemons.splice(index, 1)
        // Remplace le tableau des pokemons dans le localstorage
        localStorage.setItem('pokemons', JSON.stringify(this.pokemons))
      } else {
        return { success: false, message: 'Pokémon introuvable' }
      }
      // Supprime le Pokémon des favoris s'il est favori.
      const favIndex = this.favorites.findIndex(favId => favId === pokemonId)
      if (favIndex !== -1) {
        this.favorites.splice(favIndex, 1)
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      }
      // Retourne un message de succès.
      return { success: true, message: 'Pokémon supprimé avec succès' }
    },

    /**
     * Charge la liste des favoris depuis le `localStorage`.
     * Supprime les favoris obsolètes qui ne sont plus dans la liste actuelle.
     */
    loadFavorites () {
      this.favorites = JSON.parse(localStorage.getItem('favorites')) || []
      this.favorites = this.favorites.filter(idPokemon => this.pokemons.some(p => p.id === idPokemon))
    },

    /**
     * Ajoute ou retire un Pokémon des favoris.
     * @param {Object} pokemon - Pokémon à ajouter ou retirer.
     */
    toggleFavorite (pokemon) {
      const index = this.favorites.findIndex(fav => fav === pokemon.id)
      if (index === -1) {
        this.favorites.push(pokemon.id)
      } else {
        this.favorites.splice(index, 1)
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
  },
})
