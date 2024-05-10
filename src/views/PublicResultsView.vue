<template>
  <TheHeading title="Classement provisoire du challenge" :showButtons="false"></TheHeading>
  <div class="objects-list">
    <TheLegend></TheLegend>
    <ul role="list" class="divide-y divide-gray-100">
      <li v-for="licensee in licensees" :key="licensee.name" class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8">
          <div class="flex min-w-0 gap-x-4">
            <div class="min-w-0 flex-auto">
                <p class="text-2xl text-gray-400">{{ licensee.ranking }}</p>
            </div>
            <img class="h-12 w-12 flex-none rounded-full bg-gray-50" :src="imageUrl(licensee.imageUrl)" alt="" />
            <div class="min-w-0 flex-auto">
              <p class="text-2xl font-semibold leading-6 text-gray-600">{{ licensee.name }}</p>
              <WomenRankingBadge v-if="licensee.womanRanking" class="mr-2">{{ licensee.womanRanking }}</WomenRankingBadge>
              <RankedFirstBadge v-if="licensee.rankedFirst" class="mr-2">{{ licensee.rankedFirst }}</RankedFirstBadge>
              <ContestedTriathlonsBadge v-if="licensee.contestedTriathlon">{{ licensee.contestedTriathlon }}</ContestedTriathlonsBadge>
            </div>
          </div>
          <div class="flex shrink-0 items-center gap-x-4">
            <div class="hidden sm:flex sm:flex-col sm:items-end">
              <p class="text-lg leading-6 text-indigo-900">{{ licensee.points }} points</p>
              <p v-if="licensee.racesNumber" class="mt-1 text-xs leading-5 text-gray-500">{{ licensee.racesNumber }} courses</p>
            </div>
            <ChevronRightIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import ContestedTriathlonsBadge from '@/components/ContestedTriathlonsBadge.vue'
import RankedFirstBadge from '@/components/RankedFirstBadge.vue'
import WomenRankingBadge from '@/components/WomenRankingBadge.vue'
import TheHeading from '@/components/TheHeading.vue'
import TheLegend from '@/components/TheLegend.vue'

const imageUrl = (imageId) => {
  return `https://images.unsplash.com/${imageId}?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`
}

const licensees = [
  {
    name: 'Leslie Alexander',
    ranking: 1,
    points: 1200,
    racesNumber: 2,
    imageUrl: 'photo-1494790108377-be9c29b29330',
    womanRanking: 1,
    rankedFirst: 1,
  },
  {
    name: 'Michael Foster',
    ranking: 2,
    points: 1100,
    racesNumber: 3,
    imageUrl: 'photo-1519244703995-f4e0f30006d5',
    rankedFirst: 2,
    contestedTriathlon: 3,
  },
  {
    name: 'Dries Vincent',
    ranking: 3,
    points: 1000,
    racesNumber: 3,
    imageUrl: 'photo-1506794778202-cad84cf45f1d',
    rankedFirst: 3,
  },
  {
    name: 'Lindsay Walton',
    ranking: 4,
    points: 900,
    racesNumber: 4,
    imageUrl: 'photo-1517841905240-472988babdf9',
    womanRanking: 2,
    contestedTriathlon: 4,
  },
  {
    name: 'Courtney Henry',
    ranking: 5,
    points: 800,
    racesNumber: 7,
    imageUrl: 'photo-1438761681033-6461ffad8d80',
    womanRanking: 3,
    contestedTriathlon: 6,
  },
  {
    name: 'Tom Cook',
    ranking: 6,
    points: 700,
    racesNumber: 8,
    imageUrl: 'photo-1472099645785-5658abf4ff4e',
  },
]
</script>
