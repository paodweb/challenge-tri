<template>
  <nav>
    <RouterLink to="/" class="vue-green">Home</RouterLink>
    <RouterLink to="/about" class="vue-green">About</RouterLink>
    <RouterLink to="/races" class="vue-green">Liste des courses</RouterLink>
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
