<template>
  <ul class="divide-y divide-gray-200">
    <HockeyTeamItem v-for="team in teams" :key="team.id" :team="team" />
  </ul>
</template>

<script>
export default {
  props: { teams: Array }
}
</script>
