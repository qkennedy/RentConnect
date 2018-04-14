<template>
  <div class="hello" id="loginForm">
    <h2>User Profile</h2>
    <div class="formWarning" ref="warning">

    </div>
    <form id="profileForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:value="element.value" v-bind:key="element.id" v-bind:optional="element.optional" />
      </table>
      <p><input type="submit" value="Update" /></p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Components from '@/components/UIComponents'

document.title = 'User profile'

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
          type: 'yesno',
          name: 'publicemail',
          caption: 'Public email address',
          value: ''
        },
        {
          id: 2,
          type: 'password',
          name: 'password',
          caption: 'Set new password',
          value: '',
          optional: true
        },
        {
          id: 3,
          type: 'password',
          name: 'cpassword',
          caption: 'Confirm new password',
          value: '',
          optional: true
        },
        {
          id: 4,
          type: 'text',
          name: 'cell_number',
          caption: 'Phone number',
          value: ''
        },
        {
          id: 5,
          type: 'yesno',
          name: 'publicphone',
          caption: 'Public phone number',
          value: 1
        }
      ]
    }
  },
  methods: {
    handleSubmit () {
      var formFields = Components.collapse(this.formElements, [])
      if (formFields.password !== formFields.cpassword) {
        this.$refs.warning.innerHTML = 'Passwords do not match!'
        this.$refs.warning.style.display = 'block'
        return
      }
      // TODO: submit this to the appropriate endpoint
      axios.post('/rest/',
        formFields
      )
        .then(response => {
          // TODO: redirect to portal
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  components: {
    Components
  },
  mounted () {
    axios.get('/rest/whoAmI')
      .then(response => {
        this.formElements[0].value = response.data.email
        this.formElements[4].value = response.data.cell_number
        // TODO: populate value for public phone/email
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

#loginForm {
  text-align:center;
}

#loginTable {
  width: 100%;
}
</style>
