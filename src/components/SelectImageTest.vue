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
      * append-icon="image === selectedImage ? 'mdi-check' : 'mdi-plus'" : affiche un plus ou une coche en fonction de l'état de sélection.
      * aria-label="Cliquer pour sélectionner l'image" : Texte d'accessibilité pour les lecteurs d'écran.
      * aria-pressed="image === selectedImage" : Indique si l'image est sélectionnée pour les lecteurs d'écran.
      * class="ma-1" : Ajoute une marge uniforme autour de chaque puce pour espacer visuellement.$
      * :class="{ selected: image === selectedImage }" : Applique la classe 'selected' si l'image est sélectionnée.
      * :color="image === selectedImage ? 'primary' : ''" : Applique la couleur 'primary' si l'image est sélectionnée.
      * role="button" : Indique que la puce est cliquable.
      * size="small" : Réduit la taille des puces pour qu'elles occupent moins d'espace.
      * @click="selectImage(image)" : Appelle la fonction selectImage du composant qui définit l'image sélectionnée et émet un événement.
    -->
    <v-chip
      v-for="image in imagesDisponibles"
      :key="image"
      :append-icon="image === selectedImage ? 'mdi-check' : 'mdi-plus'"
      aria-label="Cliquer pour sélectionner l'image"
      :aria-pressed="image === selectedImage"
      class="ma-1"
      :class="{ selected: image === selectedImage }"
      :color="image === selectedImage ? 'primary' : ''"
      role="button"
      size="small"
      @click="selectImage(image)"
    >
      <!-- Affiche le nom de l'image à l'intérieur de la puce -->
      {{ image }}
    </v-chip>
  </v-sheet>
</template>

<script setup>
  // Importation des dépendances nécessaires
  import { defineEmits, ref } from 'vue'
  /*
    Déclaration des événements émis par le composant
    - 'select' : Événement émis lorsque l'utilisateur sélectionne une image.
  */
  const emit = defineEmits(['select'])

  // Image actuellement sélectionnée
  const selectedImage = ref(null)

  // Liste des images disponibles à afficher
  const imagesDisponibles = [
    'lokhlass.png',
    'magicarpe.png',
    'melofee.png',
    'mewtwo.png',
    'onix.png',
    'raichu.png',
  ]

  // Méthode pour sélectionner une image et émettre l'événement vers le parent
  function selectImage (image) {
    // Met à jour l'image sélectionnée
    selectedImage.value = image
    // Émet l'événement vers le parent
    emit('select', image)
  }
</script>

<style scoped>
/* Applique l'animation à la puce sélectionnée */
.selected {
  animation: selectAnimation 0.3s ease-in-out;
}

  /* Animation pour une puce sélectionnée */
@keyframes selectAnimation {
  0% {
    transform: scale(1) translateX(0);
  }
  25% {
    transform: scale(1.1) translateX(-2px);
  }
  50% {
    transform: scale(1.2) translateX(2px);
  }
  75% {
    transform: scale(1.1) translateX(-2px);
  }
  100% {
    transform: scale(1) translateX(0);
  }
}

</style>
