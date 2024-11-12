<template>
  <!--
  Conteneur principal avec une largeur maximale et centré

    * max-width="800px" limite la largeur à 800px pour un affichage compact et centré
  -->
  <v-container max-width="600px">
    <!--
    Titre de la page
      * class="mb-6 text-center" ajoute une Marge en Bas de 6 unités et centre le texte
    -->
    <h1 class="mb-6 text-center">Le Monde Pokémon</h1>

    <!--
    Image de la carte du monde Pokémon
      * alt fournit une description pour l'accessibilité
      * class="mb-6 cursor-pointer" ajoute une Marge en Bas de 6 unités et
      * class="cursor-pointer" classe "maison" déclarée dans le style du composant pour changer le curseur en main
      * contain ajuste l'image pour être entièrement contenue dans la zone définie
      * src définit le chemin de l'image
      * @click déclenche l'ouverture du dialogue d'image
    -->
    <v-img
      alt="Carte du monde Pokémon"
      class="mb-6 cursor-pointer"
      contain
      src="/images/pokemon-map.png"
      @click="openDialog"
    />

    <!--
    Carte de présentation du monde Pokémon
      * class="mb-6" ajoute une Marge en Bas de 6 unités
    -->
    <v-card class="mb-6">
      <v-card-text>
        <!--
        Sous-titres et paragraphes descriptifs sur l'univers Pokémon
          * class="text-h5" applique le style de titre h5 de Vuetify
          * class="mb-3" ajoute une Marge en Bas de 3 unités
          * class="mt-6" ajoute une Marge en Haut de 6 unités pour espacer les sections
        -->
        <h2 class="text-h5 mb-3">Un univers fascinant à découvrir</h2>
        <p>Le monde Pokémon est un vaste et merveilleux univers peuplé de créatures extraordinaires appelées Pokémon. Cette carte représente les différentes régions que les dresseurs peuvent explorer, chacune offrant ses propres défis, Pokémon uniques et aventures palpitantes.</p>

        <h2 class="text-h5 mb-3 mt-6">Des régions diversifiées</h2>
        <p>De Kanto à Galar, en passant par Johto, Hoenn, Sinnoh, Unova, Kalos et Alola, chaque région du monde Pokémon possède sa propre identité, sa culture et son écosystème unique. Les paysages varient des montagnes enneigées aux îles tropicales, offrant une diversité incroyable d'habitats pour les différentes espèces de Pokémon.</p>

        <h2 class="text-h5 mb-3 mt-6">Un monde en constante évolution</h2>
        <p>Le monde Pokémon est en perpétuelle expansion, avec de nouvelles régions, de nouvelles espèces de Pokémon et de nouvelles aventures qui sont régulièrement découvertes. Cette carte n'est qu'un aperçu d'un univers riche et en constante évolution, prêt à être exploré par les dresseurs audacieux.</p>

        <h2 class="text-h5 mb-3 mt-6">Un appel à l'aventure</h2>
        <p>Que vous soyez un dresseur débutant ou expérimenté, le monde Pokémon vous invite à partir à l'aventure. Capturez de nouveaux Pokémon, affrontez des champions d'arènes, déjouez les plans des équipes malveillantes et devenez peut-être le prochain Maître Pokémon. L'aventure commence ici, sur cette carte, mais où vous mènera-t-elle ?</p>
      </v-card-text>
    </v-card>

    <!--
    Dialogue pour afficher la carte en grand format
      * v-model="dialog" contrôle l'affichage du dialogue, si true le dialogue est ouvert
    -->
    <v-dialog v-model="dialog">
      <v-card>
        <!--
        Image de la carte en grand format dans le dialogue
          * alt pour l'accessibilité
          * contain ajuste l'image pour rester contenue dans la zone
        -->
        <v-img
          alt="Carte du monde Pokémon"
          contain
          src="/images/pokemon-map.png"
        />
        <v-card-actions>
          <v-spacer />
          <!--
          Bouton pour fermer le dialogue
            * text pour un style de bouton discret
            * @click met à false la variable dialog pour fermer le dialogue
          -->
          <v-btn color="primary" text @click="dialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  /*
  Déclaration de la variable réactive "dialog" pour contrôler l'affichage du dialogue
    - ref(false) initialise "dialog" à false (fermé par défaut)
*/
  const dialog = ref(false)

  /*
  Fonction pour ouvrir le dialogue
    - Définit dialog à true pour afficher le dialogue
*/
  const openDialog = () => {
    dialog.value = true
  }
</script>

<style scoped>
 /* changer le curseur en main au survol pour indiquer que l'élément est cliquable */
.cursor-pointer {
  cursor: pointer;
}
</style>
