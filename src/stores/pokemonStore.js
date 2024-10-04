import { defineStore } from 'pinia'
import axios from 'axios'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemons: [],
    selectedPokemon: null,
    favorites: [],
    loading: false,
    error: null,
  }),
  getters: {
    favoritesCount: state => state.favorites.length,
  },
  actions: {
    async fetchPokemons () {
      this.loading = true
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
        this.pokemons = response.data.results
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async fetchPokemonDetails (url) {
      this.loading = true
      try {
        const response = await axios.get(url)
        this.selectedPokemon = response.data
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    toggleFavorite (pokemon) {
      const index = this.favorites.findIndex(fav => fav.name === pokemon.name)
      if (index === -1) {
        this.favorites.push(pokemon)
      } else {
        this.favorites.splice(index, 1)
      }
    },
    isFavorite (pokemon) {
      return this.favorites.some(fav => fav.name === pokemon.name)
    },
  },
})
