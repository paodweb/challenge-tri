import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

//              view                form                fonction
//
// Races:
// - list       RacesView           ...                 list all races
// - create     RaceView            RaceForm            create 1 race
// - update     RaceView            RaceForm            update 1 race
//
// Results:
// - list       RaceResultsView     ...                 list the results of 1 race
// - create     RaceResultView      RaceResultForm      create 1 result from 1 race
// - update     RaceResultView      RaceResultForm      update 1 result from 1 race
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
      path: '/challenge-rules',
      name: 'challenge-rules',
      component: () => import('@/views/ChallengeRuleView.vue')
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('@/views/PublicResultsView.vue')
    },
    {
      path: '/races',
      name: 'races',
      component: () => import('@/views/RacesView.vue')
    },
    {
      path: '/race/create',
      name: 'create-race',
      component: () => import('@/views/RaceFormView.vue')
    },
    {
      path: '/race/:raceid/update',
      name: 'update-race',
      component: () => import('@/views/RaceFormView.vue')
    },
    {
      path: '/race/:raceid',
      name: 'race',
      component: () => import('@/views/RaceResultsView.vue')
    },
    {
      path: '/race/:raceid/result/create',
      name: 'create-result',
      component: () => import('@/views/RaceResultFormView.vue')
    },
    {
      path: '/race/:raceid/result/:resultid/update',
      name: 'update-result',
      component: () => import('@/views/RaceResultFormView.vue')
    }
  ]
})

export default router
