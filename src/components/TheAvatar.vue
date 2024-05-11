<template>
  <span :class="`inline-flex h-12 w-12 items-center justify-center rounded-full bg-${bgColor}`">
    <span class="text-lg font-medium leading-none text-white">{{ initials }}</span>
  </span>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const bgColor = ref('pink-500')
const initials = ref('')

const props = defineProps({
  female: Boolean,
  name: String
})

const getInitials = (fullName) => {
  const allNames = fullName.trim().split(' ')
  const initials = allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`
    }
    return acc
  }, '')
  return initials
}

onMounted(() => {
  initials.value = getInitials(props.name)
  if (!props.female) {
    bgColor.value = 'blue-500'
  }
})
</script>

<style scoped>
.bg-blue-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity));
}

.bg-pink-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(236 72 153 / var(--tw-bg-opacity));
}
</style>
