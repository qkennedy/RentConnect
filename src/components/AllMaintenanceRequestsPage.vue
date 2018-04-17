<template>
  <div class="hello" id="maintRequests">
    <h2>Maintenance Requests</h2>
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
      myId: 0
    }
  },
  components: {
    Components
  },
  mounted () {
    document.title = 'Maintenance Requests'

    axios.get('/rest/whoAmI')
      .then(response => {
        // TODO: make this pull all requests associated with a user (such as all requests for the tenant's property, all requests assigned to a maintenance worker, and all requests for properties a landlord owns)
        this.myId = response.data.id
        axios.get('/rest/request/byLandlordId/' + this.myId)
          .then(response => {
            console.log(JSON.stringify(response))
            this.maintRequests = response.data
          })
          .catch(e => {
            console.log(e)
          })
      })
      .catch(e => {
        console.log(e)
      })
  }
}

Vue.component('maint-row', {
  // TODO: synchronize the statuses with the backend
  props: ['property', 'status', 'lastUpdated', 'id'],
  template: '<tr><td>{{ property }}</td><td v-if="status===\'open\'" style="font-weight:bold; color:#900">Unassigned</td><td v-if="status===\'assigned\'" style="color:#060">Assigned</td><td v-if="status===\'closed\'">Closed</td><td>{{ lastUpdated }}</td><td><router-link v-bind:to="\'/ViewMaintenanceRequest/\' + id">View</router-link></td></tr>'
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
