<template>
  <div id="loginForm">
    <h2>Log In</h2>
    <form class="fullPageForm" id="loginForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <div class="formWarning" ref="warning">

      </div>
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.id" />
      </table>
      <p><input type="submit" value="Log in!" /></p>
    </form>
  </div>
</template>

<script>
import Components from '@/components/UIComponents'
import axios from 'axios'

document.title = 'Log in'

export default {
  name: 'LoginPage',
  data () {
    return {
      formElements: [
        {
          id: 0,
          type: 'text',
          name: 'username',
          caption: 'Username'
        },
        {
          id: 1,
          type: 'password',
          name: 'password',
          caption: 'Password'
        }
      ]
    }
  },
  methods: {
    handleSubmit () {
      axios.post('/rest/login',
        Components.collapse(this.formElements, [])
      )
        .then(response => {
          // TODO: make this refresh the sidebar on a successful login
          if (response.data.status === 'loggedin') {
            this.$router.push(response.data.next)
          } else {
            this.$refs.warning.innerHTML = 'Login failed. Please try again.'
            this.$refs.warning.style.display = 'block'
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  components: {
    Components
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
