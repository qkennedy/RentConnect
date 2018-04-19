<template>
  <div id="loginForm">
    <h2>Manage Maintenance Roster</h2>
    <table border="0px" class="standardTable">
      <tr>
        <th>
          Username
        </th>
        <th>
          Email address
        </th>
        <th>
          Actions
        </th>
      </tr>
      <worker-entry v-for="worker in roster" v-bind:key="worker.id" v-bind:username="worker.username" v-bind:email="worker.email" v-bind:id="worker.id"></worker-entry>
    </table>
    <h3>Add Worker</h3>
    <form class="fullPageForm" @submit.prevent="handleAddWorker">
      <table border="0px">
        <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.id" />
      </table>
      <p>
        <input type="submit" value="Add" />
      </p>
    </form>
  </div>
</template>

<script>
import Components from '@/components/UIComponents'
import Vue from 'vue'

export default {
  name: 'LoginPage',
  data () {
    return {
      roster: [
        {
          id: 3,
          username: 'DanSmith',
          email: 'dsmith@gmail.com'
        },
        {
          id: 6,
          username: 'JohnQuincyAdams',
          email: 'jqadams@gmail.com'
        }
      ],
      formElements: [
        {
          id: 0,
          type: 'text',
          name: 'username',
          caption: 'Username'
        }
      ]
    }
  },
  methods: {
    handleAddWorker () {
      // TODO: submit this to the appropriate API endpoint, and if the user doesn't exist or isn't a maintenance worker, return an error
      var username = Components.collapse(this.formElements, []).username
      console.log('Adding: ' + username)
    }
  },
  components: {
    Components
  },
  mounted () {
    document.title = 'Manage Roster'
    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1 || this.$session.get('userRole') !== 'landlord') {
      this.$router.push('/')
    }
  }
}

Vue.component('worker-entry', {
  props: ['id', 'username', 'email'],
  template: '<tr>' +
  '<td>{{ username }}</td>' +
  '<td>{{ email }}</td>' +
  '<td><button v-on:click.stop="removeTenant(id)">Remove</button></td>' +
  '</tr>',
  methods: {
    removeTenant (id) {
      // TODO: make this actually remove the tenant
      console.log('Removing: ' + id)
    }
  }
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
</style>
