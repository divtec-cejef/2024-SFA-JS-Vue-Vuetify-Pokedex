# Table des matières

- [jsconfig.json](#jsconfigjson)
- [index.html](#indexhtml)
- [vite.config.mjs](#viteconfigmjs)
- [README.md](#readmemd)
- [package.json](#packagejson)
- [typed-router.d.ts](#typed-routerdts)
- [src/App.vue](#src-appvue)
- [src/main.js](#src-mainjs)
- [src/plugins/index.js](#src-plugins-indexjs)
- [src/plugins/README.md](#src-plugins-readmemd)
- [src/plugins/vuetify.js](#src-plugins-vuetifyjs)
- [src/stores/pokemonStore.js](#src-stores-pokemonstorejs)
- [src/stores/index.js](#src-stores-indexjs)
- [src/stores/README.md](#src-stores-readmemd)
- [src/stores/authStore.js](#src-stores-authstorejs)
- [src/styles/README.md](#src-styles-readmemd)
- [src/styles/settings.scss](#src-styles-settingsscss)
- [src/components/PokemonCard.vue](#src-components-pokemoncardvue)
- [src/components/README.md](#src-components-readmemd)
- [src/components/AppHeader.vue](#src-components-appheadervue)
- [src/components/PokemonTypesChips.vue](#src-components-pokemontypeschipsvue)
- [src/components/PokemonStats.vue](#src-components-pokemonstatsvue)
- [src/components/SelectImageTest.vue](#src-components-selectimagetestvue)
- [src/pages/index.vue](#src-pages-indexvue)
- [src/pages/Login.vue](#src-pages-loginvue)
- [src/pages/README.md](#src-pages-readmemd)
- [src/pages/Favoris.vue](#src-pages-favorisvue)
- [src/pages/KantoMap.vue](#src-pages-kantomapvue)
- [src/pages/[...path].vue](#src-pages-[path]vue)
- [src/pages/FAQ.vue](#src-pages-faqvue)
- [src/pages/pokemon/add.vue](#src-pages-pokemon-addvue)
- [src/pages/pokemon/[id].vue](#src-pages-pokemon-[id]vue)
- [src/router/index.js](#src-router-indexjs)

## jsconfig.json

```json
{
  "compilerOptions": {
    "allowJs": true,
    "target": "es5",
    "module": "esnext",
    "baseUrl": "./",
    "moduleResolution": "bundler",
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  }
}

```

## index.html

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" href="/favicon.ico" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pokédex</title>
</head>

<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>

</html>

```

## vite.config.mjs

```mjs
// Plugins
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Fonts from 'unplugin-fonts/vite'
import Layouts from 'vite-plugin-vue-layouts'
import Vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/pokedex/',
  plugins: [
    VueRouter(),
    Layouts(),
    Vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Components(),
    Fonts({
      google: {
        families: [{
          name: 'Roboto',
          styles: 'wght@100;300;400;500;700;900',
        }],
      },
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 3000,
  },
})

```

## README.md

```md
# Vuetify (Default)

This is the official scaffolding tool for Vuetify, designed to give you a head start in building your new Vuetify application. It sets up a base template with all the necessary configurations and standard directory structure, enabling you to begin development without the hassle of setting up the project from scratch.

## ❗️ Important Links

- 📄 [Docs](https://vuetifyjs.com/)
- 🚨 [Issues](https://issues.vuetifyjs.com/)
- 🏬 [Store](https://store.vuetifyjs.com/)
- 🎮 [Playground](https://play.vuetifyjs.com/)
- 💬 [Discord](https://community.vuetifyjs.com)

## 💿 Install

Set up your project using your preferred package manager. Use the corresponding command to install the dependencies:

| Package Manager                                                | Command        |
|---------------------------------------------------------------|----------------|
| [yarn](https://yarnpkg.com/getting-started)                   | `yarn install` |
| [npm](https://docs.npmjs.com/cli/v7/commands/npm-install)     | `npm install`  |
| [pnpm](https://pnpm.io/installation)                          | `pnpm install` |
| [bun](https://bun.sh/#getting-started)                        | `bun install`  |

After completing the installation, your environment is ready for Vuetify development.

## ✨ Features

- 🖼️ **Optimized Front-End Stack**: Leverage the latest Vue 3 and Vuetify 3 for a modern, reactive UI development experience. [Vue 3](https://v3.vuejs.org/) | [Vuetify 3](https://vuetifyjs.com/en/)
- 🗃️ **State Management**: Integrated with [Pinia](https://pinia.vuejs.org/), the intuitive, modular state management solution for Vue.
- 🚦 **Routing and Layouts**: Utilizes Vue Router for SPA navigation and vite-plugin-vue-layouts for organizing Vue file layouts. [Vue Router](https://router.vuejs.org/) | [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)
- ⚡ **Next-Gen Tooling**: Powered by Vite, experience fast cold starts and instant HMR (Hot Module Replacement). [Vite](https://vitejs.dev/)
- 🧩 **Automated Component Importing**: Streamline your workflow with unplugin-vue-components, automatically importing components as you use them. [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)

These features are curated to provide a seamless development experience from setup to deployment, ensuring that your Vuetify application is both powerful and maintainable.

## 💡 Usage

This section covers how to start the development server and build your project for production.

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
yarn dev
```

(Repeat for npm, pnpm, and bun with respective commands.)

> Add NODE_OPTIONS='--no-warnings' to suppress the JSON import warnings that happen as part of the Vuetify import mapping. If you are on Node [v21.3.0](https://nodejs.org/en/blog/release/v21.3.0) or higher, you can change this to NODE_OPTIONS='--disable-warning=5401'. If you don't mind the warning, you can remove this from your package.json dev script.

### Building for Production

To build your project for production, use:

```bash
yarn build
```

(Repeat for npm, pnpm, and bun with respective commands.)

Once the build process is completed, your application will be ready for deployment in a production environment.

## 💪 Support Vuetify Development

This project is built with [Vuetify](https://vuetifyjs.com/en/), a UI Library with a comprehensive collection of Vue components. Vuetify is an MIT licensed Open Source project that has been made possible due to the generous contributions by our [sponsors and backers](https://vuetifyjs.com/introduction/sponsors-and-backers/). If you are interested in supporting this project, please consider:

- [Requesting Enterprise Support](https://support.vuetifyjs.com/)
- [Sponsoring John on Github](https://github.com/users/johnleider/sponsorship)
- [Sponsoring Kael on Github](https://github.com/users/kaelwd/sponsorship)
- [Supporting the team on Open Collective](https://opencollective.com/vuetify)
- [Becoming a sponsor on Patreon](https://www.patreon.com/vuetify)
- [Becoming a subscriber on Tidelift](https://tidelift.com/subscription/npm/vuetify)
- [Making a one-time donation with Paypal](https://paypal.me/vuetify)

## 📑 License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present Vuetify, LLC

```

## package.json

```json
{
  "name": "hello-world",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --fix --ignore-path .gitignore"
  },
  "dependencies": {
    "@mdi/font": "7.4.47",
    "axios": "^1.7.7",
    "core-js": "^3.37.1",
    "roboto-fontface": "*",
    "uuid": "^11.0.3",
    "uuidv4": "^6.2.13",
    "vue": "^3.4.31",
    "vuetify": "^3.6.11"
  },
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^8.8.0",
    "@typescript-eslint/parser": "^8.8.0",
    "@vitejs/plugin-vue": "^5.0.5",
    "@vue/eslint-config-typescript": "^13.0.0",
    "eslint": "^8.57.0",
    "eslint-config-standard": "^17.1.0",
    "eslint-config-vuetify": "^1.0.0",
    "eslint-plugin-import": "^2.29.1",
    "eslint-plugin-n": "^16.6.2",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-promise": "^6.4.0",
    "eslint-plugin-vue": "^9.27.0",
    "pinia": "^2.1.7",
    "sass": "1.77.6",
    "typescript": "^5.6.2",
    "typescript-eslint": "^8.8.0",
    "unplugin-auto-import": "^0.17.6",
    "unplugin-fonts": "^1.1.1",
    "unplugin-vue-components": "^0.27.2",
    "unplugin-vue-router": "^0.10.0",
    "vite": "^5.3.3",
    "vite-plugin-vue-layouts": "^0.11.0",
    "vite-plugin-vuetify": "^2.0.3",
    "vue-router": "^4.4.0"
  }
}

```

## typed-router.d.ts

```ts
/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...path]': RouteRecordInfo<'/[...path]', '/:path(.*)', { path: ParamValue<true> }, { path: ParamValue<false> }>,
    '/FAQ': RouteRecordInfo<'/FAQ', '/FAQ', Record<never, never>, Record<never, never>>,
    '/Favoris': RouteRecordInfo<'/Favoris', '/Favoris', Record<never, never>, Record<never, never>>,
    '/KantoMap': RouteRecordInfo<'/KantoMap', '/KantoMap', Record<never, never>, Record<never, never>>,
    '/Login': RouteRecordInfo<'/Login', '/Login', Record<never, never>, Record<never, never>>,
    '/pokemon/[id]': RouteRecordInfo<'/pokemon/[id]', '/pokemon/:id', { id: ParamValue<true> }, { id: ParamValue<false> }>,
    '/pokemon/add': RouteRecordInfo<'/pokemon/add', '/pokemon/add', Record<never, never>, Record<never, never>>,
  }
}

```

## src/App.vue

```vue
<template>
  <!--
  Conteneur principal de l'application utilisant Vuetify
    * <v-app> est l'enveloppe principale pour l'intégration des composants Vuetify
  -->
  <v-app>
    <!--
    Menu principal
      * Affiche la barre de navigation principale (header)
      * Inclut le composant personnalisé MenuPrincipal créer dans le fichier `src/components/AppHeader.vue`
    -->
    <menu-principal />

    <!--
    Section principale de l'application
      * <v-main> définit le conteneur principal pour afficher le contenu de l'application
      * <router-view> est une zone de rendu dynamique utilisée par Vue Router
        pour afficher les composants des routes actuelles
    -->
    <v-main>
      <router-view />
    </v-main>
    <!--
    Pied de page de l'application
      * <v-footer> : Composant Vuetify pour un pied de page réactif et stylisé.
      * <div> : Conteneur pour le contenu du pied de page.
        - class="px-4" : Ajoute un padding horizontal (4 * 4px = 16px) pour espacer le contenu des bords.
        - class="text-center" : Centre le texte horizontalement.
        - class="w-100" : Assure que le conteneur occupe toute la largeur disponible.
    -->
    <v-footer>
      <div class="px-4 text-center w-100">2024 - Pokedex</div>
    </v-footer>
  </v-app>
</template>

<script setup>
  // Importation du composant MenuPrincipal pour l'en-tête de l'application
  import MenuPrincipal from '@/components/AppHeader.vue'
  // Importation du lifecycle hook `onMounted` pour exécuter du code après que le composant a été monté
  import { onMounted } from 'vue'
  // Importation du magasin Pinia pour gérer les données des Pokémon
  import { usePokemonStore } from '@/stores/pokemonStore'

  // Actions à effectuer après le montage du composant (onMounted)
  onMounted(() => {
    // Récupération du magasin des Pokémon
    const pokemonStore = usePokemonStore()

    // Chargement des favoris depuis le localStorage
    pokemonStore.loadFavorites()
  })
</script>

```

## src/main.js

```js
/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

```

## src/plugins/index.js

```js
/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}

```

## src/plugins/README.md

```md
# Plugins

Plugins are a way to extend the functionality of your Vue application. Use this folder for registering plugins that you want to use globally.

```

## src/plugins/vuetify.js

```js
/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
  },
})

```

## src/stores/pokemonStore.js

```js
/**
 * @file Gestionnaire de magasin pour les Pokémon.
 * Utilise Pinia pour gérer les types de Pokémon, la liste des Pokémon,
 * ainsi que des fonctionnalités comme la sélection et les favoris.
 * @version 1.1
 * @since 2024-01-31
 */

import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid' // Librairie pour générer des identifiants uniques (UUID).

/**
 * Liste des types de Pokémon avec leurs couleurs associées.
 * Chaque type possède un identifiant, un nom, et une couleur pour l'affichage visuel.
 * @type {Array<{id: number, name: string, color: string}>}
 */
const types = [
  { id: 1, name: 'Électrique', color: '#FFD700' },
  { id: 2, name: 'Plante', color: '#78C850' },
  { id: 3, name: 'Poison', color: '#A040A0' },
  { id: 4, name: 'Feu', color: '#F08030' },
  { id: 5, name: 'Eau', color: '#6890F0' },
  { id: 6, name: 'Normal', color: '#A8A878' },
  { id: 7, name: 'Fée', color: '#EE99AC' },
  { id: 8, name: 'Spectre', color: '#705898' },
  { id: 9, name: 'Combat', color: '#C03028' },
  { id: 10, name: 'Vol', color: '#A890F0' },
  { id: 11, name: 'Glace', color: '#98D8D8' },
  { id: 12, name: 'Roche', color: '#B8A038' },
  { id: 13, name: 'Sol', color: '#E0C068' },
  { id: 14, name: 'Psy', color: '#F85888' },
]

/**
 * Liste des Pokémon avec leurs caractéristiques.
 * Chaque Pokémon possède un identifiant (UUID), un nom, un ou plusieurs types,
 * des statistiques, et une description.
 * @type {Array<{id: string, name: string, types: number[], level: number, img: string, description: string, stats: {hp: number, attack: number, defense: number, speed: number}}>}
 */
const pokemons = [
  {
    id: '5566710e-29c7-43cc-ba04-46415a63e1ef',
    name: 'Pikachu',
    types: [
      1,
    ],
    level: 35,
    img: 'pikachu.png',
    description: "Pikachu stocke de l'électricité dans ses joues. Il peut produire des décharges électriques puissantes.",
    stats: {
      hp: 35,
      attack: 55,
      defense: 40,
      speed: 90,
    },
  },
  {
    id: '36289749-333c-4c29-aa9c-cae432eeabcb',
    name: 'Bulbizarre',
    types: [
      2,
      3,
    ],
    level: 15,
    img: 'bulbizarre.png',
    description: 'Il y a une graine sur son dos depuis sa naissance. Elle grossit un peu chaque jour.',
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      speed: 45,
    },
  },
  {
    id: 'e6b24211-9016-46e2-b35e-50c8755add54',
    name: 'Salamèche',
    types: [
      4,
    ],
    level: 20,
    img: 'salameche.png',
    description: "La flamme au bout de sa queue indique l'humeur de ce Pokémon. Elle vacille quand Salamèche est content.",
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
      speed: 65,
    },
  },
  {
    id: '8bb39dba-4e85-4f28-b943-474da5c188db',
    name: 'Carapuce',
    types: [
      5,
    ],
    level: 10,
    img: 'carapuce.png',
    description: 'Carapuce est une petite tortue bipède de couleur bleue. Il possède une carapace majoritairement brune avec un contour blanc.',
    stats: {
      hp: 44,
      attack: 48,
      defense: 65,
      speed: 43,
    },
  },
  {
    id: 'a6171313-2035-4a89-90a2-dfa8dc0deefe',
    name: 'Rondoudou',
    types: [
      6,
      7,
    ],
    level: 25,
    img: 'rondoudou.png',
    description: "Quand ses grands yeux s'illuminent, il chante une mystérieuse berceuse qui endort ses ennemis.",
    stats: {
      hp: 115,
      attack: 45,
      defense: 20,
      speed: 20,
    },
  },
  {
    id: '06ea20b3-3923-455c-b507-acf7d2c025b8',
    name: 'Ectoplasma',
    types: [
      8,
      3,
    ],
    level: 45,
    img: 'ectoplasma.png',
    description: "Ectoplasma peut hypnotiser son adversaire en le fixant de ses yeux rouges. Il attaque ensuite en se cachant dans l'ombre de l'ennemi.",
    stats: {
      hp: 60,
      attack: 65,
      defense: 60,
      speed: 110,
    },
  },
  {
    id: 'cebcebb3-2c37-43ae-a8d2-bb64156d54d4',
    name: 'Évoli',
    types: [
      6,
      9,
    ],
    level: 22,
    img: 'evoli.png',
    description: 'Évoli possède une structure génétique instable qui se transforme selon son environnement.',
    stats: {
      hp: 55,
      attack: 55,
      defense: 50,
      speed: 55,
    },
  },
  {
    id: '20687952-9306-4113-aeb4-16b36b77fdfc',
    name: 'Dracaufeu',
    types: [
      4,
      10,
    ],
    level: 50,
    img: 'dracaufeu.png',
    description: "Dracaufeu parcourt les cieux pour trouver des adversaires à sa mesure. Il crache de puissantes flammes capables de faire fondre n'importe quoi.",
    stats: {
      hp: 78,
      attack: 84,
      defense: 78,
      speed: 100,
    },
  },
  {
    id: 'c7f21895-d59f-401e-b0f8-49bd94ccd09c',
    name: 'Florizarre',
    types: [
      2,
      3,
    ],
    level: 55,
    img: 'florizarre.png',
    description: 'Sa plante donne une grosse fleur quand elle absorbe les rayons du soleil. Il est toujours à la recherche des endroits les plus ensoleillés.',
    stats: {
      hp: 80,
      attack: 82,
      defense: 83,
      speed: 80,
    },
  },
  {
    id: 'f749b5c4-4ffe-4151-a913-09f1ce791c24',
    name: 'Tortank',
    types: [
      5,
    ],
    level: 52,
    img: 'tortank.png',
    description: "Il écrase ses adversaires de tout son poids pour les faire évanouir. Il rentre dans sa carapace s'il se sent en danger.",
    stats: {
      hp: 79,
      attack: 83,
      defense: 100,
      speed: 78,
    },
  },
]

/**
 * Magasin Pinia pour gérer les données des Pokémon.
 * Fournit des fonctionnalités pour accéder, manipuler et afficher les données des Pokémon,
 * ainsi que pour gérer les favoris.
 */
export const usePokemonStore = defineStore('pokemon', {
  // État initial du magasin.
  state: () => ({
    types, // Liste des types de Pokémon.
    pokemons, // Liste des Pokémon.
    selectedPokemon: null, // Pokémon actuellement sélectionné.
    favorites: [], // ID des Pokémon favoris.
  }),

  // Getters pour accéder aux données calculées.
  getters: {
    /**
     * Récupère un type de Pokémon à partir de son identifiant.
     * @param {Object} state - L'état actuel du magasin.
     * @returns {Object} Le type correspondant à l'identifiant.
     */
    getTypeById: state => id => state.types.find(type => type.id === id),

    /**
     * Récupère les Pokémon triés par nom dans l'ordre alphabétique.
     * @param state - L'état act
     * @returns {*} Liste des Pokémon triés par nom.
     */
    getPokemonsSortByNameASC: state => state.pokemons.sort((a, b) => a.name.localeCompare(b.name)),

    /**
     * Vérifie si un Pokémon donné est dans la liste des favoris.
     * @param {Object} state - L'état actuel du magasin.
     * @returns {boolean} `true` si le Pokémon est favori, sinon `false`.
     */
    isFavorite: state => pokemon => state.favorites.some(favId => favId === pokemon.id),

    /**
     * Récupère les Pokémon dont l'identifiant est dans la liste des favoris.
     * @param state - L'état actuel du magasin.
     * @returns {*} Liste des Pokémon favoris.
     */
    getFavorites: state => state.favorites.map(id => state.getPokemonsSortByNameASC.find(p => p.id === id)),
  },

  // Actions pour modifier l'état.
  actions: {
    /**
     * Ajoute un nouveau Pokémon à la liste.
     * Vérifie que le nom et le niveau sont valides et que le nom est unique.
     * @param {Object} pokemon - Objet Pokémon à ajouter.
     * @returns {Object} Résultat de l'opération avec succès ou message d'erreur.
     */
    addPokemon (pokemon) {
      if (!pokemon.name || !pokemon.level) {
        return { success: false, message: 'Le nom et le niveau du Pokémon sont obligatoires' }
      }
      if (this.pokemons.some(p => p.name.toLowerCase() === pokemon.name.toLowerCase())) {
        return { success: false, message: 'Le nom du Pokémon est déjà utilisé' }
      }
      pokemon.id = uuidv4() // Génère un identifiant unique.
      this.pokemons.push(pokemon)
      return { success: true, message: 'Pokémon ajouté avec succès' }
    },

    /**
     * Supprime un Pokémon de la liste et des favoris s'il est trouvé.
     * @param pokemonId - Id du pokémon à supprimer.
     * @returns {{success: boolean, message: string}} - Résultat de l'opération avec succès ou message d'erreur.
     */
    deletePokemon (pokemonId) {
      const index = this.pokemons.findIndex(p => p.id === pokemonId)
      // Supprime le Pokémon de la liste s'il est trouvé.
      if (index !== -1) {
        this.pokemons.splice(index, 1)
      } else {
        return { success: false, message: 'Pokémon introuvable' }
      }
      // Supprime le Pokémon des favoris s'il est favori.
      const favIndex = this.favorites.findIndex(favId => favId === pokemonId)
      if (favIndex !== -1) {
        this.favorites.splice(favIndex, 1)
        localStorage.setItem('favorites', JSON.stringify(this.favorites))
      }
      // Retourne un message de succès.
      return { success: true, message: 'Pokémon supprimé avec succès' }
    },

    /**
     * Sélectionne un Pokémon à partir de son identifiant.
     * @param {string} id - Identifiant du Pokémon.
     * @returns {boolean} `true` si le Pokémon est trouvé, sinon `false`.
     */
    selectPokemonById (id) {
      const pokemon = this.pokemons.find(p => p.id === id)
      if (pokemon) {
        this.selectedPokemon = pokemon
        return true
      }
      this.selectedPokemon = null
      return false
    },

    /**
     * Charge la liste des favoris depuis le `localStorage`.
     * Supprime les favoris obsolètes qui ne sont plus dans la liste actuelle.
     */
    loadFavorites () {
      this.favorites = JSON.parse(localStorage.getItem('favorites')) || []
      this.favorites = this.favorites.filter(idPokemeon => this.pokemons.some(p => p.id === idPokemeon))
    },

    /**
     * Ajoute ou retire un Pokémon des favoris.
     * @param {Object} pokemon - Pokémon à ajouter ou retirer.
     */
    toggleFavorite (pokemon) {
      const index = this.favorites.findIndex(fav => fav === pokemon.id)
      if (index === -1) {
        this.favorites.push(pokemon.id)
      } else {
        this.favorites.splice(index, 1)
      }
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },
  },
})

```

## src/stores/index.js

```js
// Utilities
import { createPinia } from 'pinia'

export default createPinia()

```

## src/stores/README.md

```md
# Store

Pinia stores are used to store reactive state and expose actions to mutate it.

Full documentation for this feature can be found in the Official [Pinia](https://pinia.esm.dev/) repository.

```

## src/stores/authStore.js

```js
/**
 * @file Magasin d'authentification factice
 * Utilise Pinia pour gérer les états et actions liés à l'authentification des utilisateurs.
 * Ce magasin simule la connexion et la déconnexion avec des données factices.
 * Remarque : en production, ce magasin doit être remplacé par une intégration avec une API réelle.
 * @version 1.0
 * @since 2024-01-31
 */

import { defineStore } from 'pinia'

/**
 * Données factices utilisées pour simuler l'authentification.
 * Inclut un utilisateur factice, un mot de passe, et un jeton d'authentification.
 */
const utilisateurFactice = {
  email: 'sacha@pokemon.com', // Email de l'utilisateur pour la simulation.
  name: 'Sacha Ketchum', // Nom de l'utilisateur simulé.
}

const passwordFactice = 'pika' // Mot de passe correspondant à l'utilisateur factice.
const tokenFactice = '0b042934e5df02c9786efb364d946e64' // Jeton factice simulant une session active.

/**
 * Magasin Pinia pour gérer l'état d'authentification.
 * Fournit des fonctionnalités pour simuler la connexion, la déconnexion et vérifier l'état de connexion.
 */
export const useAuthStore = defineStore('auth', {
  /**
   * État initial du magasin
   * - `user` : Informations sur l'utilisateur actuellement connecté (null si non connecté).
   * - `token` : Jeton d'authentification (null si non connecté).
   */
  state: () => ({
    user: null, // Représente les données de l'utilisateur connecté.
    token: null, // Contient le jeton d'authentification si connecté.
  }),

  /**
   * Actions pour modifier l'état du magasin.
   * Inclut des méthodes pour la gestion de la connexion et de la déconnexion.
   */
  actions: {
    /**
     * Simule la connexion d'un utilisateur.
     * Vérifie les identifiants par rapport aux données factices et met à jour l'état en cas de succès.
     * @param {string} email - Adresse email saisie par l'utilisateur.
     * @param {string} password - Mot de passe saisi par l'utilisateur.
     * @returns {Object} Résultat de la tentative de connexion (succès ou échec).
     */
    login (email, password) {
      if (email === utilisateurFactice.email && password === passwordFactice) {
        // Mise à jour de l'état en cas de succès.
        this.user = utilisateurFactice
        this.token = tokenFactice
        return {
          success: true,
          message: 'Connexion réussie',
        }
      } else {
        // Réinitialisation de l'état en cas d'échec.
        this.user = null
        this.token = null
        return {
          success: false,
          message: 'Mauvais email ou mot de passe !',
        }
      }
    },

    /**
     * Simule la déconnexion de l'utilisateur.
     * Réinitialise l'état du magasin pour supprimer les informations de l'utilisateur et le jeton.
     * @returns {Object} Confirmation de la déconnexion.
     */
    logout () {
      this.user = null
      this.token = null
      return {
        success: true,
        message: 'Déconnexion réussie',
      }
    },
  },

  /**
   * Getters pour accéder aux données calculées basées sur l'état.
   */
  getters: {
    /**
     * Vérifie si un utilisateur est connecté.
     * Retourne `true` si un token est présent, sinon `false`.
     * @param {Object} state - État actuel du magasin.
     * @returns {boolean} Indique si l'utilisateur est authentifié.
     */
    isAuthenticated: state => !!state.token,
  },
})

```

## src/styles/README.md

```md
# Styles

This directory is for configuring the styles of the application.

```

## src/styles/settings.scss

```scss
/**
 * src/styles/settings.scss
 *
 * Configures SASS variables and Vuetify overwrites
 */

// https://vuetifyjs.com/features/sass-variables/`
// @use 'vuetify/settings' with (
//   $color-pack: false
// );


/* Animation pour une puce ou bouton sélectionné */
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
/* Animation pour style battement de coeur */
@keyframes heartbeat {
  0%, 100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.5);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(2);
  }
}
/* Animation style rétrécissement */
@keyframes shrink {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.1);
  }
  100% {
    transform: scale(1);
  }
}

```

## src/components/PokemonCard.vue

```vue
<template>
  <!--
  Carte Pokémon cliquable redirigeant vers une page de détails.
    * v-card : Composant Vuetify pour créer une carte stylisée.
    * :to : Génère dynamiquement un lien basé sur l'identifiant unique du Pokémon (`pokemon.id`).
    * class="pt-4" : Ajoute un padding en haut (4 unités) pour espacer le contenu.
  -->
  <v-card class="pt-4" :to="`/pokemon/${pokemon.id}`">
    <!--
    Image du Pokémon ou image par défaut si aucune image n'est fournie.
      * v-img : Composant Vuetify pour afficher des images avec mise à l'échelle.
      * v-if/v-else : Affiche une image spécifique si elle existe, sinon une image de Pokéball par défaut.
      * contain : Adapte l'image pour qu'elle soit entièrement visible dans le conteneur.
      * height="200px" : Définit une hauteur fixe pour une présentation uniforme.
      * :src : Lien dynamique vers l'image.
    -->
    <v-img v-if="pokemon.img" contain height="200px" :src="`images/${pokemon.img}`" />
    <v-img v-else contain height="200px" src="/images/pokeball.png" />

    <!--
    Titre de la carte affichant le nom du Pokémon.
      * v-card-title : Composant Vuetify pour styliser un titre dans une carte.
      * Interpolation Vue : Affiche dynamiquement le nom du Pokémon.
    -->
    <v-card-title>{{ pokemon.name }}</v-card-title>

    <!--
    Sous-titre de la carte contenant des informations supplémentaires.
      * v-card-subtitle : Composant Vuetify pour styliser une section sous le titre principal.
    -->
    <v-card-subtitle>
      <!--
      Composant personnalisé pour afficher les types du Pokémon sous forme de puces.
        * :pokemon : Passe l'objet Pokémon en tant que prop au composant enfant `pokemon-types-chips`.
      -->
      <pokemon-types-chips :pokemon="pokemon" />

      <!--
      Niveau du Pokémon affiché sous forme de texte simple.
        * v-card-text : Composant Vuetify pour afficher du texte dans une carte.
      -->
      <v-card-text>Level: {{ pokemon.level }}</v-card-text>

      <!--
      Section des actions de la carte (ajouter aux favoris, supprimer).
        * v-card-actions : Composant Vuetify pour organiser les actions associées à la carte.
      -->
      <v-card-actions>
        <!--
        Bouton pour ajouter ou retirer le Pokémon des favoris.
          * v-btn : Bouton Vuetify avec une icône intégrée.
          * icon : Style de bouton compact avec une icône.
          * @click.prevent : Empêche l'action par défaut et appelle `pokemonStore.toggleFavorite`.
        -->
        <v-btn icon @click.prevent="pokemonStore.toggleFavorite(pokemon)">
          <!--
          Icône dynamique selon l'état de favori du Pokémon.
            * v-icon : Composant Vuetify pour afficher des icônes.
            * :color : Change dynamiquement la couleur en rouge si le Pokémon est marqué comme favori.
            * Interpolation Vue : Alterne entre `mdi-heart` et `mdi-heart-outline`.
          -->
          <v-icon :color="pokemonStore.isFavorite(pokemon) ? 'red' : ''">
            {{ pokemonStore.isFavorite(pokemon) ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>

        <!--
        Bouton pour demander confirmation avant de supprimer le Pokémon.
          * v-if : Affiche le bouton uniquement si l'utilisateur est authentifié.
          * v-btn : Bouton Vuetify avec une icône intégrée.
          * @click.prevent : Empêche l'action par défaut et appelle `confirmDelete`.
        -->
        <v-btn
          v-if="authStore.isAuthenticated"
          icon
          @click.prevent="confirmDelete(pokemon.id)"
        >
          <!-- Icône pour indiquer la suppression -->
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card-subtitle>
  </v-card>

  <!--
  Dialog de confirmation pour supprimer un Pokémon.
    * v-dialog : Composant Vuetify pour afficher une boîte de dialogue modale.
    * v-model : Liaison bidirectionnelle pour gérer l'affichage de la boîte de dialogue.
    * max-width="400" : Limite la largeur de la boîte de dialogue à 400px.
  -->
  <v-dialog v-model="dialogDelete" max-width="400">
    <!-- Contenu de la boîte de dialogue -->
    <v-card>
      <!-- Titre de la boîte de dialogue -->
      <v-card-title class="text-h6">Confirmer la suppression</v-card-title>
      <!-- Message de confirmation -->
      <v-card-text>
        Êtes-vous sûr de vouloir supprimer ce Pokémon ?
      </v-card-text>
      <!-- Actions de la boîte de dialogue -->
      <v-card-actions>
        <!--
        Bouton pour annuler la suppression.
          * color="primary" : Bouton avec un style bleu.
          * text : Bouton textuel.
          * @click : Ferme la boîte de dialogue en mettant `dialogDelete` à `false`.
        -->
        <v-btn color="primary" text @click="dialogDelete = false">Annuler</v-btn>
        <!--
        Bouton pour confirmer la suppression.
          * color="red" : Bouton avec un style rouge pour indiquer une action dangereuse.
          * text : Bouton textuel.
          * @click : Appelle `pokemonStore.deletePokemon` avec l'identifiant du Pokémon à supprimer.
        -->
        <v-btn color="red" text @click="pokemonStore.deletePokemon(idPokemonToDelete)">
          Supprimer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
  import PokemonTypesChips from '@/components/PokemonTypesChips.vue'
  import { usePokemonStore } from '@/stores/pokemonStore'
  import { useAuthStore } from '@/stores/authStore'
  import { ref } from 'vue'

  // Initialisation des magasins Pinia
  const pokemonStore = usePokemonStore() // Gère les données des Pokémon.
  const authStore = useAuthStore() // Gère l'état d'authentification.

  // Props attendues pour le composant
  defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
  })

  // Gestion de l'affichage de la boîte de dialogue et de l'identifiant du Pokémon à supprimer
  const dialogDelete = ref(false) // État de la boîte de dialogue
  const idPokemonToDelete = ref(null) // Identifiant du Pokémon à supprimer

  // Fonction pour afficher le dialog de confirmation avant suppression
  function confirmDelete (id) {
    idPokemonToDelete.value = id // Enregistre l'identifiant du Pokémon à supprimer.
    dialogDelete.value = true // Affiche le dialog.
  }
</script>

<style scoped>
/* Animation pour l'icône de favori */
.mdi-heart {
  animation: heartbeat 1s ease-in-out;
}

/* Animation pour l'icône de suppression */
.mdi-heart-outline {
  animation: shrink 0.6s ease-in-out;
}
</style>

```

## src/components/README.md

```md
# Components

Vue template files in this folder are automatically imported.

## 🚀 Usage

Importing is handled by [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components). This plugin automatically imports `.vue` files created in the `src/components` directory, and registers them as global components. This means that you can use any component in your application without having to manually import it.

The following example assumes a component located at `src/components/MyComponent.vue`:

```vue
<template>
  <div>
    <MyComponent />
  </div>
</template>

<script lang="ts" setup>
  //
</script>
```

When your template is rendered, the component's import will automatically be inlined, which renders to this:

```vue
<template>
  <div>
    <MyComponent />
  </div>
</template>

<script lang="ts" setup>
  import MyComponent from '@/components/MyComponent.vue'
</script>
```

```

## src/components/AppHeader.vue

```vue
<template>
  <!--
  Barre d'application plate
    * flat supprime l'ombre sous la barre
  -->
  <v-app-bar flat>
    <!--
    Conteneur de la barre d'application
      * class="d-flex align-start align-center" aligne les éléments de manière flexible, alignés en haut et centrés verticalement
    -->
    <v-container class="d-flex align-start align-center">
      <!--
      Logo de l'application cliquable
        * class="mr-4 pa-0 cursor-pointer" ajoute une marge à droite, retire le padding, et change le curseur pour indiquer la cliquabilité
        * image définit le chemin vers le logo (Pokeball) de l'application
        * size="64" définit la taille de l'avatar
        * @click redirige vers la page d'accueil
      -->
      <v-avatar
        class="mr-4 pa-0 cursor-pointer"
        image="@/assets/pokeball.svg"
        size="64"
        @click="$router.push('/')"
      />

      <!-- Titre de l'application affiché dans la barre -->
      <v-toolbar-title>Pokedex</v-toolbar-title>

      <!--
      Liens de navigation générés dynamiquement
        * v-for parcourt chaque élément dans menuItems pour créer un lien de navigation
        * :key utilise link.title pour définir une clé unique par lien
        * :icon affiche l'icône spécifiée pour chaque lien
        * :to utilise le chemin vers la route spécifiée pour chaque lien
      -->
      <v-btn
        v-for="link in menuItems"
        :key="link.title"
        :icon="link.icon"
        :to="link.path"
      />

      <!--
      Bouton de déconnexion
        * v-if="authStore.isAuthenticated" affiche le bouton si l'utilisateur est connecté
        * icon="mdi-logout" affiche l'icône de déconnexion
        * @click déclenche la fonction de déconnexion (logout)
      -->
      <v-btn
        v-if="authStore.isAuthenticated"
        icon="mdi-logout"
        @click="logout"
      />

      <!--
      Bouton de connexion (affiché si l'utilisateur n'est pas connecté)
        * v-else affiche ce bouton seulement si authStore.isAuthenticated n'existe pas
        * icon="mdi-login" affiche l'icône de connexion
        * @click redirige vers la page de connexion
      -->
      <v-btn
        v-else
        icon="mdi-login"
        @click="$router.push('/login')"
      />
    </v-container>
  </v-app-bar>

  <!--
  Notification de déconnexion réussie
    * v-model="snackbar" contrôle la visibilité du snackbar
    * color="success" applique une couleur de succès (verte) au snackbar
  -->
  <v-snackbar
    v-model="snackbar"
    color="success"
  >
    Déconnexion réussie !
  </v-snackbar>
</template>

<script setup>
  import router from '@/router'
  import { useAuthStore } from '@/stores/authStore'
  import { ref } from 'vue'

  // Utilisation du authStore pour gérer l'état de connexion de l'utilisateur
  const authStore = useAuthStore()

  /*
Définition des éléments de menu pour la navigation
  - Chaque élément contient :
    * title : le titre du lien
    * path : le chemin de la route
    * icon : l'icône du lien
*/
  const menuItems = [
    { title: 'Accueil', path: '/', icon: 'mdi-pokeball' },
    { title: 'Favoris', path: '/favoris', icon: 'mdi-heart' },
    { title: 'FAQ', path: '/faq', icon: 'mdi-frequently-asked-questions' },
    { title: 'Kanto', path: '/kantomap', icon: 'mdi-map' },
  ]

  // État pour contrôler l'affichage du snackbar de déconnexion
  const snackbar = ref(false)

  /*
Fonction de déconnexion
- Affiche le snackbar de déconnexion
- Déconnecte l'utilisateur en appelant la méthode logout() du authStore
- Redirige l'utilisateur vers la page d'accueil après la déconnexion
*/
  function logout () {
    snackbar.value = true // Afficher la notification de déconnexion
    authStore.logout() // Appeler la méthode de déconnexion du authStore
    router.push('/') // Rediriger l'utilisateur vers la page d'accueil
  }
</script>

```

## src/components/PokemonTypesChips.vue

```vue
<template>
  <!-- Conteneur principal affichant les types d'un Pokémon -->
  <div>
    <!--
    Puce pour chaque type de Pokémon
      * v-for : Parcourt le tableau des types associés au Pokémon pour afficher chaque type sous forme de puce.
      * :key="type.id" : Utilise `type.id` comme clé unique pour optimiser le rendu.
      * class="ma-1" : Ajoute une marge uniforme autour de chaque puce (1 unité).
      * :color : Définit dynamiquement la couleur de la puce à partir de la propriété `color` du type (valeur par défaut : 'grey').
      * text-color="white" : Rend le texte des puces blanc pour un meilleur contraste.
    -->
    <v-chip
      v-for="type in thisPokemonTypes"
      :key="type.id"
      class="ma-1"
      :color="type?.color || 'grey'"
      text-color="white"
    >
      <!-- Affiche le nom du type ou "Inconnu" si le type est introuvable -->
      {{ type?.name || 'Inconnu' }}
    </v-chip>
  </div>
</template>

<script setup>
/*
Importation des dépendances nécessaires :
- defineProps : Permet de définir les propriétés reçues par le composant.
- usePokemonStore : Fournit l'accès au magasin Pinia pour récupérer les données des types.
*/
  import { computed, defineProps } from 'vue'
  import { usePokemonStore } from '@/stores/pokemonStore'

  // Définition des propriétés du composant
  const props = defineProps({
    pokemon: {
      // Objet représentant un Pokémon. Contient un tableau `types` listant les identifiants des types associés.
      type: Object,
      required: true, // Cette propriété est obligatoire pour le bon fonctionnement du composant.
    },
  })

  // Initialisation du magasin Pinia
  const pokemonStore = usePokemonStore()

  /*
Récupération des types associés au Pokémon
  - Utilise computed pour créer une propriété réactive.
    Ainsi, si les types du Pokémon changent, cette propriété sera mise à jour automatiquement.
  - Parcourt les identifiants des types (`props.pokemon.types`) et récupère leurs données depuis le magasin.
  - Fournit un tableau de types avec leurs propriétés (`name`, `color`, etc.).
*/
  const thisPokemonTypes = computed(() =>
    props.pokemon.types.map(typeId => pokemonStore.getTypeById(typeId))
  )
</script>

<style scoped>
/*
Styles locaux :
- ma-1 : Classe Vuetify ajoutant une marge uniforme autour de chaque puce.
*/
</style>

```

## src/components/PokemonStats.vue

```vue
<template>
  <!-- Conteneur principal des statistiques -->
  <div class="pokemon-stats">
    <!-- Boucle pour afficher chaque statistique avec son titre et sa barre de progression -->
    <v-list-item v-for="(value, key) in stats" :key="key">
      <!-- Affichage du nom de la statistique et de sa valeur -->
      <v-list-item-title>{{ key.toUpperCase() }}: {{ value }}</v-list-item-title>

      <!-- Barre de progression avec couleur directement liée à la statistique -->
      <v-progress-linear
        :color="statColors[key] || 'grey'"
        height="25"
        :model-value="value"
      >
        <strong>{{ value }}</strong>
      </v-progress-linear>
    </v-list-item>
  </div>
</template>

<script setup>
/**
 * Composant `PokemonStats`
 * Gère l'affichage des statistiques des Pokémon avec des barres de progression colorées.
 */

// Propriétés (props) du composant
  defineProps({
    stats: {
      type: Object, // Objet contenant les statistiques (par ex. : { hp: 45, attack: 60 }).
      required: true, // Les statistiques sont nécessaires pour ce composant.
    },
  })

  /**
   * Couleurs associées aux statistiques des Pokémon.
   * Ces couleurs sont utilisées directement dans le template.
   */
  const statColors = {
    hp: '#FF5959', // Rouge doux pour la santé.
    attack: '#C03028', // Rouge sombre pour l'attaque.
    defense: '#6890F0', // Bleu clair pour la défense.
    speed: '#F08030', // Orange vif pour la vitesse.
    special: '#78C850', // Vert pour les capacités spéciales.
  }
</script>

<style scoped>
/* Styles locaux pour améliorer la présentation */
.pokemon-stats {
  margin-top: 1rem; /* Ajout d'espace au-dessus du conteneur */
}

.v-list-item {
  margin-bottom: 1rem; /* Ajout d'espace entre les statistiques */
}
</style>

```

## src/components/SelectImageTest.vue

```vue
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
  /* L'animation 'selectAnimation' est définie dans le fichier global src/style/styles.css */
  animation: selectAnimation 0.3s ease-in-out;
}
</style>

```

## src/pages/index.vue

```vue
<template>
  <!-- Conteneur principal pour structurer la disposition de la page -->
  <v-container>
    <!--
    Titre de la page
      * mb-6 permet d'ajouter une Marge en Bas de 6 unités
      * text-center permet de centrer le texte
    -->
    <h1 class="mb-6 text-center">
      Pokédex
      <!--
      bouton pour ajouter un pokémon
        * aria-label permet d'ajouter une description pour les lecteurs d'écran utilisés par les personnes malvoyantes
        * v-tooltip permet d'afficher une info-bulle au survol du bouton
        * @click permet de naviguer vers la page d'ajout de pokémon
      -->
      <v-btn
        v-tooltip.bottom="'Ajouter un Pokémon'"
        aria-label="Ajouter un Pokémon"
        class="ml-4"
        color="primary"
        icon="mdi-plus"
        @click="$router.push('pokemon/add')"
      />
    </h1>

    <!--
    Champ de texte pour la recherche de Pokémon
      * v-model lie bidirectionnellement la valeur de la recherche (search) avec l'entrée utilisateur
      * clearable ajoute une icône pour effacer rapidement le champ
      * label affiche un texte indicatif pour guider l'utilisateur
      * prepend-icon ajoute une icône "loupe" (mdi-magnify) à gauche du champ
    -->
    <v-text-field
      v-model="search"
      clearable
      label="Trouver un Pokémon"
      prepend-icon="mdi-magnify"
    />

    <!--
    Grille pour afficher les cartes des Pokémon
      * v-row crée une rangée pour organiser les colonnes des cartes
    -->
    <v-row>
      <!--
      Affiche les cartes des pokémons
      * v-for permet de parcourir les pokémons
      * :key permet de donner une clé unique à chaque pokémon
      * cols définit la taille par défaut d'une colonne sur un maximum de 12 cols
        si on met cols="6" un colonne occupe au maximum la moitié de la grille (12/6=2)
        Ici on met cols="12" pour que chaque carte puisse occuper toute la largeur de la grille
      * xl, lg, md, sm, xs permettent de définir le nombre de colonnes max pour chaque taille d'écran
        par exmple lg="3" signifie que sur grand écran on affiche 4 cartes par ligne (12/3=4)
        https://vuetifyjs.com/en/components/grids/
      -->
      <v-col
        v-for="pokemon in filteredPokemons"
        :key="pokemon.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
        xl="2"
        xs="12"
        xxl="2"
      >
        <!--
        composant "maison" de carte de pokémon
          * :pokemon permet de passer le pokémon à afficher au composant via une prop
          * le composant PokemonCard est dans le dossier src/components/PokemonCard.vue
        -->
        <pokemon-card :pokemon="pokemon" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  // Importation des dépendances nécessaires
  import { computed, ref } from 'vue' // Importe computed pour créer une propriété calculée
  import { usePokemonStore } from '@/stores/pokemonStore' // Importe le magasin Pinia des Pokémons
  import PokemonCard from '@/components/PokemonCard.vue' // Importe le composant de carte des Pokémons

  // Initialisation du magasin Pinia des Pokémons
  const pokemonStore = usePokemonStore()

  // Récupération des Pokémon triés par nom (ordre croissant) du magasin
  const { getPokemonsSortByNameASC } = pokemonStore

  /*
  Définition de la recherche utilisateur comme une propriété réactive
    * la donnée search et lié au champ de recherche grâce à v-model <v-text-field v-model="search" />
    * ref('') rend la constant search réactive et l'initialise lune valeur par défaut vide ('')
    * Cette liaison bidirectionnelle permet de mettre à jour la recherche en temps réel dans les deux sens.
      Si la valeur de search change, le champ de recherche est mis à jour et vice versa.
  */
  const search = ref('')

  /*
  Propriété calculée pour filtrer les Pokémon en fonction de la recherche
    * Utilise computed pour calculer uniquement si les dépendances (getPokemonsSortByNameASC, search) changent
    * La recherche est convertie en minuscules et espaces inutiles sont supprimés (trim)
    * Si la recherche est vide, retourne tous les Pokémons triés par nom
    * Sinon, filtre les Pokémon dont le nom contient la chaîne de recherche
  */
  const filteredPokemons = computed(() => {
    const searchQuery = search.value.trim().toLowerCase()
    if (!searchQuery) return getPokemonsSortByNameASC
    return getPokemonsSortByNameASC.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery)
    )
  })
</script>

```

## src/pages/Login.vue

```vue
<template>
  <!-- Conteneur principal pour centrer la feuille de connexion -->
  <v-container>
    <!--
    Feuille de connexion
      * v-sheet : Conteneur Vuetify stylisé.
      * class="mx-auto bg-transparent" :
        - mx-auto : Centre horizontalement la feuille.
        - bg-transparent : Fond transparent.
      * max-width="400" : Définit une largeur maximale de 400px.
    -->
    <v-sheet class="mx-auto bg-transparent" max-width="400">
      <!-- Titre de la page -->
      <h1 class="mb-4">Connexion</h1>
      <!--
      Informations de connexion
        * v-sheet : Conteneur Vuetify stylisé.
        * class="pa-2 my-4" : Ajoute une marge intérieure partout (pa) et d'une marge extérieure en haut et en bas (my).
      -->
      <v-sheet class="pa-2 my-4">
        email: <code>sacha@pokemon.com</code> <br>
        password: <code>pika</code>
      </v-sheet>

      <!--
      Formulaire de connexion
        * v-form : Composant Vuetify pour gérer les validations et soumissions de formulaire.
        * @submit.prevent="login" : Intercepte l'envoi pour appeler la méthode `login`.
      -->
      <v-form @submit.prevent="login">
        <!--
        Champ email
          * v-text-field : Composant de champ de texte Vuetify.
          * v-model="loginEmail" : Liaison bidirectionnelle avec la donnée `loginEmail`.
          * aria-label : Améliore l'accessibilité pour les lecteurs d'écran.
          * label="Email" : Affiche un label pour le champ.
          * required : Rend le champ obligatoire.
          * :rules="[validateEmail]" : Applique des règles de validation spécifiques.
          * type="email" : Définit le type du champ pour les navigateurs modernes.
        -->
        <v-text-field
          v-model="loginEmail"
          aria-label="Champ de saisie pour l'email"
          label="Email"
          required
          :rules="[validateEmail]"
          type="email"
        />
        <!--
        Champ mot de passe
          * Similaire au champ email, mais utilise `loginPassword` et une règle de validation différente.
        -->
        <v-text-field
          v-model="loginPassword"
          aria-label="Champ de saisie pour le mot de passe"
          label="Mot de passe"
          required
          :rules="[validatePassword]"
          type="password"
        />

        <!--
        Message d'erreur
          * v-alert : Affiche un message d'avertissement si `errorMessage` est défini.
          * v-if="errorMessage" : Affiche uniquement si une erreur est présente.
          * border="start" : Ajoute une bordure à gauche.
          * class="mb-6" : Ajoute une marge inférieure pour espacer le message.
          * color="warning" : Définit une couleur d'alerte jaune.
        -->
        <v-alert
          v-if="errorMessage"
          border="start"
          class="mb-6"
          color="warning"
        >
          {{ errorMessage }}
        </v-alert>

        <!--
        Bouton de connexion
          * v-btn : Bouton Vuetify.
          * aria-label : Accessibilité pour lecteurs d'écran.
          * color="primary" : Style le bouton avec une couleur principale.
          * size="large" : Définit une taille large pour le bouton.
          * type="submit" : Définit le bouton comme déclencheur de soumission du formulaire.
        -->
        <v-btn
          aria-label="Bouton pour se connecter"
          color="primary"
          size="large"
          type="submit"
        >Se connecter</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script setup>
// Importation des dépendances nécessaires
  import { useAuthStore } from '@/stores/authStore'
  import { useRoute, useRouter } from 'vue-router'
  import { ref } from 'vue'

  // Initialisation du router et de la route pour la redirection
  const router = useRouter()
  const route = useRoute()

  // Store d'authentification
  const authStore = useAuthStore()

  // Données réactives pour le formulaire
  const loginEmail = ref('')
  const loginPassword = ref('')

  // Message d'erreur pour les échecs de connexion
  const errorMessage = ref('')

  /**
   * Fonction de connexion
   * - Valide les informations d'identification via le store.
   * - Redirige l'utilisateur en cas de succès ou affiche un message d'erreur.
   */
  function login () {
    const response = authStore.login(loginEmail.value, loginPassword.value)
    if (response.success) {
      // Redirection vers la page précédente ou l'accueil
      router.push(route.query.redirect || '/')
      // Réinitialisation des champs et message
      loginEmail.value = ''
      loginPassword.value = ''
      errorMessage.value = ''
    } else {
      // Affichage du message d'erreur
      errorMessage.value = response.message
    }
  }

  /**
   * Règles de validation pour le champ email
   * - Vérifie le format standard d'une adresse email.
   */
  const validateEmail = email => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailPattern.test(email) || 'Veuillez entrer un email valide.'
  }

  /**
   * Règles de validation pour le champ mot de passe
   * - Le mot de passe doit contenir au moins 4 caractères.
   */
  const validatePassword = password => {
    return password.length > 3 || 'Le mot de passe doit comporter au moins 4 caractères.'
  }
</script>

<style scoped>
/* Styles spécifiques pour centrer et styliser le formulaire de connexion */
</style>

```

## src/pages/README.md

```md
# Pages

Vue components created in this folder will automatically be converted to navigatable routes.

Full documentation for this feature can be found in the Official [unplugin-vue-router](https://github.com/posva/unplugin-vue-router) repository.

```

## src/pages/Favoris.vue

```vue
<template>
  <!-- Conteneur principal pour la page des favoris -->
  <v-container>
    <!--
    Titre de la page
      * class="mb-8 text-center" ajoute une Marge en Bas de 8 unités et centre le texte
    -->
    <h1 class="mb-8 text-center">Mes Pokémons Favoris</h1>

    <!--
    Grille pour afficher les cartes des Pokémon favoris
      * v-if="getFavorites.length > 0" affiche la grille uniquement si la liste des favoris n'est pas vide
    -->
    <v-row v-if="favorites.length > 0">
      <!--
      Boucle pour afficher chaque Pokémon favori
       * v-for permet de parcourir les pokémons favoris
      * :key permet de donner une clé unique à chaque pokémon
      * cols définit la taille par défaut d'une colonne sur un maximum de 12 cols
        si on met cols="6" un colonne occupe au maximum la moitié de la grille (12/6=2)
        Ici on met cols="12" pour que chaque carte puisse occuper toute la largeur de la grille
      * xl, lg, md, sm, xs permettent de définir le nombre de colonnes max pour chaque taille d'écran
        par exmple lg="3" signifie que sur grand écran on affiche 4 cartes par ligne (12/3=4)
        https://vuetifyjs.com/en/components/grids/
      -->
      <v-col
        v-for="pokemon in favorites"
        :key="pokemon.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
        xl="2"
        xs="12"
        xxl="2"
      >
        <!--
        Composant de carte pour afficher les informations du Pokémon
          * :pokemon transmet l'objet Pokémon au composant PokemonCard
        -->
        <pokemon-card :pokemon="pokemon" />
      </v-col>
    </v-row>

    <!--
    Alerte informative affichée lorsque la liste des favoris est vide
      * v-else affiche cette alerte lorsque la liste des favoris est vide
      * type="info" applique le style informatif à l'alerte
      * class="text-center" centre le texte de l'alerte
    -->
    <v-alert v-else type="info">
      Vous n'avez pas encore de Pokémon favoris.
      <!--
      Bouton pour retourner à la liste des Pokémon
        * @click navigue vers la liste des Pokémon
      -->
      <v-btn to="/">
        Retourner à la liste des Pokémon
      </v-btn>
    </v-alert>
  </v-container>
</template>

<script setup>
  // Importation des outils et composants nécessaires
  import { usePokemonStore } from '@/stores/pokemonStore'
  import PokemonCard from '@/components/PokemonCard.vue'

  // Récupération du magasin des Pokémon
  const pokemonStore = usePokemonStore()

  // Récupération de la liste des favoris via la méthode getFavorites du magasin
  // On utilise computed pour que la liste soit réactive
  const favorites = computed(() => pokemonStore.getFavorites)
</script>

```

## src/pages/KantoMap.vue

```vue
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
      * class="mb-6" ajoute une Marge en Bas de 6 unités et
      * class="cursor-pointer" change le curseur pour indiquer que l'image est cliquable
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

```

## src/pages/[...path].vue

```vue
<template>
  <!--
  Conteneur principal de la page 404
    * Utilisation de classes pour centrer le contenu et le styliser
  -->
  <v-container class="text-center py-10">
    <!--
    Titre de la page 404
      * class="mb-4" ajoute une marge en bas pour espacer le titre
      * text-h1 applique le style d’un titre principal pour une apparence distincte
    -->
    <h1 class="text-h1 mb-4">Oups! Page non trouvée (404)</h1>

    <!--
    Message d’erreur pour expliquer que la page n'existe pas
      * class="mb-6" ajoute une marge en bas pour espacer le message
      * text-subtitle-1 applique le style d’un sous-titre pour une meilleure hiérarchie visuelle
    -->
    <p class="text-subtitle-1 mb-6">
      La page que vous cherchez n'existe pas ou a été déplacée.
    </p>

    <!--
    Bouton pour retourner à la page d'accueil
      * color="primary" applique la couleur principale pour le bouton
      * large rend le bouton plus visible et centré
      * @click="$router.push('/')" redirige vers la page d'accueil
    -->
    <v-btn color="primary" large to="/">
      Retour à l'accueil
    </v-btn>
  </v-container>
</template>

<script setup>
// Aucune logique JavaScript additionnelle nécessaire ici
</script>

```

## src/pages/FAQ.vue

```vue
<template>
  <!--
  Conteneur principal
    * v-container : Conteneur Vuetify pour centraliser et aligner le contenu.
  -->
  <v-container>
    <!--
    Titre principal
      * class="mb-6 text-center" :
        - mb-6 : Ajoute une marge inférieure de 6 unités.
        - text-center : Centre le texte horizontalement.
    -->
    <h1 class="mb-6 text-center">Foire Aux Questions (FAQ)</h1>

    <!--
    Panneaux d'expansion
      * v-expansion-panels : Conteneur pour regrouper plusieurs panneaux d'expansion.
    -->
    <v-expansion-panels>
      <!--
      Panneau individuel
        * v-for : Itère sur chaque élément de `faqItems` pour créer un panneau.
        * :key="i" : Fournit une clé unique basée sur l'index de l'élément pour optimiser le rendu.
      -->
      <v-expansion-panel v-for="(item, i) in faqItems" :key="i">
        <!--
        Titre du panneau
          * v-expansion-panel-title : Affiche la question dans l'en-tête cliquable du panneau.
        -->
        <v-expansion-panel-title>
          {{ item.question }}
        </v-expansion-panel-title>

        <!--
        Texte du panneau
          * v-expansion-panel-text : Contient la réponse affichée lorsque le panneau est ouvert.
        -->
        <v-expansion-panel-text>
          {{ item.answer }}
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
// Importation de `ref` depuis Vue, permet de créer des données réactives.
  import { ref } from 'vue'

  // Tableau réactif (ref) contenant les questions et réponses.
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

<style scoped>
/* Ajoutez des styles personnalisés si nécessaire */
</style>

```

## src/pages/pokemon/add.vue

```vue
<template>
  <!--
  Conteneur principal pour structurer la page
    * v-container : Fournit une mise en page fluide et centrée sur l'écran.
  -->
  <v-container>
    <!--
    Feuille contenant le formulaire
      * class="mx-auto bg-transparent" : Centre le contenu horizontalement (mx-auto) et applique un fond transparent (bg-transparent).
      * max-width="400" : Définit une largeur maximale de 400px pour la feuille.
    -->
    <v-sheet class="mx-auto bg-transparent" max-width="400">
      <!-- Titre principal de la page -->
      <h1 class="mb-4">Ajouter un Pokémon</h1>

      <!--
      Formulaire d'ajout de Pokémon
        * @submit.prevent="addPokemon" : Empêche le comportement par défaut du formulaire (rechargement de la page) et exécute la fonction `addPokemon`.
      -->
      <v-form @submit.prevent="addPokemon">
        <!--
        Champ de texte pour le nom du Pokémon
          * v-model.trim="pokemonData.name" : Liaison bidirectionnelle avec suppression des espaces inutiles en début et fin de texte.
          * label="Nom" : Ajoute une étiquette pour le champ.
          * :rules="[val => !!val || 'Le nom est requis']" : Définit une règle pour le champ (le nom est requis).
        -->
        <v-text-field
          v-model.trim="pokemonData.name"
          label="Nom"
          :rules="[val => !!val || 'Le nom est requis']"
        />

        <!--
        Champ numérique pour le niveau du Pokémon
          * v-model.number="pokemonData.level" : Liaison bidirectionnelle avec conversion en nombre.
          * label="Niveau" : Ajoute une étiquette pour le champ.
          * :rules="[val => !!val || 'Le niveau est requis']" : Définit une règle pour le champ (le niveau est requis).
          * type="number" : Définit le champ comme numérique.

        -->
        <v-text-field
          v-model.number="pokemonData.level"
          label="Niveau"
          :rules="[val => !!val || 'Le niveau est requis']"
          type="number"
        />

        <!--
        Champ texte pour l'image du Pokémon
          * v-model.trim="pokemonData.img" : Liaison bidirectionnelle avec suppression des espaces inutiles.
          * label="Image du Pokémon" : Ajoute une étiquette pour le champ.
          * class="pb-0 mb-0" : Supprime les marges en bas pour une mise en page compacte.
        -->
        <v-text-field
          v-model.trim="pokemonData.img"
          class="pb-0 mb-0"
          label="Image du Pokémon"
        />

        <!--
        Composant pour sélectionner une image de test
          * @select : Écoute l'événement `select` et met à jour le champ image (`pokemonData.img`) avec l'image sélectionnée.
        -->
        <SelectImageTest @select="(imageTest) => pokemonData.img = imageTest" />

        <!--
        Champ de texte étendu pour la description
          * v-model.trim="pokemonData.description" : Liaison bidirectionnelle avec suppression des espaces inutiles.
          * label="Description" : Ajoute une étiquette pour le champ.
        -->
        <v-textarea
          v-model.trim="pokemonData.description"
          label="Description"
        />

        <!--
        Groupe de cases à cocher pour sélectionner les types
          * fieldset : Regroupe visuellement les cases sous une légende.
          * class="pa-6 mb-6" : Ajoute un padding (pa-6) et une marge inférieure (mb-6) pour espacer le groupe.
        -->
        <fieldset class="pa-6 mb-6">
          <legend class="font-weight-bold">Types</legend>
          <!--
          Ligne contenant les cases à cocher
            * v-row : Organise les cases en ligne avec des colonnes.
          -->
          <v-row>
            <!--
            Colonne pour chaque type
              * v-for="type in pokemonStore.types" : Itère sur les types disponibles dans le magasin.
              * :key="type.id" : Associe une clé unique basée sur l'identifiant du type.
              * class="pa-0 ma-0" : Supprime le padding et la marge pour une mise en page compacte.
              * cols="4" : Définit chaque case à occuper 4 colonnes sur 12 dans la grille.
            -->
            <v-col
              v-for="type in pokemonStore.types"
              :key="type.id"
              class="pa-0 ma-0"
              cols="4"
            >
              <!--
              Case à cocher pour un type
                * v-model="pokemonData.types" : Liaison bidirectionnelle avec la liste des types sélectionnés.
                * :label="type.name" : Définit l'étiquette de la case avec le nom du type.
                * :value="type.id" : Définit la valeur de la case à l'identifiant du type.
                * density="compact" : Réduit la taille de la case pour une meilleure utilisation de l'espace.
              -->
              <v-checkbox
                v-model="pokemonData.types"
                density="compact"
                :label="type.name"
                :value="type.id"
              />
            </v-col>
          </v-row>
        </fieldset>

        <!--
        Message d'erreur affiché si l'ajout échoue
          * v-if="msgErreur" : Affiche l'alerte uniquement si un message d'erreur existe.
          * class="mb-6" : Ajoute une marge en bas pour espacer l'alerte des éléments suivants.
          * color="warning" : Définit la couleur de l'alerte comme jaune.
          * type="error" : Spécifie que l'alerte est de type erreur.
        -->
        <v-alert
          v-if="msgErreur"
          border="start"
          class="mb-6"
          color="warning"
          type="error"
        >
          {{ msgErreur }}
        </v-alert>

        <!--
        Bouton pour soumettre le formulaire
          * color="primary" : Applique la couleur principale (bleu par défaut).
          * size="large" : Définit un bouton plus grand.
          * type="submit" : Indique que ce bouton soumet le formulaire.
        -->
        <v-btn
          color="primary"
          size="large"
          type="submit"
        >
          Ajouter le Pokémon
        </v-btn>
      </v-form>

      <!--
      Snackbar pour afficher un message de succès
        * v-model="msgSucces" : Affiche ou cache le snackbar en fonction de `msgSucces`.
        * color="success" : Définit la couleur comme verte pour indiquer un succès.
      -->
      <v-snackbar
        v-model="msgSucces"
        color="success"
      >
        Pokémon créé avec succès !
      </v-snackbar>
    </v-sheet>
  </v-container>
</template>

<script setup>
  import SelectImageTest from '@/components/SelectImageTest.vue'
  import { ref } from 'vue'
  import { usePokemonStore } from '@/stores/pokemonStore'
  import { useRouter } from 'vue-router'

  // Utilisation du magasin Pokémon
  const pokemonStore = usePokemonStore()
  // Routeur pour redirection
  const router = useRouter()

  // Objet pour stocker les données du formulaire
  const pokemonData = ref({
    name: '', // Nom du Pokémon
    level: '', // Niveau du Pokémon
    description: '', // Description du Pokémon
    types: [], // Types sélectionnés
  })

  // Gestion des messages d'état
  const msgErreur = ref(null) // Message d'erreur en cas d'échec
  const msgSucces = ref(false) // Indicateur de succès

  /**
   * Fonction pour ajouter un Pokémon
   * Utilise le magasin Pinia pour créer un Pokémon et gère les messages d'état.
   */
  function addPokemon () {
    msgErreur.value = null
    msgSucces.value = false

    const response = pokemonStore.addPokemon(pokemonData.value)

    if (!response.success) {
      msgErreur.value = response.message
      return
    }

    // Réinitialise les données après succès
    pokemonData.value = { name: '', level: '', description: '', types: [] }
    msgSucces.value = true
    router.push('/')
  }
</script>

<style scoped>
/* Ajoutez ici des styles spécifiques pour cette page */
</style>

```

## src/pages/pokemon/[id].vue

```vue
<template>
  <!--
  Conteneur principal pour les détails du Pokémon
    * v-container : Composant Vuetify pour fournir un conteneur réactif centré.
    * v-if="selectedPokemon" : Directive conditionnelle pour afficher le conteneur uniquement si un Pokémon est sélectionné.
  -->
  <v-container v-if="selectedPokemon">
    <!--
    Carte contenant les informations et l'image du Pokémon
      * v-card : Composant Vuetify pour créer une structure de carte stylisée.
      * class="pt-4" : Ajoute un padding en haut de la carte pour espacer le contenu (4 * 4px = 16px).
    -->
    <v-card class="pt-4">
      <!--
      Image du Pokémon ou image par défaut si aucune image n'est disponible
        * v-img : Composant Vuetify pour afficher une image.
        * v-if="selectedPokemon.img" : Directive conditionnelle pour vérifier si une image est disponible.
        * contain : Ajuste l'image pour qu'elle soit entièrement contenue dans le conteneur.
        * height="300px" : Fixe une hauteur de 300px pour l'image.
        * :src="`/images/${selectedPokemon.img}`" : Génère dynamiquement le chemin de l'image du Pokémon.
      -->
      <v-img v-if="selectedPokemon.img" contain height="300px" :src="`/images/${selectedPokemon.img}`" />
      <!--
      Image par défaut affichée lorsque l'image du Pokémon n'est pas disponible.
        * src="/images/pokeball.png" : Chemin statique vers l'image par défaut.
      -->
      <v-img v-else contain height="300px" src="/images/pokeball.png" />

      <!--
      Titre de la carte affichant le nom du Pokémon
        * v-card-title : Composant Vuetify pour afficher un titre stylisé dans la carte.
      -->
      <v-card-title>{{ selectedPokemon.name }}</v-card-title>

      <!--
      Sous-titre de la carte contenant des informations supplémentaires
        * v-card-subtitle : Composant Vuetify pour afficher un sous-titre dans la carte.
      -->
      <v-card-subtitle>
        <!-- Niveau du Pokémon -->
        <div class="mb-2">Niveau : {{ selectedPokemon.level }}</div>
        <!--
        Types du Pokémon affichés sous forme de puces
          * Composant PokemonTypesChips personnalisé pour afficher les types.
          * class="mb-2" : Ajoute une marge inférieure de 8px (2 * 4px).
        -->
        <div class="mb-2">Types: <pokemon-types-chips :pokemon="selectedPokemon" /></div>
      </v-card-subtitle>

      <!--
      Texte principal contenant la description et les statistiques du Pokémon
        * v-card-text : Composant Vuetify pour une zone de texte dans la carte.
      -->
      <v-card-text>
        <!-- Description du Pokémon -->
        <p>{{ selectedPokemon.description }}</p>
        <!--
        Séparateur visuel entre la description et les statistiques
          * v-divider : Composant Vuetify pour ajouter une ligne horizontale.
          * class="my-3" : Ajoute une marge verticale de 12px (3 * 4px) en haut et en bas.
        -->
        <v-divider class="my-3" />
        <!--
        Section des statistiques
          * Utilise le composant PokemonStats pour afficher les statistiques.
          * :stats : Passe les statistiques du Pokémon en tant que propriété réactive.
        -->
        <h3>Stats</h3>
        <pokemon-stats :stats="selectedPokemon.stats" />
      </v-card-text>

      <!--
      Actions de la carte
        * v-card-actions : Composant Vuetify pour afficher des actions dans la carte.
      -->
      <v-card-actions>
        <!--
        Bouton pour ajouter/retirer le Pokémon des favoris
          * v-btn : Composant Vuetify pour créer un bouton.
          * icon : Style de bouton en mode icône.
          * @click="toggleFavorite(selectedPokemon)" : Ajoute ou retire le Pokémon des favoris lorsque le bouton est cliqué.
        -->
        <v-btn icon @click="toggleFavorite(selectedPokemon)">
          <!--
          Icône représentant l'état de favori
            * v-icon : Composant Vuetify pour afficher une icône.
            * :color : Change la couleur de l'icône en rouge si le Pokémon est favori.
            * {{ ... }} : Affiche une icône pleine ou vide en fonction de l'état.
          -->
          <v-icon :color="isFavorite(selectedPokemon) ? 'red' : ''">
            {{ isFavorite(selectedPokemon) ? 'mdi-heart' : 'mdi-heart-outline' }}
          </v-icon>
        </v-btn>
        <!--
        Bouton de navigation pour revenir au Pokédex
          * to="/" : Redirige vers la route racine lorsque cliqué.
        -->
        <v-btn to="/">Retour au Pokédex</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
  /*
  Importation des dépendances
  */
  import { onMounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { usePokemonStore } from '@/stores/pokemonStore'
  import PokemonTypesChips from '@/components/PokemonTypesChips.vue'
  import PokemonStats from '@/components/PokemonStats.vue'

  // Initialisation des outils de navigation et du magasin Pinia
  const router = useRouter() // Récupère le routeur pour la navigation
  const route = useRoute() // Récupère les informations de la route actuelle
  const pokemonStore = usePokemonStore() // Récupère le magasin des Pokémon

  // Création de données réactives (refs) depuis lea données (state) du magasin
  const { selectedPokemon } = storeToRefs(pokemonStore)
  // Récupération des actions et méthodes du magasin des Pokémon
  const { toggleFavorite, isFavorite, selectPokemonById } = pokemonStore

  /*
  Chargement du Pokémon à l'initialisation du composant
    - Si l'ID ne correspond à aucun Pokémon, redirection vers une page 404.
  */
  onMounted(() => {
    // Le nom de ce fichier pokemon/[id].vue créer une route dynamique avec un paramètre `id`
    // route.params.id permet de récupérer la valeur de l'ID dans l'URL
    // Par exemple, pour l'URL `/pokemon/25-pika`, route.params.id vaudra `25-pika`
    const idPokemon = route.params.id
    // Vérification et récupération du Pokémon avec l'ID fourni
    const pokemonExists = selectPokemonById(idPokemon)
    // Si le Pokémon n'existe pas, redirection vers une page 404
    if (!pokemonExists) {
      router.push('/404') // Redirection en cas d'ID invalide
    }
  })
</script>

<style scoped>
  /* Animation pour le battement du cœur */
.mdi-heart {
  /* L'animation 'heartbeat' est définie dans le fichier global src/style/styles.css */
  animation: heartbeat 1s ease-in-out;
}

/* Animation pour la suppression des favoris */
.mdi-heart-outline {
  /* L'animation 'shrink' est définie dans le fichier global src/style/styles.css */
  animation: shrink 0.6s ease-in-out;
}
</style>

```

## src/router/index.js

```js
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import { useAuthStore } from '@/stores/authStore'
// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

/****************************************************************************************
 * Début de la Gestion de la navigation protégée
 ****************************************************************************************/
// Tableau contenant les chemins des routes protégées, nécessitant une authentification
const protectedRoutes = [
  '/pokemon/add',
  // Ajouter d'autres routes protégées ici
]

// Guardien (Guard) global pour vérifier l'authentification sur les routes spécifiques
router.beforeEach((to, from, next) => {
  // Récupérer le magasin d'authentification
  const authStore = useAuthStore()
  // Si la route est protégée et que l'utilisateur n'est PAS authentifié
  if (protectedRoutes.includes(to.path) && !authStore.isAuthenticated) {
    // Rediriger vers la page de connexion (path: '/login')
    // et passe la route demandée en paramètre (query: { redirect: to.fullPath }),
    // cela permettra de revnoyer l'utilisateur vers la page demandée après la connexion
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    // Sinon, on laisse passer
    next()
  }
})
/**************************************************************************************
 * Fin de Gestion de la navigation protégée
 *********************************************************************************** */

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router

```

