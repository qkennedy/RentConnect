<template>
  <div id="myPropertiesPage">
    <h2>Available Properties</h2>
    <table v-if="properties.length > 0" border="0" class="table" id="propsTable">
      <thead>
        <tr>
          <th>
            Address
          </th>
          <th>
            Rent
          </th>
          <th>
            Application
          </th>
        </tr>
      </thead>
      <tbody>
        <property-apply-entry v-for="prop in properties" v-bind:key="prop.id" v-bind:address="prop.address" v-bind:rentamt="prop.rent" v-bind:rentdue="prop.due_date" v-bind:id="prop.id"></property-apply-entry>
      </tbody>
    </table>
    <p v-if="properties.length === 0">
      There are no available properties at this time.
    </p>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Components from '@/components/UIComponents'

export default {
  name: 'ViewAvailableListings',
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
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1) {
      this.$router.push('/')
    }
    axios.get('/rest/property/getAvailableProperties')
      .then(response => {
        console.log(JSON.stringify(response.data))
        this.properties = response.data
      })
      .catch(e => {
        console.log(e)
      })
  }
}

Vue.component('property-apply-entry', {
  props: ['id', 'address', 'rentamt', 'rentdue'],
  template:
  `<tr>
    <td>{{ address }}</td>
    <td>$ {{ rentamt }}<br />Due {{ rentdue }} of each month</td>
    <td>
      <router-link v-bind:to="'/Apply/' + id">Apply</router-link>
    </td>
  </tr>`
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
