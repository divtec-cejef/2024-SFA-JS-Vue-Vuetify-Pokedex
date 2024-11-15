/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

import { usePokemonStore } from '@/stores/pokemonStore'
// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
})

// Définir un tableau contenant les chemins des routes protégées
const protectedRoutes = [
  '/pokemon/add',
  // Ajouter d'autres routes protégées ici
]

// Guard global pour vérifier l'authentification sur les routes spécifiques
router.beforeEach((to, from, next) => {
  const pokemonStore = usePokemonStore()

  // Vérifier si la route fait partie des routes protégées et si l'utilisateur est non authentifié
  if (protectedRoutes.includes(to.path) && !pokemonStore.authenticated) {
    // Rediriger vers la page de connexion et mémoriser la route ciblée
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    // Sinon, autoriser la navigation
    next()
  }
})

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
