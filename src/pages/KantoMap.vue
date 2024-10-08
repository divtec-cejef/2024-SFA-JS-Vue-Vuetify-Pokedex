<template>
  <v-container class="pokemon-world">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <h1 class="mb-6 text-center">Le Monde Pokémon</h1>

        <v-img
          alt="Carte du monde Pokémon"
          class="mb-6 cursor-pointer"
          contain
          max-height="500"
          src="/images/pokemon-map.png"
          @click="openDialog"
        />

        <v-card class="mb-6">
          <v-card-text>
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

    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-img
          alt="Carte du monde Pokémon"
          contain
          max-height="600"
          src="/images/pokemon-map.png"
        />
        <v-card-actions>
          <v-spacer />
          <v-btn color="primary" text @click="dialog = false">Fermer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'

  const dialog = ref(false)

  const openDialog = () => {
    dialog.value = true
  }
</script>

<style scoped>
.pokemon-world {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
