<template>
  <div class="hello" id="registerForm">
    <h2>Register</h2>
    <form class=".form-horizontal auth-form" id="loginForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit" @click.capture="resetWarning">
      <div class="formWarning" ref="warning">

      </div>
        <form-input v-for="element in formElements" ref="test" v-bind:type="element.type"
          v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.name"
          divclass="form-group" labelclass="control-label auth-label" inputclass="form-control"/>
          <div class="form-group">
            <label class="control-label auth-label" for="role">Role</label>
            <select name="role" id="role" ref="role" class="form-control">
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
              <option value="maintenanceWorker">Maintenance Worker</option>
            </select>
          </div>
      <p><input class="btn btn-primary" type="submit" value="Register" /></p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Components from '@/components/UIComponents'

export default {
  name: 'Register',
  data () {
    return {
      username: '',
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
        },
        {
          id: 2,
          type: 'password',
          name: 'cpassword',
          caption: 'Confirm Password'
        },
        {
          id: 3,
          type: 'email',
          name: 'email',
          caption: 'Email Address'
        },
        {
          id: 4,
          type: 'text',
          name: 'phone',
          caption: 'Phone Number'
        },
        {
          id: 5,
          type: 'text',
          name: 'name',
          caption: 'Your Name'
        }
      ]
    }
  },
  components: {
    Components
  },
  methods: {
    handleSubmit () {
      var formFields = Components.collapse(this.formElements, ['role'])
      if (formFields.password !== formFields.cpassword) {
        this.$refs.warning.innerHTML = 'Passwords do not match!'
        this.$refs.warning.style.display = 'block'
        return
      }
      axios.post('/rest/user/create',
        formFields
      )
        .then(response => {
          axios.post('/rest/login',
            Components.collapse(this.formElements, [])
          )
            .then(response => {
              if (response.status === 200 && 'id' in response.data) {
                // TODO: Eventually update this to use JWT tokens
                var role = response.data.role
                this.$session.start()
                this.$session.set('userId', response.data.id)
                this.$session.set('userRole', role)
                this.$session.set('authToken', response.data.auth_token)
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
        })
        .catch(e => {
          console.log(e)
        })
    },
    resetWarning () {
      this.$refs.warning.style.display = 'none'
    }
  },
  mounted () {
    document.title = 'Register'
  }
}
</script>

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
