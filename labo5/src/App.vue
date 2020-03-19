<template>
  <div id="app">
    <nav-menu> </nav-menu>
    <router-view />
  </div>
</template>

<script>

import Header from './components/Header'

export default {
  name: 'App',
  components: {
    "nav-menu": Header
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
