<template>
  <div class="hello" id="loginForm">
    <h2>User Profile</h2>
    <form id="profileForm" method="post" enctype="multipart/form-data">
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:value="element.value" v-bind:key="element.id" />
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
        // TODO: populate the values with the current values from the database
        {
          id: 0,
          type: 'text',
          name: 'email',
          caption: 'Email address',
          value: '...current email...'
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
          name: 'password1',
          caption: 'Set new password',
          value: ''
        },
        {
          id: 3,
          type: 'password',
          name: 'password2',
          caption: 'Confirm new password',
          value: ''
        },
        {
          id: 4,
          type: 'text',
          name: 'phone',
          caption: 'Phone number',
          value: '...current phone number...'
        },
        {
          id: 5,
          type: 'yesno',
          name: 'publicphone',
          caption: 'Public phone number',
          value: ''
        }
      ]
    }
  },
  methods: {
    handleSubmit () {
      // TODO: update user
      axios.post('/rest/',
        Components.collapse(this.formElements, [''])
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
