import { defineStore } from 'pinia'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    apiUrl: 'https://localhost', // URL de base pour l'API
    imageUrl: 'https://localhost/assets', // URL de base pour les images
    types: [], // Contient les informations de tous les types
    pokemons: [], // Contiendra les Pokémon avec les identifiants de types non transformés
    selectedPokemon: null,
    favorites: [],
  }),
  getters: {
    favoritesCount: state => state.favorites.length,
  },
  actions: {
    async fetchTypes () {
      try {
        // Récupération des types
        const typesResponse = await axios.get(`${this.apiUrl}/items/type`)
        this.types = typesResponse.data.data
      } catch (error) {
        console.error('Erreur lors du chargement des types:', error)
      }
    },
    async fetchPokemons () {
      try {
        // Récupération des pokémons
        const response = await axios.get(`${this.apiUrl}/items/pokemon?fields=*,images.*,types.type_id.*`)
        this.pokemons = response.data.data
      } catch (error) {
        console.error('Erreur lors du chargement des pokémons:', error)
      }
    },

    selectPokemon (id) {
      this.selectedPokemon = this.pokemons.find(p => p.id === id) || null
    },

    loadFavorites () {
      this.favorites = JSON.parse(localStorage.getItem('favorites')) || []
    },

    toggleFavorite (pokemon) {
      const index = this.favorites.findIndex(fav => fav.id === pokemon.id)
      if (index === -1) {
        this.favorites.push(pokemon)
      } else {
        this.favorites.splice(index, 1)
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },

    isFavorite (pokemon) {
      return this.favorites.some(fav => fav.id === pokemon.id)
    },
  },
})
