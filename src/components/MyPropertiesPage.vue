<template>
  <div id="myPropertiesPage">
    <h2>My Properties</h2>
    <p>
      <router-link to="CreateListing">List New Property</router-link>
    </p>
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
      <property-entry v-for="prop in properties" v-bind:key="prop.id" v-bind:address="prop.address" v-bind:status="prop.status" v-bind:tenant="prop.tenant" v-bind:rentamt="prop.rent" v-bind:rentdue="prop.rentdue" v-bind:id="prop.id"></property-entry>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Components from '@/components/UIComponents'

export default {
  name: 'MyPropertiesPage',
  data () {
    return {
      // TODO: populate this from the database
      properties: []
    }
  },
  components: {
    Components
  },
  mounted () {
    document.title = 'My Properties'
    axios.get('/rest/whoAmI')
      .then(response => {
        var userId = response.data.id
        if (response.data.role !== 'landlord') {
          this.$router.push('/')
        }
        axios.get('/rest/propertiesByLandlord/' + userId)
          .then(response => {
            console.log(response.data)
            this.properties = response.data
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

Vue.component('property-entry', {
  // TODO: make the finances, documents, edit listing link go to the right place (i.e. include the ID)
  props: ['id', 'address', 'status', 'tenant', 'rentamt', 'rentdue'],
  template: '<tr><td>{{ address }}</td><td v-if="tenant === null">Unoccupied</td><td v-if="tenant !== null">Occupied</td><td v-if="tenant !== null">{{ tenant }}</td><td v-if="tenant === null"><i>No tenant</i></td><td>$ {{ rentamt }}, due {{ rentdue }}</td><td><router-link v-bind:to="\'/Finances/\' + id">Finances</router-link><br /><router-link v-bind:to="\'/ManageDocuments/\' + id">Documents</router-link><br /><router-link v-bind:to="\'/EditListing/\' + id">Edit Listing</router-link></td></tr>'
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
