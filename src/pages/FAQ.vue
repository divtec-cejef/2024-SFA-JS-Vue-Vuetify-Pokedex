<template>
  <v-container>
    <!--
    Titre de la page FAQ
      * class="mb-6" ajoute une Marge en Bas de 6 unités
      * class="text-center" centre le texte
    -->
    <h1 class="mb-6 text-center">Foire Aux Questions (FAQ)</h1>

    <!--
    Panneaux expansibles, accordéons, pour afficher les questions et réponses
      * v-expansion-panels crée un conteneur pour les panneaux expansibles
    -->
    <v-expansion-panels>
      <!--
      Boucle pour afficher chaque élément de la FAQ
        * v-for permet de parcourir la liste faqItems
        * :key attribue une clé unique à chaque panneau pour optimiser le rendu
      -->
      <v-expansion-panel v-for="(item, i) in faqItems" :key="i">
        <!--
        Titre de la question
          * v-expansion-panel-title affiche le titre de la question dans le panneau
        -->
        <v-expansion-panel-title>
          {{ item.question }}
        </v-expansion-panel-title>

        <!--
        Texte de la réponse
          * v-expansion-panel-text affiche le texte de la réponse dans le panneau
        -->
        <v-expansion-panel-text>
          {{ item.answer }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  /*
    Liste des questions et réponses fréquemment posées (FAQ)
      * faqItems est un tableau réactif contenant des objets { question, answer }
      * ref() rend faqItems réactif, ce qui permet à Vue de mettre à jour l'interface si le contenu change
  */
  const faqItems = ref([
    {
      question: "Qu'est-ce qu'un Pokédex ?",
      answer: 'Un Pokédex est un dispositif électronique qui répertorie et fournit des informations sur les différentes espèces de Pokémon. Notre application est une version numérique de cet outil.',
    },
    {
      question: 'Comment puis-je ajouter un Pokémon à mes favoris ?',
      answer: "Pour ajouter un Pokémon à vos favoris, cliquez simplement sur l'icône en forme de cœur sur la carte du Pokémon. L'icône deviendra rouge pour indiquer que le Pokémon est maintenant dans vos favoris.",
    },
    {
      question: 'Pourquoi certains Pokémon ont-ils plusieurs types ?',
      answer: 'Certains Pokémon possèdent des caractéristiques de plusieurs types, ce qui se reflète dans leurs capacités et leurs faiblesses. Par exemple, Charizard est à la fois de type Feu et Vol.',
    },
    {
      question: 'Comment fonctionne la recherche de Pokémon ?',
      answer: 'Vous pouvez rechercher des Pokémon en tapant leur nom dans la barre de recherche. La liste se mettra à jour automatiquement pour afficher les Pokémon dont le nom correspond à votre recherche.',
    },
    {
      question: 'Que signifient les différentes statistiques des Pokémon ?',
      answer: "Les statistiques comme HP, Attaque, Défense et Vitesse représentent les capacités de base d'un Pokémon. HP représente les points de vie, Attaque la puissance offensive, Défense la résistance aux attaques, et Vitesse détermine l'ordre d'action en combat.",
    },
    {
      question: "L'application est-elle mise à jour régulièrement avec de nouveaux Pokémon ?",
      answer: "Oui, nous nous efforçons de maintenir notre base de données à jour avec les derniers Pokémon découverts. Cependant, la fréquence des mises à jour peut varier en fonction des nouvelles sorties de jeux et d'informations officielles.",
    },
  ])
</script>
