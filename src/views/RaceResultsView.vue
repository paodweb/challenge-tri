<template>
  <TheHeading :title="`Résultats de course : ${title}`" buttonLabel="Ajouter un résultat" @on-click="onClick($event)" />
  <div class="races-list">
    <div class="mt-8 flow-root overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <table class="w-full text-left">
          <thead class="bg-white">
            <tr>
              <th scope="col" class="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0">licencié.e</th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">résultats</th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"><span class="sr-only">résultats</span></th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"><span class="sr-only">résultats</span></th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"><span class="sr-only">résultats</span></th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"><span class="sr-only">résultats</span></th>
              <th scope="col" class="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">action</th>
            </tr>
          </thead>
          <tbody>
            <!--
            nombre de licencié.s.es DEL
            niveau de la course
            coefficient de la course
            temps de la 1ère féminine
            temps du 1er masculin
            -->
            <tr v-for="race in races" :key="race.email" class="even:bg-gray-50">
              <td class="relative py-4 pr-3 text-lg font-medium text-gray-800">
                <div class="md:flex md:items-center md:justify-between">
                  <div class="min-w-0 flex">
                    <router-link :to="`/race/${race.id}`">{{ race.name }}&nbsp;</router-link>
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
                    <dt>🏃‍♀️🏃‍♂️</dt>
                    <dd class="text-sm font-semibold leading-6 text-gray-900">
                      {{ 18 }}
                    </dd>
                  </div>
                </dl>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                Niveau
                <span class="text-sm font-semibold leading-6 text-gray-900">{{
                  18
                }}</span>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                Coefficient
                <span class="text-sm font-semibold leading-6 text-gray-900">{{
                  18
                }}</span>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    🥇👩 02:18:18
                </span>
              </td>
              <td class="px-3 py-4 text-sm text-gray-500">
                <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    🥇👨 02:04:17
                </span>
              </td>
              <td class="relative py-4 pl-3 text-right text-sm font-medium">
                <div class="md:flex md:items-center md:justify-between">
                  <div class="min-w-0 flex">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900">
                      Modifier<span class="sr-only">, {{ race.name }}</span>
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
const state = reactive({ title: 'no title' })
const { title } = toRefs(state)
const races = {
    12: {
        title: 'Le trail aux pieds des Monts',
        date: '18-fév-2024',
        link: 'https://www.klikego.com/challenge/index.jsp?reference=1516144201179-4'
    },
    21: {
        title: 'Semi-marathon de Plouguin',
        date: '11-nov-2023',
        link: 'https://www.klikego.com/resultats/semi-marathon-et-10km-de-plouguin-2023/1633737828041-3'
    }
}

const update = (state) => {
    console.log(route.params)
    Object.assign(state, {
        title: races[route.params.id].title
    })
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
