<template>
  <div class="hello" id="loginForm">
    <h2>Register</h2>
    <form id="loginForm" method="post" enctype="multipart/form-data">
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.id" />
      </table>
      <p><input type="submit" value="Register" /></p>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'Register',
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
        },
        {
          id: 6,
          type: 'text',
          name: 'role',
          caption: 'Role'
        }
      ]
    }
  }
}

Vue.component('form-input', {
  props: ['type', 'name', 'caption'],
  template: '<tr><td style="width:40%"></td><td>{{ caption }}</td><td><input v-bind:type="type" v-bind:name="name" v-bind:placeholder="caption" /><td style="width:40%"></td></td>'
})
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
