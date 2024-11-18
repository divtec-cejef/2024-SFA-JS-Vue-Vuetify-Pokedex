<template>
  <v-sheet class="text-caption pa-4 mb-6">
    <p class="mb-2">Images pour les tests, cliquez pour sélectionner :</p>
    <v-chip
      v-for="image in imagesDisponibles"
      :key="image"
      append-icon="mdi-plus"
      class="ma-1"
      size="small"
      @click="$emit('select', image)"
    >
      {{ image }}
    </v-chip>

  </v-sheet>
</template>

<script setup>
  defineEmits(['select'])

  const imagesDisponibles = [
    'lokhlass.png',
    'magicarpe.png',
    'melofee.png',
    'mewtwo.png',
    'onix.png',
    'raichu.png',
  ]

</script>

<style scoped>

</style>
