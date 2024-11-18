<template>
  <v-container v-if="selectedPokemon">
    <v-card>
      <v-img contain height="300px" :src="`/images/${selectedPokemon.img}`" />
      <v-card-title>{{ selectedPokemon.name }}</v-card-title>
      <v-card-subtitle>
        <div class="mb-2">Niveau : {{ selectedPokemon.level }}</div>
        <div class="mb-2">Types: <pokemon-types-chips :pokemon="selectedPokemon" /></div>
      </v-card-subtitle>
      <v-card-text>
        <p>{{ selectedPokemon.description }}</p>
        <v-divider class="my-3" />
        <h3>Stats</h3>
        <v-list-item v-for="(value, key) in selectedPokemon.stats" :key="key">
          <v-list-item-title>{{ key.toUpperCase() }}: {{ value }}</v-list-item-title>
          <v-progress-linear
            :color="getStatColor(key)"
            height="25"
            :model-value="value"
          >
            <strong>{{ value }}</strong>
          </v-progress-linear>
        </v-list-item>
      </v-card-text>
      <v-card-actions>
        <v-btn icon @click="toggleFavorite(selectedPokemon)">
          <v-icon :color="isFavorite(selectedPokemon) ? 'red' : ''">
            {{ isFavorite(selectedPokemon) ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>
        <v-btn to="/">Retour au Pokédex</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
  import PokemonTypesChips from '@/components/PokemonTypesChips.vue'
  import { onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { usePokemonStore } from '@/stores/pokemonStore'

  const router = useRouter() // Outil de routage
  const route = useRoute() // Informations sur la route actuelle
  const pokemonStore = usePokemonStore()
  const { selectedPokemon } = storeToRefs(pokemonStore)
  const { selectPokemon, toggleFavorite, isFavorite } = pokemonStore

  onMounted(() => {
    // Teste si l'id du Pokémon existe dans le magasin des Pokémon
    // Sinon on redirige l'utilisateur vers la page 404 [...path].vue
    if (!pokemonStore.pokemons.find(pokemon => pokemon.id === route.params.id)) {
      router.push('/404')
    }
    // Charge le pokémon correspondant à l'id dans le 'état selectedPokemon du magasin
    selectPokemon(route.params.id)
  })

  const getStatColor = stat => {
    const colors = {
      hp: 'green',
      attack: 'red',
      defense: 'blue',
      speed: 'yellow',
    }
    return colors[stat] || 'grey'
  }
</script>
