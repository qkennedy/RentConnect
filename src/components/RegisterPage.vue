
<template>
  <div class="hello" id="registerForm">
    <h2>Register</h2>
    <form class="fullPageForm" id="loginForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <div class="formWarning" ref="warning">

      </div>
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" ref="test" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.name" />
        <tr>
          <td class="leftColumn">Role</td>
          <td class="rightColumn">
            <select name="role" ref="role">
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
              <option value="maintenanceWorker">Maintenance Worker</option>
            </select>
          </td>
        </tr>
      </table>
      <p><input type="submit" value="Register" /></p>
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
      axios.post('/rest/createuser',
        formFields
      )
        .then(response => {
          axios.post('/rest/login',
            {
              username: formFields.username,
              password: formFields.password
            }
          )
            .then(response => {
              if (response.status === 200) {
                // TODO: update the sidebar
                axios.get('/rest/whoAmI')
                  .then(response => {
                    var role = response.data.role
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
                  })
                  .catch(e => {
                    console.log(e)
                  })
              }
            })
            .catch(e => {
              console.log(e)
            })
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  mounted () {
    document.title = 'Register'
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
