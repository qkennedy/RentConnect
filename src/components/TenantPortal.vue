<template>
  <div class="hello" id="tenantPortal">
    <div class="left">
      <h2>Tenant Portal</h2>
      <h3 v-if="assigned">Notifications</h3>
      <notification-entry v-if="assigned" v-for="n in notifications" v-bind:title="n.subject" v-bind:contents="n.message" v-bind:key="n.id"></notification-entry>
      <div v-if="!assigned">
        You are not currently assigned to any apartment.
      </div>
    </div>
    <div class="right">
        <h3>Options</h3>
        <ul class="optionlist">
          <li class="first" v-if="assigned"><b>Contact landlord:</b><br />
            Phone: <i v-if="landlordPhone===''">(not given)</i><span v-else>{{ landlordPhone }}</span><br />
            Email: {{ landlordEmail }}
          </li>
          <li v-if="assigned"><b>My apartment:</b><br />Address: {{ address }}<br />Rent due: ${{ rentAmt }}, {{ rentDue }}</li>
          <li v-if="assigned"><router-link to="Finances">View Finances</router-link></li>
          <li v-if="assigned"><router-link to="SubmitMaintenanceRequest">Submit Maintenance Request</router-link></li>
          <li v-if="assigned"><router-link to="ManageDocuments">Manage Documents</router-link></li>
          <li v-if="assigned"><router-link to="AllMaintenanceRequests">Maintenance Requests</router-link></li>
          <li v-if="!assigned" class="first">
            No options available.
          </li>
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
      ],
      landlordPhone: '',
      landlordEmail: '',
      rentAmt: '',
      rentDue: '',
      address: '',
      assigned: false
    }
  },
  components: {
    Components
  },
  mounted () {
    document.title = 'Tenant Portal'
    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1 || this.$session.get('userRole') !== 'tenant') {
      // not logged in or not a tenant, get out of here
      this.$router.push('/')
    }
    axios.get('/rest/user/' + this.$session.get('userId') + '/' + this.$session.get('authToken'))
      .then(response => {
        if (response.data.property_id === null) {
          // not assigned to a property
          this.assigned = false
        } else {
          // assigned to a property
          axios.get('/rest/property/' + response.data.property_id)
            .then(response => {
              this.assigned = true
              this.address = response.data.address
              this.rentAmt = response.data.rent
              this.landlordPhone = response.data.cell_number
              this.landlordEmail = response.data.email
              var rentDueDate = new Date()
              rentDueDate.setDate(response.data.due_date)
              if (rentDueDate < new Date()) {
                rentDueDate.setMonth(rentDueDate.getMonth() + 1)
              }
              this.rentDue = rentDueDate.toLocaleDateString()
            })
            .catch(e => {
              console.log(e)
            })
        }
      })
      .catch(e => {
        console.log(e)
      })
    axios.get('/rest/user/' + this.$session.get('userId') + '/notifications')
      .then(response => {
        this.notifications = response.data
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
