import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

//              view                    form                    component   fonction
//
// Races:
// - list       RacesListView           ...                     ...         list all races
// - create     RaceCreateView          RaceCreateForm          ...         create 1 race
// - update     RaceUpdateView          RaceUpdateForm          ...         update 1 race
//
// Results:
// - list       RaceResultsListView     ...                     ...         list the results of 1 race
// - create     RaceResultCreateView    RaceResultCreateForm    ...         create 1 result
// - update     RaceResultUpdateView    RaceResultUpdateForm    ...         update 1 result
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
      path: '/race/:id',
      name: 'race',
      component: () => import('@/views/RaceUpdateView.vue')
    },
    {
      path: '/races',
      name: 'races',
      component: () => import('@/views/RacesListView.vue')
    }
  ]
})

export default router
