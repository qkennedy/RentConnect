
<template>
  <div class="hello" id="registerForm">
    <h2>Register</h2>
    <form class="fullPageForm" id="loginForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" ref="test" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.name" />
        <!-- TODO make this a form-input -->
        <tr>
          <td class="leftColumn">Role</td>
          <td class="rightColumn">
            <select name="role" ref="role">
              <option value="tenant">Tenant</option>
              <option value="landlord">Landlord</option>
              <option value="maint">Maintenance Worker</option>
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

document.title = 'Register'

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
      axios.post('/rest/createuser',
        Components.collapse(this.formElements, ['role'])
      )
        .then(response => {
          // TODO: log in as new user
          switch (this.$refs.role.value) {
            case 'tenant':
              this.$router.push('/TenantPortal')
              break
            case 'landlord':
              this.$router.push('/LandlordPortal')
              break
            case 'maint':
              this.$router.push('/MaintenancePortal')
              break
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
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
