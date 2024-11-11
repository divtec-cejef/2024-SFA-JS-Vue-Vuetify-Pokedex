<template>
  <v-card :to="`/pokemon/${pokemon.id}`">
    <v-img contain height="200px" :src="`${pokemonStore.imageUrl}/${pokemon.image}`" />
    <v-card-title>
      {{ pokemon.nom }}
    </v-card-title>
    <v-card-subtitle class="d-flex align-center">
      <v-img
        v-for="type in pokemon.types"
        :key="type.type_id?.id"
        :alt="type.type_id?.name"
        class="ma-1"
        max-height="40"
        max-width="40"
        :src="pokemonStore.imageUrl + '/' + type.type_id?.image"
        :title="type.type_id?.name"
      />
    </v-card-subtitle>
    <v-card-actions>
      <v-btn icon @click.prevent="pokemonStore.toggleFavorite(props.pokemon)">
        <v-icon :color="pokemonStore.isFavorite(pokemon) ? 'red' : ''">
          {{ pokemonStore.isFavorite(pokemon) ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </v-btn>
      <!-- Bouton pour supprimer un pokémon -->
      <v-btn
        v-if="pokemonStore.isAuthenticated"
        color="red"
        icon="mdi-delete"
        @click.prevent="dialog = true"
      />
    </v-card-actions>

    <v-dialog
      v-model="dialog"
      max-width="400"
      persistent
    >
      <v-card
        prepend-icon="mdi-delete"
        text="Etes-vous sûr de vouloir supprimer ce pokémon ?"
        title="Suppression"
      >
        <template #actions>
          <v-spacer />

          <v-btn @click="dialog = false">
            Annuler
          </v-btn>

          <v-btn @click="deletePokemon(pokemon.id)">
            Supprimer
          </v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
  // Importation du magasin des pokémons
  import { usePokemonStore } from '@/stores/pokemonStore'
  const pokemonStore = usePokemonStore()

  // Déclaration des props
  const props = defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
  })
  // État pour afficher la boîte de dialogue
  const dialog = ref(false)
  // Fonction pour supprimer un pokémon
  async function deletePokemon (id) {
    try {
      await pokemonStore.deletePokemon(id)
    } catch (error) {
      console.error(error)
    } finally {
      dialog.value = false // Fermer la boîte de dialogue
    }
  }

</script>
