<template>
  <div id="loginForm">
    <h2>Log out</h2>
    <p>
      You have been successfully logged out.
    </p>
    <ul>
      <li>
        <router-link to="/Login">Log in again</router-link>
      </li>
      <li>
        <router-link to="/">Return to home page</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Components from '@/components/UIComponents'
// import axios from 'axios'

export default {
  name: 'LogoutPage',
  data () {
    return {
    }
  },
  components: {
    Components
  },
  mounted () {
    document.title = 'Log out'
    this.$eventHub.$emit('update-sidebar')
    // TODO: access the API endpoint to log user out
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
