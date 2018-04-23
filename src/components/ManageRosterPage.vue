<template>
  <div id="loginForm">
    <h2>Manage Maintenance Roster</h2>
    <table class="table" id="workerTable">
      <thead>
        <tr>
          <th>
            Username
          </th>
          <th>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <worker-entry v-for="worker in roster" v-bind:key="worker.id" v-bind:username="worker.username" v-bind:id="worker.id" v-bind:landlordId="myId"></worker-entry>
      </tbody>
    </table>
    <h3>Add Worker</h3>
    <form class=".form-horizontal auth-form" @submit.prevent="handleAddWorker" @click.capture="resetWarning">
      <div class="alert alert-danger" style="display:none" role="alert" ref="warning">

      </div>
      <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.id"
        divclass="form-group" labelclass="control-label auth-label" inputclass="form-control" />
      <p>
        <input class="btn btn-primary" type="submit" value="Add" />
      </p>
    </form>
  </div>
</template>

<script>
import Components from '@/components/UIComponents'
import Vue from 'vue'
import axios from 'axios'

export default {
  name: 'LoginPage',
  data () {
    return {
      roster: [
      ],
      formElements: [
        {
          id: 0,
          type: 'text',
          name: 'username',
          caption: 'Username'
        }
      ],
      myId: 0
    }
  },
  methods: {
    handleAddWorker () {
      var formFields = Components.collapse(this.formElements, [])
      formFields.landlordId = this.myId
      axios.post('/rest/user/addToRoster', formFields)
        .then(response => {
          this.reloadWorkers()
        })
        .catch(e => {
          if (typeof e.response !== 'undefined' && e.response.status === 400) {
            this.$refs.warning.innerHTML = 'User does not exist or is not a maintenance worker. Please check your spelling.'
            this.$refs.warning.style.display = 'block'
          } else {
            console.log(e)
          }
        })
    },
    resetWarning () {
      this.$refs.warning.style.display = 'none'
    },
    reloadWorkers () {
      axios.get('/rest/user/getRoster/' + this.myId)
        .then(response => {
          this.roster = response.data
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
    document.title = 'Manage Roster'
    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1 || this.$session.get('userRole') !== 'landlord') {
      this.$router.push('/')
    }
    this.myId = this.$session.get('userId')
    this.reloadWorkers()
    this.$eventHub.$on('reload-workers', this.reloadWorkers)
  }
}

Vue.component('worker-entry', {
  props: ['id', 'username', 'landlordId'],
  template: '<tr>' +
  '<td>{{ username }}</td>' +
  '<td><button v-on:click.stop="removeTenant(id, landlordId)">Remove</button></td>' +
  '</tr>',
  methods: {
    removeTenant (id, landlordId) {
      axios.post('/rest/user/removeFromRoster', {
        landlordId: landlordId,
        workerId: id
      })
        .then(response => {
          this.$eventHub.$emit('reload-workers')
        })
        .catch(e => {
          console.log(e)
        })
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
.auth-form {
    width: 340px;
    margin: 0 auto;
}
.form-group {
  text-align: left;
}
#workerTable {
  text-align:left
}
</style>
