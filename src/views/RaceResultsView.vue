<template>
  <TheHeading
    :title="`Résultats de course : ${title}`"
    buttonLabel="Ajouter un résultat"
    @on-click="onClick($event)"
  />
  <div class="races-list">
    <div class="mt-8 flow-root overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <table class="w-full text-left">
          <thead class="bg-white">
            <tr>
              <th
                scope="col"
                class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
              >
                licencié.e
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                classement
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                classé catégorie
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                classement catégorie
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                bonus
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                points
              </th>
              <th
                scope="col"
                class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
              >
                action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="result in results" :key="result.ranking" class="even:bg-gray-50">
              <td class="relative py-4 pr-3 text-lg font-medium text-gray-800">
                <div class="md:flex md:items-center">
                  <div class="min-w-0 flex">
                    <router-link to="#!">{{ result.licensee }}&nbsp;</router-link>
                  </div>
                  <div class="mt-4 flex md:ml-4 md:mt-0">
                    <span
                      class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                    >
                      {{ result.time }}
                    </span>
                  </div>
                </div>
              </td>
              <td class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell">
                <div class="flex w-16 gap-x-2.5">
                  <span>{{ result.ranking }}</span>
                </div>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                <div class="flex w-16 gap-x-2.5">
                  <span>{{ result.classifiedCategory }}</span>
                </div>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                <div class="flex w-16 gap-x-2.5">
                  <span>{{ result.categoryRanking }}</span>
                </div>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                <div class="flex w-16 gap-x-2.5">
                  <span>{{ result.bonus }}</span>
                </div>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                <div class="flex w-16 gap-x-2.5">
                  <span
                    class="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20"
                  >
                    {{ result.points }}
                  </span>
                </div>
              </td>
              <td class="relative py-4 pl-3 text-right text-sm font-medium">
                <div class="md:flex md:items-center md:justify-between">
                  <div class="min-w-0 flex">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">
                      Modifier<span class="sr-only">, {{ result.licensee }}</span>
                    </a>
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
import { useRoute } from 'vue-router'

const route = useRoute()
const state = reactive({ title: 'no title', results: [] })
const { title, results } = toRefs(state)
const races = {
  12: {
    title: 'Le trail aux pieds des Monts',
    date: '18-fév-2024',
    link: 'https://www.klikego.com/challenge/index.jsp?reference=1516144201179-4',
    results: []
  },
  'bhW4CsW5DcPQnsW6tdMcfi': {
    title: 'Semi-marathon de Plouguin',
    date: '11-nov-2023',
    link: 'https://www.klikego.com/resultats/semi-marathon-et-10km-de-plouguin-2023/1633737828041-3',
    results: [
      {
        id: 183,
        ranking: 183,
        time: '01:55:25',
        licensee: 'FER Stephane',
        classifiedCategory: 14,
        categoryRanking: 14,
        bonus: 0,
        points: 150
      },
      {
        id: 101,
        ranking: 101,
        time: '01:40:09',
        licensee: 'LE GOUX Julien',
        classifiedCategory: 19,
        categoryRanking: 19,
        bonus: 0,
        points: 150
      }
    ]
  }
}

const update = (state) => {
  console.log(route.params)
  Object.assign(state, {
    title: races[route.params.id].title,
    results: races[route.params.id].results
  })
  console.log(state)
}

const fcnUpdate = () => update(state)

function onClick(evt) {
  console.log(evt)
}

onMounted(fcnUpdate)
</script>

<style scoped>
.races-list {
  max-height: 760px;
  overflow-y: scroll;
}
</style>
