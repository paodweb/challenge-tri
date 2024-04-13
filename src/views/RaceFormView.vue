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
                  <option value="1.5">Championnat de Bretagne • x1.5</option>
                  <option value="1.5">Championnat de France sans qualification • x1.5</option>
                  <option value="2.0">Championnat de France sur sélection • x2</option>
                  <option value="3.0">Championnat international sur sélection • x3</option>
                  <option value="1.0" selected>France Métropolitaine • x1</option>
                  <option value="1.5">Hors France métropolitaine • x1.5</option>
                  <option value="5.0">International Élite (CE, JO, Hawaï Pro) • x5</option>
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
                  <option value="3.0">Triathlon • x3</option>
                  <option value="3.0">Duathlon • x3</option>
                  <option value="1.5">Aquathlon • x1.5</option>
                  <option value="1.5">Swim&Run / Run&Bike • x1.5</option>
                  <option value="1.0" selected>Autres • x1</option>
                </select>
              </div>
            </div>

            <!-- visible if Triathlon • x3 -->
            <div v-if="parseFloat(form.coefficient) == 3.0" class="sm:col-span-6">
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
                for="form.numberClassifiedMenRunners"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Nombre de coureurs classés</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md"
                >
                  <input
                    v-model="form.numberClassifiedMenRunners"
                    id="form.numberClassifiedMenRunners"
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
                for="form.numberClassifiedWomenRunners"
                class="block text-sm font-medium leading-6 text-gray-900 required"
                >Nombre de coureuses classées</label
              >
              <div class="mt-2">
                <div
                  class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-pink-600 sm:max-w-md"
                >
                  <input
                    v-model="form.numberClassifiedWomenRunners"
                    id="form.numberClassifiedWomenRunners"
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
import { isDateValid, isPositiveStrictNumberValid, isTimeValid, reverseDate } from '@/dates'
import { postApiRace, putApiRace } from '@/api'
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
  numberClassifiedMenRunners: 0,
  numberClassifiedWomenRunners: 0,
  timeFirstMan: '',
  timeFirstWoman: '',
  title: ''
})
let title = ref('')
let action = ref('')
let id = ref('')

function onSubmit(evt) {
  evt.preventDefault()
  errors.value = []

  if (isValid()) {
    // form is valid!
    // specific case: date needs to be saved in fr format dd-mm-yyyy
    toRaw(form.value).date = reverseDate(toRaw(form.value).date)
    // store data in db
    if (action.value == 'create') {
      postApiRace(toRaw(form.value))
    } else {
      putApiRace(id.value, toRaw(form.value))
    }
    // redirect to races path
    router.push({ name: 'races' })
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

  if (!isPositiveStrictNumberValid(toRaw(form.value).numberClassifiedWomenRunners)) {
    errors.value.push("Le nombre de coureuses classées n'est pas correct.")
  }

  if (!isPositiveStrictNumberValid(toRaw(form.value).numberClassifiedMenRunners)) {
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
  const check_number_men = isPositiveStrictNumberValid(toRaw(form.value).numberClassifiedMenRunners)
  const check_number_women = isPositiveStrictNumberValid(
    toRaw(form.value).numberClassifiedWomenRunners
  )
  // check times
  const check_times =
    isTimeValid(toRaw(form.value).timeFirstMan) && isTimeValid(toRaw(form.value).timeFirstWoman)
  return check_ti_da && check_number_men && check_number_women && check_times
}

function loadForm(race_id) {
  const race = toRaw(getRaceById.value(race_id))
  form.value = race
  id.value = race.id
  // specific case: date needs to be converted system format yyyy-mm-dd in the form
  toRaw(form.value).date = reverseDate(toRaw(form.value).date)
}

onMounted(() => {
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
