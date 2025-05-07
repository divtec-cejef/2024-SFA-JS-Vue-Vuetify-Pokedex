<template>
  <!--
  Conteneur principal avec une largeur maximale et centré

    * max-width="800px" limite la largeur à 800px pour un affichage compact et centré
  -->
  <v-container max-width="600px">
    <!--
    Titre de la page
      * class="mb-6" ajoute une Marge en Bas de 6 unités
      * class="text-center" centre le texte
    -->
    <h1 class="mb-6 text-center">Le Monde Pokémon</h1>

    <!--
    Image de la carte du monde Pokémon
      * alt fournit une description pour l'accessibilité
      * class="cursor-pointer" change le curseur pour indiquer que l'image est cliquable
      * src définit le chemin de l'image
      * @click déclenche l'ouverture du dialogue d'image
    -->
    <v-img
      alt="Carte du monde Pokémon"
      class="cursor-pointer"
      src="/images/pokemon-map.png"
      @click="dialog = true"
    />

    <!--
    Carte de présentation du monde Pokémon
      * class="my-8" ajoute une Marge en Bas et en Haut de 8 unités
    -->
    <v-card class="my-8">
      <v-card-text>
        <h2>Un univers fascinant à découvrir</h2>
        <p>Le monde Pokémon est un vaste et merveilleux univers peuplé de créatures extraordinaires appelées Pokémon. Cette carte représente les différentes régions que les dresseurs peuvent explorer, chacune offrant ses propres défis, Pokémon uniques et aventures palpitantes.</p>

        <h2>Des régions diversifiées</h2>
        <p>De Kanto à Galar, en passant par Johto, Hoenn, Sinnoh, Unova, Kalos et Alola, chaque région du monde Pokémon possède sa propre identité, sa culture et son écosystème unique. Les paysages varient des montagnes enneigées aux îles tropicales, offrant une diversité incroyable d'habitats pour les différentes espèces de Pokémon.</p>

        <h2>Un monde en constante évolution</h2>
        <p>Le monde Pokémon est en perpétuelle expansion, avec de nouvelles régions, de nouvelles espèces de Pokémon et de nouvelles aventures qui sont régulièrement découvertes. Cette carte n'est qu'un aperçu d'un univers riche et en constante évolution, prêt à être exploré par les dresseurs audacieux.</p>

        <h2>Un appel à l'aventure</h2>
        <p>Que vous soyez un dresseur débutant ou expérimenté, le monde Pokémon vous invite à partir à l'aventure. Capturez de nouveaux Pokémon, affrontez des champions d'arènes, déjouez les plans des équipes malveillantes et devenez peut-être le prochain Maître Pokémon. L'aventure commence ici, sur cette carte, mais où vous mènera-t-elle ?</p>
      </v-card-text>
    </v-card>

    <!--
    Dialogue pour afficher la carte en grand format
      * v-model="dialog" contrôle l'affichage du dialogue, si true le dialogue est ouvert
    -->
    <v-dialog v-model="dialog">
      <v-card>
        <!-- Image de la carte en grand format dans le dialogue -->
        <v-img alt="Carte du monde Pokémon" src="/images/pokemon-map.png" />
        <!--
        Template (zone) pour les actions du dialogue
          * #actions permet de définir le contenu de la section d'actions du dialogue
        -->
        <template #actions>
          <!--
          Bouton pour fermer la dialogue
            * @click met à false la variable dialog pour fermer le dialogue
          -->
          <v-btn @click="dialog = false">Fermer</v-btn>
        </template>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
  // Importation de la fonction "ref" depuis Vue pour créer des variables réactives
  import { ref } from 'vue'

  /* Déclaration de la variable réactive "dialog" pour contrôler l'affichage du dialogue
    - ref(false) initialise "dialog" à false (fermé par défaut)
  */
  const dialog = ref(false)
</script>

<style scoped>
/* Style pour le composant
  - l'attribut "scoped" limite l'application de ce style uniquement à ce composant
*/
h2 {
  margin-top: 1em;
  margin-bottom: .5em;
}
</style>
