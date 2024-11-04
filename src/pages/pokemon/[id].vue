<template>
  <v-container v-if="selectedPokemon">
    <v-card>
      <v-img contain height="300px" :src="`${pokemonStore.imageUrl}/${selectedPokemon.image}`" />
      <v-card-title>{{ selectedPokemon.nom }}</v-card-title>
      <v-card-subtitle class="d-flex align-center">
        <span>Type:</span>
        <v-img
          v-for="type in selectedPokemon.types"
          :key="type.type_id.id"
          :alt="`Type ${type.type_id.name}`"
          class="ma-1"
          max-height="30"
          max-width="30"
          :src="`${pokemonStore.imageUrl}/${type.type_id.image}`"
        />
        | Niveau: {{ selectedPokemon.generation }}
      </v-card-subtitle>
      <v-card-text>
        <h3>Stats</h3>
        <v-list-item>
          <v-list-item-title>HP: {{ selectedPokemon.pointsDeVie }}</v-list-item-title>
          <v-progress-linear color="green" height="25" :model-value="selectedPokemon.pointsDeVie">
            <strong>{{ selectedPokemon.pointsDeVie }}</strong>
          </v-progress-linear>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>ATTACK: {{ selectedPokemon.attaque }}</v-list-item-title>
          <v-progress-linear color="red" height="25" :model-value="selectedPokemon.attaque">
            <strong>{{ selectedPokemon.attaque }}</strong>
          </v-progress-linear>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>DEFENSE: {{ selectedPokemon.defense }}</v-list-item-title>
          <v-progress-linear color="blue" height="25" :model-value="selectedPokemon.defense">
            <strong>{{ selectedPokemon.defense }}</strong>
          </v-progress-linear>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>SPEED: {{ selectedPokemon.vitesse }}</v-list-item-title>
          <v-progress-linear color="yellow" height="25" :model-value="selectedPokemon.vitesse">
            <strong>{{ selectedPokemon.vitesse }}</strong>
          </v-progress-linear>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>SPECIAL ATTACK: {{ selectedPokemon.attaqueSpeciale }}</v-list-item-title>
          <v-progress-linear color="purple" height="25" :model-value="selectedPokemon.attaqueSpeciale">
            <strong>{{ selectedPokemon.attaqueSpeciale }}</strong>
          </v-progress-linear>
        </v-list-item>

        <v-list-item>
          <v-list-item-title>SPECIAL DEFENSE: {{ selectedPokemon.defenseSpeciale }}</v-list-item-title>
          <v-progress-linear color="teal" height="25" :model-value="selectedPokemon.defenseSpeciale">
            <strong>{{ selectedPokemon.defenseSpeciale }}</strong>
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
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { usePokemonStore } from '@/stores/pokemonStore'

  const route = useRoute()
  const pokemonStore = usePokemonStore()
  const { selectedPokemon } = storeToRefs(pokemonStore)
  const { selectPokemon, toggleFavorite, isFavorite } = pokemonStore

  // Charge le Pokémon sélectionné
  onMounted(() => {
    selectPokemon(parseInt(route.params.id))
  })
</script>
