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
// Récupérer le magasin d'authentification
const authStore = useAuthStore()

// Guardien (Guard) global pour vérifier l'authentification sur les routes spécifiques
router.beforeEach((to, from, next) => {
  // Si la route est protégée et que l'utilisateur n'est PAS authentifié
  if (protectedRoutes.includes(to.path) && !authStore.isAuthenticated) {
    // Rediriger vers la page de connexion path: '/login'
    // et passe la route demandée en paramètre query: { redirect: to.fullPath },
    // cela permettra de revnoyer l'utilisateur vers la page demandée après la connexion
    next({ path: '/login', query: { redirect: to.fullPath } })
  } else {
    // Sinon on laisse passer
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
