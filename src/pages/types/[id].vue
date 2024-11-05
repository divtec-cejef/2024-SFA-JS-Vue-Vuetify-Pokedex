<script setup>
  const route = useRoute()
  const idType = route.params.id
</script>

<template>
  <h1>Type numéro {{ idType }}</h1>
</template>

<style scoped>

</style>
