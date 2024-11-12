### 1. `App.vue`

- **Gestion des erreurs** : Ajouter un mécanisme pour capturer les erreurs lors des appels `fetchTypes` et `fetchPokemons` et informer l’utilisateur si un problème survient pendant le chargement.
- **Chargement asynchrone** : Ajouter un indicateur de chargement global ou une animation dans `v-main` jusqu’à ce que les données soient prêtes, pour améliorer l’expérience utilisateur.
- **Documentation interne** : Ajouter des commentaires décrivant chaque action dans le cycle de vie `onMounted`, afin de clarifier l’importance de charger les favoris, les types et les Pokémon dès le montage.

---

### 2. `pokemonStore.js` (Store Pinia)

- **Validation d'URL** : Rendre les URL `apiUrl` et `imageUrl` configurables via des variables d’environnement pour adapter facilement les chemins d’API en fonction de l’environnement (développement, production).
- **Gestion des erreurs** :
    - Enrichir `login` pour donner des retours plus détaillés sur les raisons d'échec, par exemple, si le compte est bloqué ou si d'autres conditions d'authentification échouent.
    - Uniformiser la gestion des erreurs dans les autres actions (`fetchPokemons`, `fetchTypes`, `createPokemon`, etc.) pour garantir des messages clairs et aider au débogage.
- **Refactorisation** :
    - Centraliser la gestion des erreurs API en ajoutant une fonction commune pour réduire la répétition de code et faciliter la maintenance.
- **Amélioration de l’expérience utilisateur pour les favoris** :
    - Ajouter une confirmation visuelle, comme un `snackbar`, lors de l’ajout ou la suppression d’un Pokémon des favoris, pour un retour utilisateur plus immédiat et clair.

---

### 3. `index.vue`

- **Amélioration de la recherche** : Nettoyer la saisie utilisateur en supprimant les espaces en début et fin (`trim()`) pour éviter les recherches erronées.
- **Accessibilité** : ~~Ajouter un `aria-label` au bouton d’ajout de Pokémon (`v-btn`) pour améliorer l’accessibilité.~~
- **Documentation interne** : Ajouter des commentaires pour clarifier la logique de filtrage et l’utilisation du store, facilitant la compréhension du fonctionnement du composant par les apprentis.

---

### 4. `Login.vue`

- **Accessibilité** : Ajouter des `aria-labels` aux champs et au bouton pour une meilleure prise en charge par les lecteurs d'écran.
- **Afficher/Masquer le mot de passe** : Ajouter une option avec une icône `mdi-eye` pour afficher/masquer le champ de mot de passe, rendant le formulaire plus convivial.
- **Documentation interne** : Ajouter des commentaires sur les variables et la logique de connexion pour aider les apprentis à comprendre chaque étape du processus.

---

### 5. `Favoris.vue`

- **Amélioration UX pour le message d’absence de favoris** : Ajouter un bouton dans `v-alert` pour diriger directement vers la liste des Pokémon, permettant aux utilisateurs de naviguer facilement.
- **Documentation interne** : Ajouter des commentaires pour expliquer l’affichage conditionnel des favoris et le rôle des données chargées depuis le store.

---

### 6. `KantoMap.vue`

- **Accessibilité** : Ajouter un `aria-label` à l’image cliquable pour fournir une meilleure indication de son rôle aux utilisateurs de lecteurs d'écran.
- **Optimisation des images** : Vérifier que l’image de la carte est optimisée pour éviter les temps de chargement longs.
- **Documentation interne** : Ajouter des commentaires pour décrire chaque section de texte, comme les sous-titres de région, afin de faciliter la compréhension pour les apprentis.

---

### 7. `[...path].vue` (Page 404)

- **Amélioration UX** : Ajouter un message plus descriptif (par exemple, "Oups! Cette page n'existe pas.") ainsi qu’un bouton de retour à la page d’accueil pour guider l’utilisateur en cas d’erreur de navigation.
- **Stylisation** : Personnaliser le style de la page pour la distinguer des autres pages et renforcer visuellement l’indication d’erreur.

---

### 8. `FAQ.vue`

- **Modularité** : Externaliser le tableau `faqItems` dans un fichier JSON ou dans le store pour simplifier la gestion du contenu de la FAQ, notamment si celle-ci s’étoffe.
- **Accessibilité** : Ajouter des attributs ARIA aux panneaux expansibles pour une meilleure prise en charge par les lecteurs d'écran.
- **Documentation interne** : Ajouter des commentaires expliquant la structure des données et l’utilisation de `v-expansion-panels`, ce qui peut être particulièrement instructif pour les apprentis.

---

### 9. `add.vue` (Page d’ajout de Pokémon)

- **Validation de l'ID Pokédex** : Ajouter une vérification que `pokedexId` est bien un nombre valide et unique pour éviter des conflits dans la liste de Pokémon.
- **Retour visuel pour le chargement** : Ajouter un indicateur de chargement sur le bouton d’envoi pour indiquer à l’utilisateur que l’ajout est en cours de traitement.
- **Documentation interne** : Ajouter des commentaires expliquant les variables de formulaire (`pokemonData`, `addError`, `addSuccess`) et la logique d’ajout pour faciliter la compréhension.

---

### 10. `[id].vue` (Page de détail de Pokémon)

- **Documentation interne** : Ajouter des commentaires détaillant l'usage du `watcher` pour gérer l'attente de chargement du store et clarifier le rôle de chaque section (comme les statistiques ou les types).
- **Amélioration UX** : Ajouter une animation pour l’ajout/retrait de favoris pour offrir un retour visuel plus engageant.
- **Navigation complémentaire** : Envisager d’ajouter un bouton pour naviguer vers le Pokémon suivant/précédent pour enrichir l'expérience de l'utilisateur.
