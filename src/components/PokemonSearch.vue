<template>
  <v-text-field
    label="Search Pokémon"
    :model-value="modelValue"
    prepend-icon="mdi-magnify"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
  defineProps(['modelValue'])
  defineEmits(['update:modelValue'])
</script>
