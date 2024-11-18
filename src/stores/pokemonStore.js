/**
 * @file Gestionnaire de magasin pour les Pokémon.
 * Utilise Pinia pour gérer les types de Pokémon, la liste des Pokémon,
 * et les fonctionnalités de sélection et de favoris.
 * @version 1.0
 * @since 2024-01-31
 */

import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'

/**
 * Tableau des types de Pokémon.
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
 * Tableau des Pokémons
 * @pokemon {Array<{id: number, name: string, types: number[], level: number, img: string, description: string, height: number, weight: number, abilities: string[], stats: {hp: number, attack: number, defense: number, speed: number}}>}
 */
const pokemons = [
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

/* Magasin Pinia pour gérer les données des Pokémon. */
export const usePokemonStore = defineStore('pokemon', {

  /* État initial des données du magasin. */
  state: () => ({
    types, // Liste des types de Pokémon
    pokemons, // Liste des Pokémon
    selectedPokemon: null, // Pokémon sélectionné
    favorites: [], // Liste des Pokémon favoris
  }),

  /* Getters pour accéder aux données du magasin */
  getters: {
    /**
     * Compte le nombre de Pokémon favoris.
     * @param {Object} state - L'état actuel du magasin.
     * @returns {number} Le nombre de favoris.
     */
    favoritesCount: state => state.favorites.length,

    /**
     * Récupère un Pokémon par son identifiant.
     * @param state - L'état actuel du magasin.
     * @returns {object} Le Pokémon correspondant à l'identifiant.
     */
    getTypeById: state => id => {
      return state.types.find(type => type.id === id)
    },

    /**
     * Indique si l'objet pokémon passé en paramètre est favori.
     */
    isFavorite: state => pokemon => {
      return state.favorites.some(fav => fav.id === pokemon.id)
    },
  },
  /**
   * Actions pour modifier l'état du magasin.
   */
  actions: {
    addPokemon (pokemon) {
      // Vérification des données du Pokémon
      if (!pokemon.name || !pokemon.level) {
        return {
          success: false,
          message: 'Le nom et le niveau du Pokémon sont obligatoires',
        }
      }

      // Si le nom du Pokémon est déjà utilisé
      if (this.pokemons.some(p => p.name.toLowerCase() === pokemon.name.toLowerCase())) {
        return {
          success: false,
          message: 'Le nom du Pokémon est déjà utilisé',
        }
      }
      // Si tout est correct, ajouter le Pokémon
      // Génération de l'identifiant (méthode simple et peu fiable)
      pokemon.id = uuidv4()
      this.pokemons.push(pokemon)
      return { success: true, message: 'Pokémon ajouté avec succès' }
    },
    /**
     * Sélectionne un Pokémon par son identifiant.
     * @param {number} id - Identifiant du Pokémon.
     */
    selectPokemon (id) {
      this.selectedPokemon = this.pokemons.find(p => p.id === id) || null
    },

    /**
     * Charge la liste des Pokémon favoris depuis le `localStorage`.
     */
    loadFavorites () {
      this.favorites = JSON.parse(localStorage.getItem('favorites')) || []
    },

    /**
     * Ajoute ou retire un Pokémon des favoris.
     * @param {Object} pokemon - Objet Pokémon à ajouter ou retirer des favoris.
     */
    toggleFavorite (pokemon) {
      const index = this.favorites.findIndex(fav => fav.id === pokemon.id)
      if (index === -1) {
        this.favorites.push(pokemon)
      } else {
        this.favorites.splice(index, 1)
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
  },
})
