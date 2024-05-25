<template>
  <TheHeading title="Détail licencié.e" :subtitle="subtitle" :showButtons="false"></TheHeading>
  <TheDetailLegend></TheDetailLegend>
  <br />
  <ul role="list" class="divide-y divide-gray-100">
    <li
      v-for="item in results"
      :key="item.id"
      class="relative flex justify-between py-5 hover:bg-gray-50"
    >
      <div class="flex gap-x-4 pr-6 sm:w-1/2 sm:flex-none">
        <div class="min-w-0 flex-auto">
          <p class="text-sm font-semibold leading-6 text-gray-900">
            <span class="absolute inset-x-0 -top-px bottom-0"></span>
            <span class="text-lg font-semibold leading-6 text-pink-600">{{
              item.challenge_races[0].value
            }}</span>
            <small class="text-sm px-3 text-gray-400">{{ item.race_date }}</small>
          </p>
          <div class="mt-1 mb-2">
            <RankingDetail label="classement" :value="item.ranking" is-first></RankingDetail>
            <RankingDetail label="chrono" :value="item.time"></RankingDetail>
            <RankingDetail
              label="classement catégorie"
              :value="item.category_ranking"
            ></RankingDetail>
            <p class="mt-1 mb-2">
              <span class="text-gray-400">NCH&nbsp;</span>
              <span class="text-indigo-700">{{ item.race_number_classified_man }}</span>
              <TheBull></TheBull>
              <span class="text-gray-400">NCF&nbsp;</span>
              <span class="text-indigo-700">{{ item.race_number_classified_woman }}</span>
              <TheBull></TheBull>
              <span class="text-gray-400">chrono du 1<sup>er</sup>&nbsp;</span>
              <span class="text-indigo-700">{{ item.race_time_first_man }}</span>
              <TheBull></TheBull>
              <span class="text-gray-400">chrono de la 1<sup>ère</sup>&nbsp;</span>
              <span class="text-indigo-700">{{ item.race_time_first_woman }}</span>
              <TheBull></TheBull>
              <span class="text-gray-400">NCC&nbsp;</span>
              <span class="text-indigo-700">{{ item.classified_category }}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between gap-x-4 sm:w-1/2 sm:flex-none">
        <div class="hidden sm:block">
          <div class="pl-6 flex items-center justify-between gap-x-2">
            <TheSticker
              v-for="sticker in item.stickers"
              :key="sticker"
              :sticker="sticker"
            ></TheSticker>
          </div>
        </div>
        <div class="whitespace-nowrap py-5 text-right text-sm text-gray-500">
          <p
            class="inline-flex items-center rounded-full bg-gray-400 px-2 py-1 text-sm font-medium text-white"
          >
            <strong>{{ item.points }} points</strong>
          </p>
        </div>
      </div>
    </li>
  </ul>
  <p class="py-3 footer-races-label">
    •••&nbsp; {{ racesNumber }} <span v-if="racesNumber > 1">courses</span
    ><span v-else>course</span>&nbsp; •&nbsp; {{ pointsNumber }} points &nbsp;•••
  </p>
</template>

<script setup>
import { onMounted, ref, toRaw } from 'vue'
import { useRoute } from 'vue-router'
import { goPromise, requestGetApiPublicResult } from '@/api'
import TheBull from '@/components/TheBull.vue'
import TheHeading from '@/components/TheHeading.vue'
import TheDetailLegend from '@/components/TheDetailLegend.vue'
import TheSticker from '@/components/TheSticker.vue'
import RankingDetail from '@/components/RankingDetail.vue'

const subtitle = ref('--')
const racesNumber = ref('--')
const pointsNumber = ref('--')
const results = ref([])

function process(data) {
  results.value = data.results

  for (const [key, item] of Object.entries(results.value)) {
    item.stickers = []

    // ranking
    if (item.ranking === "1") {
      item.stickers.push('bonus-1-scr')
    } else if (item.category_ranking === "1") {
      item.stickers.push('bonus-1-cat')
    }

    // triathlon
    if (item.race_is_triathlon) {
      const size = item.race_size_triathlon.toLowerCase()
      item.stickers.push(`triathlon-${size}`)
    }

    // bonus
    if (item.referee !== null) {
      item.stickers.push('bonus-referee')
    }
    if (item.video !== null) {
      item.stickers.push('bonus-video')
    }
    if (item.photo !== null) {
      item.stickers.push('bonus-photo')
    }
    if (item.bonus !== "0") {
      item.stickers.push('bonus-bonus')
    }
  }
}

onMounted(() => {
  // load results licensee
  const route = useRoute()
  subtitle.value = route.params.licensee
  racesNumber.value = route.params.racesNumber
  pointsNumber.value = route.params.pointsNumber
  const promise = fetch(requestGetApiPublicResult(route.params.licenseeid))
  goPromise(promise, 'get public results', process)
})
</script>

<style scoped>
.footer-races-label {
  text-align-last: center;
  color: var(--color-green);
}
.max-w-custom {
  max-width: 58rem;
}
.px-custom {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
</style>
