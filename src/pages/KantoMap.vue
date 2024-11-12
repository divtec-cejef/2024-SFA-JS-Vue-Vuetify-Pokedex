<template>
  <!--
  Conteneur principal de la page avec la classe class="pokemon-world" pour gérer les marges
  -->
  <v-container class="pokemon-world">
    <!--
    Ligne pour centrer le contenu
      * justify="center" centre le contenu horizontalement
    -->
    <v-row justify="center">
      <!--
      Colonne contenant le titre, l'image et la carte descriptive
        * class="cols-12" pour occuper toute la largeur sur petit écran
        * class="md-10" pour occuper une largeur de 10 colonnes sur moyen écran
      -->
      <v-col cols="12" md="10">
        <!--
        Titre de la page
          * class="mb-6 text-center" ajoute une Marge en Bas de 6 unités et centre le texte
        -->
        <h1 class="mb-6 text-center">Le Monde Pokémon</h1>

        <!--
        Image de la carte du monde Pokémon
          * alt fournit une description pour l'accessibilité
          * class="mb-6 cursor-pointer" ajoute une Marge en Bas de 6 unités et transforme le curseur en pointeur pour signaler que l'image est cliquable
          * contain ajuste l'image pour être entièrement contenue dans la zone définie
          * max-height limite la hauteur de l'image à 500px
          * src définit le chemin de l'image
          * @click déclenche l'ouverture du dialogue d'image
        -->
        <v-img
          alt="Carte du monde Pokémon"
          class="mb-6 cursor-pointer"
          contain
          max-height="500"
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
              * class="text-h5 mb-3" applique le style de titre h5 de Vuetify et ajoute une Marge en Bas de 3 unités
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
      </v-col>
    </v-row>

    <!--
    Dialogue pour afficher la carte en grand format
      * v-model="dialog" contrôle l'affichage du dialogue
      * max-width limite la largeur maximale du dialogue à 800px
    -->
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <!--
        Image de la carte en grand format dans le dialogue
          * alt pour l'accessibilité
          * contain ajuste l'image pour rester contenue dans la zone
          * max-height limite la hauteur de l'image dans le dialogue
        -->
        <v-img
          alt="Carte du monde Pokémon"
          contain
          max-height="600"
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
/*
Styles personnalisés pour la page "Le Monde Pokémon"
  * .pokemon-world : ajoute des marges en haut et en bas de la page
  * .cursor-pointer : change le curseur pour indiquer que l'élément est cliquable
*/
.pokemon-world {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
