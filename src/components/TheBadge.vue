<template>
  <span
    :class="`inline-flex items-center rounded-full bg-${bgColor} px-2 py-1 text-xs font-medium text-${textColor}`"
  >
    <slot>{{ textBadged }}</slot>
  </span>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const textBadged = ref('1')

const props = defineProps({
  bgColor: String,
  textColor: String,
  valueDisplayed: { type: String, default: '1' }
})

onMounted(() => {
  if (props.valueDisplayed != '1') {
    textBadged.value = props.valueDisplayed
  }
})
</script>

<style scoped>
.bg-blue-100 {
  --tw-bg-opacity: 1;
  color: rgb(29 78 216 / var(--tw-bg-opacity));
}
.bg-indigo-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(224 231 255 / var(--tw-bg-opacity));
}
.bg-pink-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(252 231 243 / var(--tw-bg-opacity));
}
.bg-yellow-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 249 195 / var(--tw-bg-opacity));
}
</style>
