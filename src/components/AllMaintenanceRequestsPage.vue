<template>
  <div class="hello" id="maintRequests">
    <h2>Maintenance Requests</h2>
    <p v-if="landlord" style="text-align:center">
      <router-link to="/ManageRoster">Manage Workers</router-link>
    </p>
    <table border="0px" style="width:100%">
      <tr>
        <th style="width:25%">
          Property
        </th>
        <th style="width:25%">
          Status
        </th>
        <th style="width:25%">
          Last Updated
        </th>
        <th style="width:25%">
          Actions
        </th>
      </tr>
      <maint-row v-for="req in maintRequests" v-bind:key="req.id" v-bind:property="req.address" v-bind:status="req.status" v-bind:lastUpdated="req.lastUpdated" v-bind:id="req.id"></maint-row>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Components from '@/components/UIComponents'

export default {
  name: 'AllMaintenanceRequests',
  data () {
    return {
      maintRequests: [
      ],
      myId: 0,
      landlord: false
    }
  },
  components: {
    Components
  },
  mounted () {
    document.title = 'Maintenance Requests'

    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1) {
      // not logged in, shouldn't be on this page
      this.$router.push('/')
    }
    // TODO: make this pull all requests associated with a user (such as all requests for the tenant's property, all requests assigned to a maintenance worker, and all requests for properties a landlord owns)
    this.myId = this.$session.get('userId')
    if (this.$session.get('userRole') === 'landlord') {
      this.landlord = true
    }
    axios.get('/rest/request/byLandlordId/' + this.myId)
      .then(response => {
        console.log(JSON.stringify(response))
        this.maintRequests = response.data
      })
      .catch(e => {
        console.log(e)
      })
  }
}

Vue.component('maint-row', {
  props: ['property', 'status', 'lastUpdated', 'id'],
  template: '<tr><td>{{ property }}</td><td v-if="status===\'open\'" style="font-weight:bold;">Open</td><td v-if="status===\'confirmed\'" style="font-weight: bold; color:#060">Confirmed</td><td v-if="status===\'closed\'">Closed</td><td v-if="status===\'pending\'" style="font-weight: bold; color:#900">Pending</td><td>{{ lastUpdated }}</td><td><router-link v-bind:to="\'/ViewMaintenanceRequest/\' + id">View</router-link></td></tr>'
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
