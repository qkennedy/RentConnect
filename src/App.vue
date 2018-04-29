<template>
  <div id="app">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link class="navbar-brand" to="/">RentConnect</router-link>
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbarSupportedContent" aria-expanded="false" v-on:click.stop="toggleHeader">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" ref="navbar">
          <ul class="nav navbar-nav">
            <li v-if="!loggedIn"><router-link to="/Login">Log In</router-link></li>
            <li v-if="!loggedIn"><router-link to="/Register">Register</router-link></li>
            <li v-if="loggedIn && role==='tenant'"><router-link to="/TenantPortal">My Portal</router-link></li>
            <li v-if="loggedIn && role==='landlord'"><router-link to="/LandlordPortal">My Portal</router-link></li>
            <li v-if="loggedIn && role==='maintenanceWorker'"><router-link to="/MaintenancePortal">My Portal</router-link></li>
            <li v-if="loggedIn"><router-link to="/UserProfile">Edit Profile</router-link></li>
            <li v-if="loggedIn"><router-link to="/Logout">Log Out</router-link></li>
          </ul>
          <ul class="nav navbar-nav navbar-right">
            <li v-if="loggedIn"><router-link to="/UserProfile">Logged in as: <b>{{username}}</b></router-link></li>
            <li v-if="!loggedIn"><router-link to="/Login">Not logged in</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="rg-app">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      returning: false,
      loggedIn: false,
      username: '',
      role: ''
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
    },
    updateSidebar () {
      this.$session.start()
      if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1) {
        this.loggedIn = false
      } else {
        this.loggedIn = true
        this.role = this.$session.get('userRole')
        axios.get('/rest/user/' + this.$session.get('userId') + '/' + this.$session.get('authToken'))
          .then(response => {
            this.username = response.data.username
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    toggleHeader () {
      if (this.$refs.navbar.style.display === 'none') {
        this.$refs.navbar.style.display = 'block'
      } else {
        this.$refs.navbar.style.display = 'none'
      }
    }
  },
  mounted () {
    this.$eventHub.$on('update-sidebar', this.updateSidebar)
    this.updateSidebar()
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

dl {
  text-align:left
}
</style>
