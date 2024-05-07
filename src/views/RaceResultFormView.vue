<template>
  <form @submit.prevent="onSubmit" role="form">
    <TheHeading :title="title" :subtitle="form.licensee" v-bind="btn_attrs"> </TheHeading>
    <div class="objects-list">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Saisisssez les données de votre résultat.
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-600">
            Si les éléments ne sont pas valides, les messages d'erreur correspondant s'afficheront
            ci-dessous.
          </p>
          <div v-if="errors.length" class="mt-2 error">
            <strong v-if="errors.length > 1"
              >Merci de corriger les erreurs suivantes du formulaire :</strong
            >
            <strong v-else>Merci de corriger l'erreur suivante du formulaire :</strong>
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </div>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-6">
              <label
                for="form.licensee"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Nom licenci.é.e</label
              >
              <div class="mt-2">
                <select
                  id="form.licensee"
                  v-model="form.licensee"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:max-w-md sm:text-sm sm:leading-6"
                  required
                >
                  <option v-for="option in records" :key="option.id" :value="option.licensee">
                    {{ option.licensee }}
                  </option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="form.ranking"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Classement</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md"
                >
                  <input
                    v-model="form.ranking"
                    id="form.ranking"
                    class="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    min="1"
                    placeholder="123"
                    required
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="form.classifiedCategory"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Nombre de classé.e.s dans la catégorie</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md"
                >
                  <input
                    v-model="form.classifiedCategory"
                    id="form.classifiedCategory"
                    class="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    min="1"
                    placeholder="123"
                    required
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="form.categoryRanking"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Classement dans la catégorie</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md"
                >
                  <input
                    v-model="form.categoryRanking"
                    id="form.categoryRanking"
                    class="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    min="1"
                    placeholder="123"
                    required
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="form.time"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Temps</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md"
                >
                  <input
                    v-model="form.time"
                    id="form.time"
                    class="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="01:23:45"
                    required
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="form.bonusReferee"
                class="block text-sm font-medium leading-6 text-gray-900"
                >Bonus arbitre</label
              >
              <div class="ml-1 mt-2">
                <Switch
                  v-model="form.bonusReferee"
                  :class="[
                    form.bonusReferee ? 'bg-green-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2'
                  ]"
                >
                  <span class="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    :class="[
                      form.bonusReferee ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    ]"
                  />
                </Switch>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="form.bonusPhoto" class="block text-sm font-medium leading-6 text-gray-900"
                >Bonus photo</label
              >
              <div class="ml-1 mt-2">
                <Switch
                  v-model="form.bonusPhoto"
                  :class="[
                    form.bonusPhoto ? 'bg-green-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2'
                  ]"
                >
                  <span class="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    :class="[
                      form.bonusPhoto ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    ]"
                  />
                </Switch>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="form.bonusVideo" class="block text-sm font-medium leading-6 text-gray-900"
                >Bonus vidéo</label
              >
              <div class="ml-1 mt-2">
                <Switch
                  v-model="form.bonusVideo"
                  :class="[
                    form.bonusVideo ? 'bg-green-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2'
                  ]"
                >
                  <span class="sr-only">Use setting</span>
                  <span
                    aria-hidden="true"
                    :class="[
                      form.bonusVideo ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    ]"
                  />
                </Switch>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="form.bonus" class="block text-sm font-medium leading-6 text-gray-900"
                >Bonus</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md"
                >
                  <input
                    v-model="form.bonus"
                    id="form.bonus"
                    class="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    min="0"
                    placeholder="123"
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref, toRaw } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { Switch } from '@headlessui/vue'
import {
  getLicensees,
  goPromise,
  requestGetApiResult,
  requestPatchApiResult,
  requestPostApiResult
} from '@/api'
import { getCalculationPoints } from '@/calculation_rules'
import { isPositiveStrictNumberValid, isTimeValid } from '@/dates'
import { mapCollection, namedResultObjFields } from '@/helpers'
import { useRaceListStore } from '@/stores/racelist'
import TheHeading from '@/components/TheHeading.vue'

const router = useRouter()
const store = useRaceListStore()
const { getRaceById } = storeToRefs(store)
const btn_attrs = { btnAction: true, btnLabel: 'Enregistrer', btnType: 'submit' }
const errors = ref([])
const form = ref({
  licensee: '',
  ranking: 0,
  classifiedCategory: 0,
  categoryRanking: 0,
  time: '',
  bonusReferee: false,
  bonusPhoto: false,
  bonusVideo: false,
  bonus: 0
})
let title = ref('')
let action = ref('')
let raceid = ref('')
let resultid = ref('')
let dataRace = ref({})
let dataLicensee = ref({})
let records = ref([])

