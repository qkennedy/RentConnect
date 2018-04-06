<template>
  <div id="myPropertiesPage">
    <h2>My Properties</h2>
    <table border="0" class="standardTable">
      <tr>
        <th>
          Address
        </th>
        <th>
          Status
        </th>
        <th>
          Tenant
        </th>
        <th>
          Rent
        </th>
        <th>
          Actions
        </th>
      </tr>
      <property-entry v-for="prop in properties" v-bind:key="prop.id" v-bind:address="prop.address" v-bind:status="prop.status" v-bind:tenant="prop.tenant" v-bind:rentamt="prop.rentamt" v-bind:rentdue="prop.rentdue" v-bind:id="prop.id"></property-entry>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import Components from '@/components/UIComponents'

document.title = 'MyProperties'

export default {
  name: 'MyPropertiesPage',
  data () {
    return {
      // TODO: populate this from the database
      properties: [
        {
          id: 0,
          address: '1234 Sesame Street',
          status: 'Rented',
          tenant: 'John Adams',
          rentamt: '$1000.00',
          rentdue: 'March 31, 2018'
        }
      ]
    }
  },
  components: {
    Components
  }
}

Vue.component('property-entry', {
  // TODO: make the finances, documents, edit listing link go to the right place (i.e. include the ID)
  props: ['id', 'address', 'status', 'tenant', 'rentamt', 'rentdue'],
  template: '<tr><td>{{ address }}</td><td>{{ status }}</td><td>{{ tenant }}</td><td>{{ rentamt }}, due {{ rentdue }}</td><td><router-link v-bind:to="\'/Finances/\' + id">Finances</router-link><br /><router-link v-bind:to="\'/ManageDocuments/\' + id">Documents</router-link><br /><router-link v-bind:to="\'/EditListing/\' + id">Edit Listing</router-link></td></tr>'
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
