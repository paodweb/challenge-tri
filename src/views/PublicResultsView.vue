<template>
  <TheHeading title="Classement du challenge 2024" :showButtons="false"></TheHeading>
  <div class="objects-list">
    <TheLegend></TheLegend>
    <ul role="list" class="divide-y divide-gray-100">
      <li
        v-for="(item, index) in licensees"
        :key="item.id"
        class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6 lg:px-8"
      >
        <div class="flex min-w-0 gap-x-4">
          <div class="min-w-0 flex-auto">
            <p class="text-2xl text-gray-400" :class="{ 'mr-3': index < 9 }">{{ 1 + index }}</p>
          </div>
          <TheImgAvatar v-bind="item"></TheImgAvatar>
          <div class="min-w-0 flex-auto">
            <p class="text-lg font-semibold leading-6 text-gray-600">{{ item.licensee }}</p>
            <WomanRankingBadge v-if="item.womanPoints > 0" class="mr-2">{{
              item.womanRanking
            }}</WomanRankingBadge>
            <RankedFirstBadge v-if="item.rankedFirst" class="mr-2">{{
              item.rankedFirst
            }}</RankedFirstBadge>
            <ContestedTriathlonsBadge v-if="item.contestedTriathlon">{{
              item.contestedTriathlon
            }}</ContestedTriathlonsBadge>
          </div>
        </div>
        <div class="flex shrink-0 items-center gap-x-4">
          <div class="hidden sm:flex sm:flex-col sm:items-end">
            <p class="text-lg leading-6 text-indigo-900">{{ item.sumPoints }} points</p>
            <p class="mt-1 text-xs leading-5 text-gray-500">
              {{ item.results.length }}
              <template v-if="item.results.length > 1">courses</template>
              <template v-else>course</template>
            </p>
          </div>
          <router-link
            :to="`/detail/${item.id}/${item.licensee}/${item.results.length}/${item.sumPoints}`"
          >
            <ChevronRightIcon class="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
          </router-link>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref, toRaw } from 'vue'
import { goPromise, requestGetApiPublicLicensees } from '@/api'
import { namedLicenseeFields } from '@/helpers'
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import ContestedTriathlonsBadge from '@/components/ContestedTriathlonsBadge.vue'
import RankedFirstBadge from '@/components/RankedFirstBadge.vue'
import WomanRankingBadge from '@/components/WomanRankingBadge.vue'
import TheImgAvatar from '@/components/TheImgAvatar.vue'
import TheHeading from '@/components/TheHeading.vue'
import TheLegend from '@/components/TheLegend.vue'

let licensees = ref([])
let womanRankCounter = ref(1)

function process(data) {
  licensees.value = namedLicenseeFields(data.results)

  for (const [key, item] of Object.entries(licensees.value)) {
    // women ranking
    if (item.womanPoints > 0) {
      item.womanRanking = womanRankCounter.value
      womanRankCounter.value += 1
    }
    // ranked first
    if (item.ranking) {
      let rankedFirst = 0
      // count true inside loop
      for (const [k, elem] of Object.entries(toRaw(item.ranking))) {
        if (elem.value) {
          rankedFirst += 1
        }
      }
      item.rankedFirst = rankedFirst
    }
    // contested triathlon
    if (item.isTriathlon) {
      let contestedTriathlon = 0
      // count true inside loop
      for (const [k, elem] of Object.entries(toRaw(item.isTriathlon))) {
        if (elem.value) {
          contestedTriathlon += 1
        }
      }
      item.contestedTriathlon = contestedTriathlon
    }
  }
}

onMounted(() => {
  // load public licensee
  const promise = fetch(requestGetApiPublicLicensees())
  goPromise(promise, 'get public licensees', process)
})
</script>
