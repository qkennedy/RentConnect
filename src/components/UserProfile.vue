<template>
  <div class="hello" id="loginForm">
    <h2>User Profile</h2>
    <div class="alert alert-danger" style="display:none" role="alert" ref="warning">

    </div>
    <h3>Edit Profile</h3>
    <form class=".form-horizontal auth-form" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:value="element.value" v-bind:key="element.id" v-bind:optional="element.optional" divclass="form-group" labelclass="control-label auth-label" inputclass="form-control" />
      <p><input class="btn btn-primary" type="submit" value="Update" /></p>
    </form>
    <h3>Change Password</h3>
    <form class=".form-horizontal auth-form"  id="profileForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmitPassword" @click.capture="resetWarning">
      <form-input v-for="element in passwordChangeElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:value="element.value" v-bind:key="element.id" v-bind:optional="element.optional" divclass="form-group" labelclass="control-label auth-label" inputclass="form-control" />
      <p><input class="btn btn-primary" type="submit" value="Update" /></p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Components from '@/components/UIComponents'

export default {
  name: 'UserProfile',
  data () {
    return {
      formElements: [
        {
          id: 0,
          type: 'text',
          name: 'email',
          caption: 'Email address',
          value: ''
        },
        {
          id: 1,
          type: 'text',
          name: 'cell_number',
          caption: 'Phone number',
          value: ''
        }
      ],
      passwordChangeElements: [
        {
          id: 0,
          type: 'password',
          name: 'curpassword',
          caption: 'Current Password',
          value: ''
        },
        {
          id: 1,
          type: 'password',
          name: 'password',
          caption: 'Set new password',
          value: ''
        },
        {
          id: 2,
          type: 'password',
          name: 'cpassword',
          caption: 'Confirm new password',
          value: ''
        }
      ],
      myId: 0,
      role: ''
    }
  },
  methods: {
    handleSubmit () {
      var formFields = Components.collapse(this.formElements, [])
      axios.post('/rest/user/' + this.myId + '/update',
        formFields
      )
        .then(response => {
          switch (this.role) {
            case 'tenant':
              this.$router.push('/TenantPortal')
              break
            case 'landlord':
              this.$router.push('/LandlordPortal')
              break
            case 'maintenanceWorker':
              this.$router.push('/MaintenancePortal')
              break
            default:
              this.$router.push('/')
              break
          }
        })
        .catch(e => {
          console.log(e)
        })
    },
    handleSubmitPassword () {
      var formFields = Components.collapse(this.passwordChangeElements, [])
      if (formFields.password !== formFields.cpassword) {
        this.$refs.warning.innerHTML = 'Passwords do not match!'
        this.$refs.warning.style.display = 'block'
        return
      }
      axios.post('/rest/user/' + this.myId + '/changePassword',
        formFields
      )
        .then(response => {
          switch (this.role) {
            case 'tenant':
              this.$router.push('/TenantPortal')
              break
            case 'landlord':
              this.$router.push('/LandlordPortal')
              break
            case 'maintenanceWorker':
              this.$router.push('/MaintenancePortal')
              break
            default:
              this.$router.push('/')
              break
          }
        })
        .catch(e => {
          if (typeof e.response !== 'undefined' && e.response.data.description === 'Invalid Password') {
            this.$refs.warning.innerHTML = 'Invalid Password'
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
    document.title = 'User Profile'
    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1) {
      // not logged in or not a tenant, get out of here
      this.$router.push('/')
    }
    axios.get('/rest/user/' + this.$session.get('userId') + '/' + this.$session.get('authToken'))
      .then(response => {
        this.formElements[0].value = response.data.email
        this.formElements[1].value = response.data.cell_number
        this.myId = response.data.id
        this.role = response.data.role
      })
      .catch(e => {
        console.log(e)
      })
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
