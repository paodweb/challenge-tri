<template>
  <form @submit.prevent="onSubmit" role="form">
    <TheHeading :title="title" :subtitle="form.title" v-bind="btn_attrs"> </TheHeading>
    <div class="objects-list">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            Saisisssez les données de votre course.
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
                for="form.title"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Nom de la course</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md"
                >
                  <input
                    class="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    id="form.title"
                    placeholder="Triathlon de Plouescat • S"
                    required
                    type="text"
                    v-model="form.title"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="form.date"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Date de la course</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md"
                >
                  <input
                    class="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    id="form.date"
                    required
                    type="date"
                    v-model="form.date"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="form.level"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Niveau de la course</label
              >
              <div class="mt-2">
                <select
                  id="form.level"
                  v-model="form.level"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:max-w-md sm:text-sm sm:leading-6"
                  required
                >
                  <option v-for="option in levelOptions" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="form.coefficient"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Coefficient de la course</label
              >
              <div class="mt-2">
                <select
                  id="form.coefficient"
                  v-model="form.coefficient"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:max-w-md sm:text-sm sm:leading-6"
                  required
                >
                  <option
                    v-for="option in coefficientOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>

            <!-- visible if Triathlon • x3 -->
            <div
              v-if="['code-coefficient-a', 'code-coefficient-b'].includes(form.coefficient)"
              class="sm:col-span-6"
            >
              <label
                for="form.format"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Format du triathlon</label
              >
              <div class="mt-2">
                <select
                  id="form.format"
                  v-model="form.format"
                  class="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:max-w-md sm:text-sm sm:leading-6"
                  required
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="form.numberClassifiedMen"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Nombre de coureurs classés</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md"
                >
                  <input
                    v-model="form.numberClassifiedMen"
                    id="form.numberClassifiedMen"
                    class="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    min="0"
                    placeholder="123"
                    required
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="form.numberClassifiedWomen"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Nombre de coureuses classées</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md"
                >
                  <input
                    v-model="form.numberClassifiedWomen"
                    id="form.numberClassifiedWomen"
                    class="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    min="0"
                    placeholder="123"
                    required
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label
                for="form.timeFirstMan"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Temps 1er homme</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md"
                >
                  <input
                    v-model="form.timeFirstMan"
                    id="form.timeFirstMan"
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
                for="form.timeFirstWoman"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Temps 1ère femme</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md"
                >
                  <input
                    v-model="form.timeFirstWoman"
                    id="form.timeFirstWoman"
                    class="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="01:23:45"
                    required
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="form.link" class="block text-sm font-medium leading-6 text-gray-900"
                >Lien aux résultats</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md"
                >
                  <input
                    v-model="form.link"
                    id="form.link"
                    class="block flex-1 border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="https://example.com"
                    type="url"
                  />
                </div>
              </div>
            </div>

            <div class="sm:col-span-6">
              <label for="form.comment" class="block text-sm font-medium leading-6 text-gray-900"
                >Commentaire</label
              >
              <div class="mt-2">
                <div class="flex sm:max-w-md">
                  <textarea
                    v-model="form.comment"
                    id="form.comment"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    placeholder="Votre commentaire..."
                  >
                  </textarea>
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
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { isDateValid, isPositiveStrictNumberValid, isTimeValid } from '@/dates'
import { requestPatchApiRace, requestPostApiRace } from '@/api'
import { getSelectOptions } from '@/helpers'
import { useRaceListStore } from '@/stores/racelist'
import TheHeading from '@/components/TheHeading.vue'

const router = useRouter()
const store = useRaceListStore()
const { getRaceById } = storeToRefs(store)
const btn_attrs = { btnAction: true, btnLabel: 'Enregistrer', btnType: 'submit' }
const errors = ref([])
const form = ref({
  coefficient: '',
  comment: '',
  date: '',
  format: '',
  level: '',
  link: '',
  numberClassifiedMen: 0,
  numberClassifiedWomen: 0,
  timeFirstMan: '',
  timeFirstWoman: '',
  title: ''
})
let title = ref('')
let action = ref('')
let id = ref('')
let levelOptions = ref([])
let coefficientOptions = ref([])

function onSubmit(evt) {
  evt.preventDefault()
  errors.value = []

  if (isValid()) {
    // form is valid!
    // store data in db
    if (action.value == 'create') {
      const promise = fetch(requestPostApiRace(toRaw(form.value)))
      promise
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
          }
          return response.json()
        })
        .then(() => {
          // redirect to races path
          router.push({ name: 'races' })
        })
        .catch((error) => {
          console.error(`could not create race: ${error}`)
        })
    } else {
      // update
      const promise = fetch(requestPatchApiRace(id.value, toRaw(form.value)))
      promise
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
          }
          return response.json()
        })
        .then(() => {
          // redirect to races path
          router.push({ name: 'races' })
        })
        .catch((error) => {
          console.error(`could not update race: ${error}`)
        })
    }
    return true
  }

  if (!toRaw(form.value).title) {
    errors.value.push('Le nom de la course est obligatoire.')
  }

  if (!toRaw(form.value).date) {
    errors.value.push('La date de la course est obligatoire.')
  } else {
    if (!isDateValid(toRaw(form.value).date)) {
      errors.value.push("La date n'est pas correcte.")
    }
  }

  if (!isPositiveStrictNumberValid(toRaw(form.value).numberClassifiedWomen)) {
    errors.value.push("Le nombre de coureuses classées n'est pas correct.")
  }

  if (!isPositiveStrictNumberValid(toRaw(form.value).numberClassifiedMen)) {
    errors.value.push("Le nombre de coureurs classés n'est pas correct.")
  }

  if (!isTimeValid(toRaw(form.value).timeFirstWoman)) {
    errors.value.push("Le temps de la 1ère féminine n'est pas correct.")
  }

  if (!isTimeValid(toRaw(form.value).timeFirstMan)) {
    errors.value.push("Le temps du 1er masculin n'est pas correct.")
  }
}

// return true if the form has no errors or false otherwise
function isValid() {
  const check_ti_da = toRaw(form.value).title && isDateValid(toRaw(form.value).date)
  // check numbers
  const check_number_men = isPositiveStrictNumberValid(toRaw(form.value).numberClassifiedMen)
  const check_number_women = isPositiveStrictNumberValid(toRaw(form.value).numberClassifiedWomen)
  // check times
  const check_times =
    isTimeValid(toRaw(form.value).timeFirstMan) && isTimeValid(toRaw(form.value).timeFirstWoman)
  return check_ti_da && check_number_men && check_number_women && check_times
}

function loadForm(race_id) {
  const race = toRaw(getRaceById.value(race_id))
  form.value = race
  id.value = race.id
}

onMounted(() => {
  levelOptions = getSelectOptions()
  coefficientOptions = getSelectOptions('coefficient')

  if (router.currentRoute.value.name.includes('create')) {
    title.value = 'Créer une course'
    action.value = 'create'
  } else {
    title.value = 'Modifier la course'
    action.value = 'update'
    loadForm(toRaw(router.currentRoute.value).params.id)
  }
})
</script>
