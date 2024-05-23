<template>
  <span :class="{ 'ml-3': !isFirst }">{{ label }} :</span>
  &nbsp;
  <TheBadge bg-color="blue-100" text-color="blue-700"
    ><strong>{{ value }}</strong></TheBadge
  >
</template>

<script setup>
import TheBadge from '@/components/TheBadge.vue'

const props = defineProps({
  label: String,
  value: String,
  isFirst: { type: Boolean, default: false }
})
</script>
