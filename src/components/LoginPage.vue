<template>
  <div id="loginForm" width = 500px>
    <h2>Sign into RentConnect</h2>
    <form class=".form-horizontal auth-form" id="loginForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit" @click.capture="resetWarning">
      <div class="formWarning" ref="warning">
      </div>
      <!--
      <div class="form-group">
        <label class = ".control-label auth-label" for="usr">Name:</label>
        <input type="text" class="form-control" id="usr">
      </div>
      <div class="form-group">
        <label class = "control-label auth-label" for="pwd">Password:</label>
        <input type="password" class="form-control" id="pwd">
      </div>
    -->

      <form-input v-for="e in formElements" v-bind:key="e.id" v-bind:name="e.name" v-bind:caption="e.caption" v-bind:type="e.type" divclass="form-group" labelclass="control-label auth-label" inputclass="form-control"></form-input>
      <p><input class="btn btn-primary" type="submit" value="Log in!" /></p>
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
.auth-form {
    width: 340px;
    margin: 0 auto;
}
.form-group {
  text-align: left;
}
</style>
