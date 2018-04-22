<template>
  <div id="app">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#/">RentConnect</a>
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbarSupportedContent" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="nav navbar-nav">
            <li><a class="nav-link" href="#/receipts">My Receipts</a></li>
            <li><a class="nav-link" href="#/insights">Insights</a></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="rg-app" v-if="isReturning()">
        <router-view/>
      </div>
      <div class="rg-tutorial" v-else>
        <h1>New User tutorial</h1>
        <button class="btn btn-success" @click="tutorialComplete">All good!</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      returning: false
    }
  },
  methods: {
    isReturning () {
      return this.returning
    },
    tutorialComplete () {
      this.returning = true
    },
    redoTutorial () {
      this.returning = false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
