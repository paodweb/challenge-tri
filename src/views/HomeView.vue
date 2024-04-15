<template>
  <header>
    <img src="@/assets/logo-del.svg" width="256" height="256" alt="DEl logo" class="logo" />
    <div class="wrapper">
      <HelloWorld msg="Challenge triathlon" />
      <TheNav />
    </div>
  </header>
  <main>
    <TheWelcome />
  </main>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
import TheNav from '@/components/TheNav.vue'
import TheWelcome from '@/components/TheWelcome.vue'
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: inline-block;
  margin: auto;
  width: 50%;
  vertical-align: top;
}
main {
  display: inline-block;
  width: 50%;
}
.logo {
  display: block;
  margin: 0 auto 2rem;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}
nav a.router-link-exact-active {
  color: var(--color-text);
}
nav a.router-link-exact-active:hover {
  background-color: transparent;
}
@media (min-width: 1024px) {
  header {
    /* display: flex;
    place-items: center; */
    padding-right: calc(var(--section-gap) / 2);
    display: inline-block;
    margin: auto;
    width: 50%;
    vertical-align: top;
  }

  .logo {
    margin: auto;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    margin: auto;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;
    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
