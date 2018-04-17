<template>
  <div class="hello" id="tenantPortal">
    <div class="left">
      <h2>Tenant Portal</h2>
      <h3>Notifications</h3>
      <notification-entry v-for="n in notifications" v-bind:title="n.title" v-bind:contents="n.contents" v-bind:key="n.id"></notification-entry>
    </div>
    <div class="right">
        <h3>Options</h3>
        <ul class="optionlist">
          <li class="first"><b>Contact landlord:</b><br />
            Phone: <i v-if="landlordPhone===''">(not given)</i><span v-else>{{ landlordPhone }}</span><br />
            Email: {{ landlordEmail }}
          </li>
          <li><b>My apartment:</b><br />Address: {{ address }}<br />Rent due: ${{ rentAmt }}, {{ rentDue }}</li>
          <li><router-link to="Finances">View Finances</router-link></li>
          <li><router-link to="SubmitMaintenanceRequest">Submit Maintenance Request</router-link></li>
          <li><router-link to="ManageDocuments">Manage Documents</router-link></li>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Components from '@/components/UIComponents'

export default {
  name: 'TenantPortal',
  data () {
    return {
      notifications: [
        // TODO: replace this with a way to get these from the backend
        {
          id: 0,
          title: 'Rent due',
          contents: 'Your rent is due'
        },
        {
          id: 1,
          address: '1234 Sesame Street',
          title: 'Maintenance request comment',
          contents: 'Your maintenance request has received a new comment: <br /><i>I fixed it.</i>'
        }
      ],
      landlordPhone: '',
      landlordEmail: '',
      rentAmt: '',
      rentDue: 'March 31, 2018',
      address: ''
    }
  },
  components: {
    Components
  },
  mounted () {
    document.title = 'Tenant Portal'
    axios.get('/rest/whoAmI')
      .then(response => {
        if (response.data.id > 0) {
          if (response.data.role !== 'tenant') {
            // we're not a tenant, get out of here
            this.$router.push('/')
          }
          axios.get('/rest/property/' + response.data.property_id)
            .then(response => {
              this.address = response.data.address
              this.rentAmt = response.data.rent
              this.landlordPhone = response.data.cell_number
              this.landlordEmail = response.data.email
              // TODO: populate landlord info
            })
            .catch(e => {
              console.log(e)
            })
        } else {
          // not logged in, get out of here
          this.$router.push('/')
        }
      })
      .catch(e => {
        console.log(e)
      })
  }
}
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
a {
  color: #42b983;
}
</style>
