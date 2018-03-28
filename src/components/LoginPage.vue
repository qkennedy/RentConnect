<template>
  <div class="hello" id="loginForm">
    <h2>Log In</h2>
    <form id="loginForm" method="post" enctype="multipart/form-data">
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.id" />
      </table>
      <p><input type="submit" value="Log in!" /></p>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'

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
