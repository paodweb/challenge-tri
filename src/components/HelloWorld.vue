<script setup>
import ArrowTopRightOnSquareIcon from '@/components/icons/ArrowTopRightOnSquareIcon.vue'
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="pink">{{ msg }}</h1>
    <h3>
      Le challenge légendaire du club des Dauphins de l'Elorn triathlon Landerneau (DEL)
      <a href="https://www.dauphinsdelelorn.com/" class="icon-link"
        ><ArrowTopRightOnSquareIcon class="h-4 w-4 text-pink-500" /></a
      >.
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}
h3 {
  font-size: 1.2rem;
}
.greetings h1,
.greetings h3 {
  text-align: center;
}
@media (min-width: 1024px) {
  .greetings h1 {
    text-align: center;
  }
  .greetings h3 {
    text-align: left;
  }
}
</style>
