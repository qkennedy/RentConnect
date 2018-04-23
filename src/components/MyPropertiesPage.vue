<template>
  <div id="myPropertiesPage">
    <h2>My Properties</h2>
    <p>
      <router-link to="CreateListing">List New Property</router-link>
    </p>
    <table border="0" class="table" id="propsTable">
      <thead>
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
      </thead>
      <tbody>
        <property-entry v-for="prop in properties" v-bind:key="prop.id" v-bind:address="prop.address" v-bind:status="prop.status" v-bind:tenant="prop.tenant" v-bind:rentamt="prop.rent" v-bind:rentdue="prop.due_date" v-bind:id="prop.id"></property-entry>
      </tbody>
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
      properties: []
    }
  },
  components: {
    Components
  },
  mounted () {
    document.title = 'My Properties'
    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1 || this.$session.get('userRole') !== 'landlord') {
      this.$router.push('/')
    }
    axios.get('/rest/property/landlord/' + this.$session.get('userId'))
      .then(response => {
        console.log(JSON.stringify(response.data))
        this.properties = response.data
      })
      .catch(e => {
        console.log(e)
      })
  }
}

Vue.component('property-entry', {
  props: ['id', 'address', 'status', 'tenant', 'rentamt', 'rentdue'],
  template: '<tr><td>{{ address }}</td><td v-if="tenant === null">Unoccupied</td><td v-if="tenant !== null">Occupied</td><td v-if="tenant !== null">{{ tenant }}</td><td v-if="tenant === null"><i>No tenant</i></td><td>$ {{ rentamt }}<br />Due {{ rentdue }} of each month</td><td><router-link v-bind:to="\'/Finances/\' + id">Finances</router-link><br /><router-link v-bind:to="\'/ManageDocuments/\' + id">Documents</router-link><br /><router-link v-bind:to="\'/EditListing/\' + id">Edit Listing</router-link></td></tr>'
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
#propsTable {
  text-align:left
}
</style>
