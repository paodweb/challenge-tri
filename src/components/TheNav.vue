<template>
  <nav>
    <RouterLink to="/" class="vue-pink">Accueil</RouterLink>
    <RouterLink to="/results" class="vue-pink">Consulter les résultats</RouterLink>
    <RouterLink to="/races" class="vue-pink">Enregistrer une course</RouterLink>
  </nav>
</template>

<style scoped>
nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
