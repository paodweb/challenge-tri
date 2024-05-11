<template>
  <h1 class="pink heading text-center">🚧 &nbsp;En construction&nbsp;🚧</h1>
  <br />
  <p>
    <span class="text-gray-500">Légende : </span>
    <WomenRankingBadge></WomenRankingBadge>
    <span class="text-pink-700">&nbsp;classement féminin</span>&nbsp;
    <RankedFirstBadge></RankedFirstBadge>
    <span class="text-yellow-800"
      >&nbsp;nombre de fois 1<sup>er.ère</sup> au classement (général ou catégorie)</span
    >&nbsp;
    <ContestedTriathlonsBadge></ContestedTriathlonsBadge>
    <span class="text-blue-700">&nbsp;nombre de triathlon(s) disputé(s)</span>&nbsp;
  </p>
  <br />
</template>

<script setup>
import ContestedTriathlonsBadge from '@/components/ContestedTriathlonsBadge.vue'
import RankedFirstBadge from '@/components/RankedFirstBadge.vue'
import WomenRankingBadge from '@/components/WomenRankingBadge.vue'
</script>
