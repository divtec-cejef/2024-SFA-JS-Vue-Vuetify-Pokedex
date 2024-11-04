import { defineStore } from 'pinia'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    typeColors: [],
    pokemons: [],
    selectedPokemon: null,
    favorites: [],
  }),
  getters: {
    favoritesCount: state => state.favorites.length,
  },
  actions: {
    async fetchTypes () {
      try {
        const response = await axios.get('http://localhost:8055/items/type')
        this.typeColors = response.data.data.reduce((acc, type) => {
          acc[type.name] = type.color
          return acc
        }, {})
      } catch (error) {
        console.error('Error fetching types:', error)
      }
    },
    async fetchPokemons () {
      try {
        const response = await axios.get('http://localhost:8055/items/pokemon')
        this.pokemons = response.data.data
      } catch (error) {
        console.error('Error fetching pokemons:', error)
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
    getTypeColor (type) {
      return this.typeColors[type] || '#A8A878' // Default color if not found
    },
  },
})
