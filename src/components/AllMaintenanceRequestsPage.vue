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
      <maint-row v-for="req in maintRequests" v-bind:key="req.id" v-bind:property="req.property" v-bind:status="req.status" v-bind:lastUpdated="req.lastUpdated" v-bind:id="req.id"></maint-row>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import Components from '@/components/UIComponents'

export default {
  name: 'AllMaintenanceRequests',
  data () {
    return {
      // TODO: populate this with the values from the maintenance request
      maintRequests: [
        {
          id: 0,
          property: '1234 Sesame Street',
          status: 'unassigned',
          lastUpdated: 'March 1, 2017'
        },
        {
          id: 1,
          property: '1234 Sesame Street',
          status: 'assigned',
          lastUpdated: 'April 1, 2018'
        },
        {
          id: 2,
          property: '1234 Sesame Street',
          status: 'closed',
          lastUpdated: 'July 4, 1776'
        }
      ],
      role: 'tenant',
      address: '1234 Sesame Street',
      tenant: 'Amy Adams'
    }
  },
  components: {
    Components
  }
}

Vue.component('maint-row', {
  // TODO: make "view" link to the specific page based on the id
  props: ['property', 'status', 'lastUpdated', 'id'],
  template: '<tr><td>{{ property }}</td><td v-if="status===\'unassigned\'" style="font-weight:bold; color:#900">Unassigned</td><td v-if="status===\'assigned\'" style="color:#060">Assigned</td><td v-if="status===\'closed\'">Closed</td><td>{{ lastUpdated }}</td><td><router-link v-bind:to="\'/ViewMaintenanceRequest/\' + id">View</router-link></td></tr>'
})

document.title = 'Maintenance Requests'
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
