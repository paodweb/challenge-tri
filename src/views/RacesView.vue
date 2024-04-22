<template>
  <TheHeading
    title="Liste des courses"
    :subtitle="records.length"
    v-bind="btn_attrs"
    @on-click="router.push({ name: 'create-race' })"
  >
  </TheHeading>
  <div class="objects-list">
    <div class="mt-8 flow-root overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <table class="w-full text-left">
          <thead class="bg-white">
            <tr>
              <th
                scope="col"
                class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
              >
                course
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                résultats
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                <span class="sr-only">résultats</span>
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                <span class="sr-only">résultats</span>
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                <span class="sr-only">résultats</span>
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                <span class="sr-only">résultats</span>
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="race in races" :key="race.id" class="even:bg-gray-50">
              <td class="relative py-4 pr-3 text-lg font-medium text-gray-800">
                <div class="md:flex md:items-center">
                  <div class="min-w-0 flex">
                    <router-link :to="`/race/${race.id}`">{{ race.title }}&nbsp;</router-link>
                  </div>
                  <div class="mt-4 flex md:ml-4 md:mt-0">
                    <p class="text-sm text-gray-500">{{ race.date }}</p>
                  </div>
                  <div class="mt-4 flex-1 md:ml-4 md:mt-0">
                    <a :href="race.link" class="ml-3 icon-link"
                      ><ArrowTopRightOnSquareIcon class="h-5 w-5 text-indigo-500"
                    /></a>
                  </div>
                </div>
              </td>
              <td class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                <dl class="flex w-full flex-none justify-between gap-x-8 items-center sm:w-auto">
                  <div class="flex w-16 gap-x-2.5">
                    <!-- nombre de licencié.s.es DEL -->
                    <span
                      class="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20"
                    >
                      🏃‍♀️🏃‍♂️ {{ race.children }}
                    </span>
                  </div>
                </dl>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                <!-- niveau de la course -->
                Niveau
                <span class="text-sm font-semibold leading-6 text-gray-900">{{
                  mapCollection(race.level, 'level')
                }}</span>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                <!-- coefficient de la course -->
                Coefficient
                <span class="text-sm font-semibold leading-6 text-gray-900">{{
                  mapCollection(race.coefficient, 'coefficient')
                }}</span>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                <!-- temps de la 1ère féminine -->
                <span
                  class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                >
                  🥇👩 {{ race.timeFirstWoman }}
                </span>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                <!-- temps du 1er masculin -->
                <span
                  class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                >
                  🥇👨 {{ race.timeFirstMan }}
                </span>
              </td>
              <td class="relative py-4 pl-3 text-right text-sm font-medium">
                <div class="md:flex md:items-center md:justify-between">
                  <div class="min-w-0 flex">
                    <router-link
                      :to="`/race/${race.id}/update`"
                      class="text-indigo-600 hover:text-indigo-900"
                      >Modifier</router-link
                    >
                  </div>
                  <div class="mt-4 flex-1 md:ml-4 md:mt-0">
                    <router-link :to="`/race/${race.id}`">
                      <ChevronRightIcon
                        class="h-5 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                      />
                    </router-link>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, toRefs } from 'vue'
import { ArrowTopRightOnSquareIcon, ChevronRightIcon } from '@heroicons/vue/20/solid'
import TheHeading from '@/components/TheHeading.vue'
import { goPromise, requestGetApiRace } from '@/api'
import { mapCollection, namedRaceFields } from '@/helpers'
import { useRaceListStore } from '@/stores/racelist'
import { useRouter } from 'vue-router'

const router = useRouter()
const state = reactive({ races: [] })
const { races } = toRefs(state)
const btn_attrs = { btnAction: true, btnLabel: 'Ajouter une course', btnType: 'button' }
let records = []

function process(data) {
  records = namedRaceFields(data.results)
  Object.assign(state, { races: records })
  const store = useRaceListStore()
  store.add(records)
}

const update = (state) => {
  const promise = fetch(requestGetApiRace())
  goPromise(promise, 'get races', process)
}
const fcnUpdate = () => update(state)

onMounted(fcnUpdate)
</script>
@/stores/racelist
