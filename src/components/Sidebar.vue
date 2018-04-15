<template>
  <div id="sidebar" ref="sidebar">
    <p v-if="!loggedIn">You are not logged in.</p>
    <ul class="optionlist" id="sidebaroptions">
      <li class="first" v-if="!loggedIn"><a href="#/Login">Log In</a></li>
      <li v-if="!loggedIn"><a href="#/Register">Register</a></li>
      <li class="first" v-if="loggedIn">
        Logged in as:<br />{{ username }}
      </li>
      <li v-if="loggedIn">
        <a href="#/UserProfile">Edit Profile</a>
      </li>
      <li v-if="loggedIn"><a href="#/Logout">Log Out</a></li>
      <li v-if="loggedIn && role==='tenant'"><a href="#/TenantPortal">My Portal</a></li>
      <li v-if="loggedIn && role==='landlord'"><a href="#/LandlordPortal">My Portal</a></li>
      <li v-if="loggedIn && role==='maintenanceWorker'"><a href="#/MaintenancePortal">My Portal</a></li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Sidebar',
  data () {
    return {
      // TODO: get all this from the backend
      loggedIn: false,
      username: '',
      role: ''
    }
  },
  methods: {
    updateSidebar () {
      axios.get('/rest/whoAmI')
        .then(response => {
          if (response.data.id > 0) {
            console.log('Logged in')
            this.loggedIn = true
            this.username = response.data.username
            this.role = response.data.role
          } else {
            this.loggedIn = false
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    this.$eventHub.$on('update-sidebar', this.updateSidebar)
    this.updateSidebar()
  }
}
</script>

<style>
#sidebar {
  height:100%;
  float:right;
  background-color:#39F;
  left:0px;
  top:0px;
  margin: 0px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  position:absolute;
  clear:both;
  width:200px;
}

#sidebar p {
  padding-left:5px;
}

#sidebaroptions {
  margin:0;
  padding:0;
}

.optionlist li {
  list-style-type: none;
  padding-left:0px;
  margin-left:0px;
  margin-right:0px;
  text-align:center;
  border: 1px solid #000;
  display:block;
  border-top: none;
}

.optionlist li.first {
  border-top: 1px solid #000;
}

#container {
  float:left;
  position:absolute;
  clear:both;
  margin-right: 0px;
  right:0px;
  left:200px;
}

body {
  padding: 0px;
}
</style>
