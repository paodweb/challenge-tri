<template>
  <img
    v-if="avatar"
    :src="imageUrl"
    class="h-12 w-12 flex-none rounded-full bg-gray-50"
    :alt="`photo ${licensee}`"
  />
  <TheAvatar v-else :female="female" :name="licensee"></TheAvatar>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import TheAvatar from '@/components/TheAvatar.vue'

const bgColor = ref('pink-500')
const imageUrl = ref('')

const props = defineProps({
  // firstname, id, slugname, sumPoints
  avatar: String,
  female: Boolean,
  licensee: String
})

onMounted(() => {
  if (props.avatar) {
    imageUrl.value = `${import.meta.env.VITE_LOCAL_AVATAR_PATH}/${props.avatar}`
  }
  if (!props.female) {
    bgColor.value = 'blue-500'
  }
})
</script>