function onSubmit(evt) {
  evt.preventDefault()
  errors.value = []

  if (isValid()) {
    // form is valid!
    const bonusReferee = toRaw(form.value).bonusReferee
    const bonusPhoto = toRaw(form.value).bonusPhoto
    const bonusVideo = toRaw(form.value).bonusVideo
    const bonus = toRaw(form.value).bonus
    dataLicensee.value = {
      runner_ranking: parseInt(toRaw(form.value).ranking),
      classified_in_category: parseInt(toRaw(form.value).classifiedCategory),
      ranking_in_category: parseInt(toRaw(form.value).categoryRanking),
      runner_running_time: toRaw(form.value).time,
      ptn_bonus_referee: bonusReferee === null || bonusReferee === undefined ? 0 : bonusReferee,
      ptn_bonus_photo: bonusPhoto === null || bonusPhoto === undefined ? 0 : bonusPhoto,
      ptn_bonus_video: bonusVideo === null || bonusVideo === undefined ? 0 : bonusVideo,
      ptn_bonus: bonus === null || bonus === undefined ? 0 : bonus
    }

    const scoreData = {
      jobName: 'challenge-calculate',
      jobQueue: 'default',
      jobDefinition: 'hello-world',
      race: toRaw(dataRace.value),
      licensee: toRaw(dataLicensee.value)
    }

    const saveForm = {
      ...toRaw(form.value),
      points: getCalculationPoints(JSON.stringify(scoreData)),
      relation: [raceid.value]
    }

    // store data in db (create or update)
    if (action.value == 'create') {
      // toRaw(form.value)
      const promise = fetch(requestPostApiResult(saveForm))
      goPromise(promise, 'create result', process)
    } else {
      // update
      const promise = fetch(requestPatchApiResult(resultid.value, saveForm))
      goPromise(promise, 'update result', process)
    }
    return true
  }

  if (!isPositiveStrictNumberValid(toRaw(form.value).ranking)) {
    errors.value.push("Le classement n'est pas correct.")
  }

  if (!isPositiveStrictNumberValid(toRaw(form.value).classifiedCategory)) {
    errors.value.push("Le nombre de classé.e.s n'est pas correct.")
  }

  if (!isPositiveStrictNumberValid(toRaw(form.value).categoryRanking)) {
    errors.value.push("Le classement dans la catégorie n'est pas correct.")
  }

  if (!isTimeValid(toRaw(form.value).time)) {
    errors.value.push("Le temps inscrit n'est pas correct.")
  }
}

// return true if the form has no errors or false otherwise
function isValid() {
  // check numbers
  const check_ranking = isPositiveStrictNumberValid(toRaw(form.value).ranking)
  const check_classifiedCategory = isPositiveStrictNumberValid(toRaw(form.value).classifiedCategory)
  const check_categoryRanking = isPositiveStrictNumberValid(toRaw(form.value).categoryRanking)
  // check times
  const check_time = isTimeValid(toRaw(form.value).time)
  return check_ranking && check_classifiedCategory && check_categoryRanking && check_time
}

function process(data) {
  // redirect to path
  router.push({ name: 'race', params: { raceid: raceid.value } })
}

function processResult(data) {
  const result = namedResultObjFields(data)
  form.value = result
  resultid.value = result.id
}

function loadForm(resultid) {
  // load data result
  const promise = fetch(requestGetApiResult(resultid))
  goPromise(promise, 'get result', processResult)
}

onMounted(() => {
  // load licensees list
  const licensees = getLicensees(2)  // page number
  licensees
    .then((data) => records.value = data)
    .catch((error) => { console.error(`could not get licensees: ${error}`) })

  // load data race
  const route = useRoute()
  const race = toRaw(getRaceById.value(route.params.raceid))
  raceid.value = race.id
  dataRace.value = {
    race_level: parseFloat(mapCollection(race.level, 'level')),
    race_coefficient: parseFloat(mapCollection(race.coefficient, 'coefficient')),
    is_triathlon: race.coefficient === 'code-coefficient-a',
    format_triathlon_form: race.format,
    classified_men_number: parseInt(race.numberClassifiedMen),
    classified_women_number: parseInt(race.numberClassifiedWomen),
    man_running_time: race.timeFirstMan,
    woman_running_time: race.timeFirstWoman,
    is_championship: false,
    is_britain_form: 0,
    is_triathlon_form: 0
  }

  if (router.currentRoute.value.name.includes('create')) {
    title.value = 'Enregistrer un nouveau résultat'
    action.value = 'create'
  } else {
    title.value = 'Modifier un résultat existant'
    action.value = 'update'
    loadForm(route.params.resultid)
  }
})
</script>
