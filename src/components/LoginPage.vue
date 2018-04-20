<template>
  <div id="loginForm">
    <h2>Log In</h2>
    <form class="fullPageForm" id="loginForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit" @click.capture="resetWarning">
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

export default {
  name: 'LoginPage',
  data () {
    return {
      pageTitle: 'Log in - RentConnect',
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
          if (response.status === 200 && 'id' in response.data) {
            // TODO: Eventually update this to use JWT tokens
            var role = response.data.role
            this.$session.start()
            this.$session.set('userId', response.data.id)
            this.$session.set('authToken', response.data.auth_token)
            this.$session.set('userRole', role)
            console.log(response.data)
            console.log(response.data.auth_token)
            this.$eventHub.$emit('update-sidebar')
            switch (role) {
              case 'tenant':
                this.$router.push('/TenantPortal')
                break
              case 'landlord':
                this.$router.push('/LandlordPortal')
                break
              case 'maintenanceWorker':
                this.$router.push('/MaintenancePortal')
                break
              case 'prospectiveUser':
                this.$router.push('/')
                break
            }
          }
        })
        .catch(e => {
          if (typeof e.response === 'undefined') {
            console.log(e)
          } else if (e.response.status === 401) {
            this.$refs.warning.innerHTML = 'Login failed. Please try again.'
            this.$refs.warning.style.display = 'block'
          } else {
            console.log(e)
          }
        })
    },
    resetWarning () {
      this.$refs.warning.style.display = 'none'
    }
  },
  components: {
    Components
  },
  mounted () {
    document.title = 'Log in'
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
