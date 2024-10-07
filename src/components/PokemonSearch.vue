<template>
  <v-text-field
    v-model="search"
    clearable
    label="Trouver un Pokémon"
    prepend-icon="mdi-magnify"
  />
</template>

<script setup>
  const search = defineModel()
</script>
