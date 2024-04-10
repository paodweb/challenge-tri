<template>
  <div class="md:flex md:items-center md:justify-between mb-5">
    <div class="min-w-0 flex">
      <img src="@/assets/logo-del.svg" width="64" height="64" alt="DEl logo" class="logo" />
    </div>
    <div class="min-w-0 flex-1">
      <h2
        class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
      >
        {{ title }} <small class="subtitle">{{ subtitle }}</small>
      </h2>
    </div>
    <div class="mt-4 flex md:ml-4 md:mt-0">
      <button
        type="button"
        class="rounded-full bg-white p-1.5 text-sm font-semibold text-gray-900 shadow ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        @click="backNavigation()"
      >
        <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        v-if="btnAction"
        class="mr-3 ml-3 inline-flex items-center rounded-full bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        :type="btnType"
        @click="$emit('on-click')"
      >
        {{ btnLabel }}
      </button>
      <!--
      <button type="button" class="rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">Button text</button>
      <button type="button" class="rounded-md bg-pink-50 px-2.5 py-1.5 text-sm font-semibold text-pink-600 shadow-sm hover:bg-pink-100">
      Ajouter une course
      </button>
      -->
    </div>
  </div>
  <hr class="shadow" />
</template>

<script setup>
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import { useRouter } from 'vue-router'

const router = useRouter()
const backNavigation = () => {
  router.back()
}

defineProps({
  title: String,
  subtitle: String,
  btnAction: String,
  btnLabel: String,
  btnType: String
})
</script>
