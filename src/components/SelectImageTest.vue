<template>
  <!--
  Conteneur principal pour afficher les images disponibles sous forme de puces.
    * v-sheet : Composant Vuetify pour contenir et styliser un bloc de contenu.
    * class="text-caption pa-4 mb-6" :
      - text-caption : Définit une taille de texte plus petite.
      - pa-4 : Ajoute un padding uniforme de 4 unités autour du contenu.
      - mb-6 : Ajoute une marge en bas de 6 unités pour espacer le composant des éléments suivants.
  -->
  <v-sheet class="text-caption pa-4 mb-6">
    <!--
    Texte d'instruction pour l'utilisateur.
      * class="mb-2" : Ajoute une marge en bas de 2 unités pour espacer le texte des puces.
    -->
    <p class="mb-2">Images pour les tests, cliquez pour sélectionner :</p>

    <!--
    Liste dynamique des images disponibles sous forme de puces.
      * v-for="image in imagesDisponibles" : Itère sur le tableau `imagesDisponibles` pour afficher chaque image.
      * :key="image" : Associe une clé unique à chaque élément basé sur son nom.
      * append-icon="mdi-plus" : Ajoute une icône "plus" à droite de chaque puce.
      * class="ma-1" : Ajoute une marge uniforme autour de chaque puce pour espacer visuellement.
      * size="small" : Réduit la taille des puces pour qu'elles occupent moins d'espace.
      * @click="$emit('select', image)" : Émet un événement `select` avec le nom de l'image lorsqu'une puce est cliquée.
    -->
    <v-chip
      v-for="image in imagesDisponibles"
      :key="image"
      append-icon="mdi-plus"
      class="ma-1"
      size="small"
      @click="$emit('select', image)"
    >
      <!-- Affiche le nom de l'image à l'intérieur de la puce -->
      {{ image }}
    </v-chip>
  </v-sheet>
</template>

<script setup>
  /*
    Déclaration des événements émis par le composant
    - 'select' : Événement émis lorsque l'utilisateur sélectionne une image.
  */
  defineEmits(['select'])

  // Liste des images disponibles à afficher
  const imagesDisponibles = [
    'lokhlass.png',
    'magicarpe.png',
    'magicarpe.png',
    'melofee.png',
    'mewtwo.png',
    'onix.png',
    'raichu.png',
  ]
</script>

<style scoped>
/* Aucun style spécifique ajouté pour ce composant */
</style>
