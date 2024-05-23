<template>
  <img
    v-if="props.sticker === 'bonus-1-cat'"
    src="@/assets/sticker-deltri-bonus-1-category.svg"
    height="64"
    width="64"
    alt="photo sticker deltri"
  />
  <img
    v-if="props.sticker === 'bonus-1-scr'"
    src="@/assets/sticker-deltri-bonus-1-scratch.svg"
    height="64"
    width="64"
    alt="photo sticker deltri"
  />
  <img
    v-if="props.sticker === 'bonus-photo'"
    src="@/assets/sticker-deltri-bonus-photo.svg"
    height="84"
    width="84"
    alt="photo sticker deltri"
  />
  <img
    v-if="props.sticker === 'bonus-referee'"
    src="@/assets/sticker-deltri-bonus-referee.svg"
    height="84"
    width="84"
    alt="photo sticker deltri"
  />
  <img
    v-if="props.sticker === 'bonus-video'"
    src="@/assets/sticker-deltri-bonus-video.svg"
    height="84"
    width="84"
    alt="photo sticker deltri"
  />
  <img
    v-if="props.sticker === 'triathlon-l'"
    src="@/assets/sticker-deltri-triathlon-l.svg"
    height="84"
    width="84"
    alt="photo sticker deltri"
  />
  <img
    v-if="props.sticker === 'triathlon-m'"
    src="@/assets/sticker-deltri-triathlon-m.svg"
    height="84"
    width="84"
    alt="photo sticker deltri"
  />
  <img
    v-if="props.sticker === 'triathlon-s'"
    src="@/assets/sticker-deltri-triathlon-s.svg"
    height="84"
    width="84"
    alt="photo sticker deltri"
  />
  <img
    v-if="props.sticker === 'triathlon-xl'"
    src="@/assets/sticker-deltri-triathlon-xl.svg"
    height="84"
    width="84"
    alt="photo sticker deltri"
  />
  <img
    v-if="props.sticker === 'triathlon-xs'"
    src="@/assets/sticker-deltri-triathlon-xs.svg"
    height="84"
    width="84"
    alt="photo sticker deltri"
  />
</template>

<script setup>
const props = defineProps({
  sticker: String
})
</script>
