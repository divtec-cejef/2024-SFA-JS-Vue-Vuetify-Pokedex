<template>
  <!--
  Barre d'application fixe en haut de la page
    * flat : supprime l'ombre pour un style minimaliste
  -->
  <v-app-bar flat>
    <!--
    Conteneur pour aligner le contenu de la barre d'application
      * class="d-flex align-start align-center" aligne le contenu à gauche et au centre verticalement
    -->
    <v-container class="d-flex align-start align-center">
      <!--
      Avatar cliquable affichant une Pokéball
        * image charge l'image de la Pokéball depuis les assets
        * size="64" définit la taille de l'avatar
        * class="mr-4 pa-0 cursor-pointer" ajoute une marge à droite, supprime le padding, et rend le curseur interactif
        * @click redirige vers la page d'accueil via le routeur Vue
      -->
      <v-avatar
        class="mr-4 pa-0 cursor-pointer"
        image="@/assets/pokeball.svg"
        size="64"
        @click="$router.push('/')"
      />

      <!--
      Titre principal de la barre d'application
      -->
      <v-toolbar-title>Pokedex</v-toolbar-title>

      <!--
      Boutons générés dynamiquement pour les éléments du menu
        * v-for itère sur les éléments de menuItems
        * :key utilise un identifiant unique basé sur le titre de chaque élément
        * :icon applique une icône spécifique à chaque bouton
        * :to configure un lien vers le chemin spécifié
      -->
      <v-btn
        v-for="link in menuItems"
        :key="link.title"
        :icon="link.icon"
        :to="link.path"
      />
    </v-container>
  </v-app-bar>
</template>

<script setup>
/*
Importation de ref depuis Vue pour créer une propriété réactive
*/
  import { ref } from 'vue'

  /*
Déclaration réactive des éléments du menu de navigation
  - Chaque objet représente un bouton dans la barre d'application
    * title : texte descriptif du lien (non affiché ici mais utile pour les clés et extensions futures)
    * path : chemin de la route vers laquelle le lien redirige
    * icon : nom de l'icône Vuetify affichée dans le bouton
*/
  const menuItems = ref([
    {
      title: 'Accueil',
      path: '/',
      icon: 'mdi-pokeball',
    },
    {
      title: 'Favoris',
      path: '/favoris',
      icon: 'mdi-heart',
    },
    {
      title: 'FAQ',
      path: '/faq',
      icon: 'mdi-frequently-asked-questions',
    },
    {
      title: 'Kanto',
      path: '/kantomap',
      icon: 'mdi-map',
    },
  ])
</script>
