<template>
  <div id="app">

    <homepage/>
  </div>
</template>

<script>
import HomePage from './components/Homepage'

export default {
  name: 'App',
  components: {
    "homepage": HomePage
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
  margin-top: 60px;
}
</style>
