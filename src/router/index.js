import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

//              view                form                component   fonction
//
// Races:
// - list       RacesView           ...                 ...         list all races
// - create     RaceView            RaceForm            ...         create 1 race
// - update     RaceView            RaceForm            ...         update 1 race
//
// Results:
// - list       RaceResultsView     ...                 ...         list the results of 1 race
// - create     RaceResultView      RaceResultForm      ...         create 1 result
// - update     RaceResultView      RaceResultForm      ...         update 1 result
//

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/races',
      name: 'races',
      component: () => import('@/views/RacesView.vue')
    },
    {
      path: '/create-race',
      name: 'createrace',
      component: () => import('@/views/RaceFormView.vue')
    },
    {
      path: '/race/:id',
      name: 'race',
      component: () => import('@/views/RaceResultsView.vue')
    }
  ]
})

export default router
