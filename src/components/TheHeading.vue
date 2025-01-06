<template>
  <div class="md:flex md:items-center md:justify-between mb-5">
    <div class="min-w-0 flex">
      <img src="@/assets/logo-del.svg" width="64" height="64" alt="DEl logo" class="logo" />
    </div>
    <div class="min-w-0 flex-1">
      <h1
        class="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight"
      >
        {{ title }} <small class="subtitle">&nbsp;{{ subtitle }}</small>
      </h1>
    </div>
    <div class="mt-4 flex md:ml-4 md:mt-0" v-if="show">
      <button
        type="button"
        class="rounded-full bg-white p-1.5 text-sm font-semibold text-gray-900 shadow ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        @click="goHome()"
      >
        <HomeIcon class="h-5 w-5 text-pink-500" aria-hidden="true" />
      </button>
      <button
        type="button"
        class="ml-2 rounded-full bg-white p-1.5 text-sm font-semibold text-gray-900 shadow ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
        @click="backNavigation()"
      >
        <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        v-if="btnAction"
        class="mr-2 ml-2 inline-flex items-center rounded-full bg-pink-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
        :type="btnType"
        @click="$emit('on-click')"
      >
        {{ btnLabel }}
      </button>
    </div>
  </div>
  <hr class="shadow" />
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeftIcon, HomeIcon } from '@heroicons/vue/20/solid'

defineEmits(['on-click'])

const show = ref(true)

const props = defineProps({
  title: String,
  subtitle: String,
  btnAction: Boolean,
  btnLabel: String,
  btnType: String,
  showButtons: { type: Boolean, default: true }
})

const router = useRouter()
const backNavigation = () => {
  router.back()
}
const goHome = () => {
  router.push({ name: 'races' })
}

onMounted(() => {
  if (!props.showButtons) {
    show.value = props.showButtons
  }
})
</script>
