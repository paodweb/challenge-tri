<template>
  <TheHeading
    title="Résultats de course"
    :subtitle="title"
    v-bind="btn_attrs"
    @on-click="router.push({ name: 'create-result', params: { raceid: id.value } })"
  />
  <TheModal :show="show" @on-confirm="doDelete(action)" @on-close="doClose">
    <template #title> Confirmer la suppression </template>
    <template #default>
      <p class="text-sm text-gray-500">
        {{ `Souhaitez-vous vraiment supprimer le résultat de ${licensee} 😢 ?` }}
      </p>
    </template>
  </TheModal>
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
                      ⌚ {{ result.time }}
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
                    <router-link
                      :to="`/race/${id}/result/${result.id}/update`"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      Modifier
                    </router-link>
                    <button
                      type="button"
                      :data-licensee="result.licensee"
                      :data-resultid="result.id"
                      class="text-indigo-600 hover:text-indigo-900"
                      @click="confirmDelete($event)"
                    >
                      Supprimer
                    </button>
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
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowTopRightOnSquareIcon, ChevronRightIcon, TrashIcon } from '@heroicons/vue/20/solid'
import {
  goPromise,
  noResponsePromise,
  requestDeleteApiResult,
  requestGetApiRaceResults
} from '@/api'
import { getRelationField, namedResultFields } from '@/helpers'
import TheHeading from '@/components/TheHeading.vue'
import TheModal from '@/components/TheModal.vue'

const router = useRouter()
const state = reactive({ results: [], title: 'no title' })
const { results, title } = toRefs(state)
const btn_attrs = { btnAction: true, btnLabel: 'Ajouter un résultat', btnType: 'button' }
let id = ref('')
const licensee = ref(null)
const resultid = ref(null)
const show = ref(false)

const confirmDelete = (evt) => {
  show.value = !show.value
  licensee.value = evt.target.getAttribute('data-licensee')
  resultid.value = evt.target.getAttribute('data-resultid')
}

const doClose = () => {
  resultid.value = null
  show.value = !show.value
}

function processResult() {
  doClose()
  // refresh page
  router.go(0)
}

const doDelete = (action) => {
  const promise = fetch(requestDeleteApiResult(resultid.value))
  noResponsePromise(promise, 'delete results', processResult)
}

function process(data) {
  let title_str = 'no title'
  if (data.results.length > 0) {
    title_str = data.results[0][getRelationField()][0].value
  }
  Object.assign(state, {
    title: title_str,
    results: namedResultFields(data.results)
  })
}

const update = (state) => {
  const route = useRoute()
  id.value = route.params.raceid

  const promise = fetch(requestGetApiRaceResults(route.params.raceid))
  goPromise(promise, 'get results', process)
}
const fcnUpdate = () => update(state)

onMounted(fcnUpdate)
</script>
@/stores/racelist
