<script setup>
  import { usePokemonStore } from '@/stores/pokemonStore'

  const pokemonStore = usePokemonStore()
  pokemonStore.fetchTypes()
</script>

<template>
  <h1>Types</h1>
  <ul>
    <li
      v-for="type in pokemonStore.types"
      :key="type.id"
    >
<!--      <router-link :to="'types/' + type.id">-->
      <router-link :to="`types/${type.id}`">
        {{ type.name }}
      </router-link>
    </li>
  </ul>
</template>

<style scoped>

</style>
