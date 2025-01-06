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

const is_production = () => import.meta.env.MODE === "production"

function display() {
  console.log(2.1, `env: ${import.meta.env.MODE}`, `path: ${import.meta.env.VITE_LOCAL_AVATAR_PATH}`)
}

onMounted(() => {
  display()
  if (props.avatar) {
    if (is_production()) {
      imageUrl.value = "@/assets/images/" + props.avatar
    } else {
      imageUrl.value = `${import.meta.env.VITE_LOCAL_AVATAR_PATH}/${props.avatar}`
    }
  }
  if (!props.female) {
    bgColor.value = 'blue-500'
  }
})
</script>
