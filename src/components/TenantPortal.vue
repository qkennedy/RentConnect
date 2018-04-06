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
          <!-- TODO: fill these with appropriate URLs and fill out address and whatever as appropriate -->
          <li class="first"><b>Contact landlord:</b><br />
            Phone: <i v-if="landlordPhone===''">(not given)</i><span v-else>{{ landlordPhone }}</span><br />
            Email: {{ landlordEmail }}
          </li>
          <li><b>My apartment:</b><br />Address: 1234 Sesame Street<br />Rent due: $1000.00, March 31</li>
          <li><router-link to="Finances">View Finances</router-link></li>
          <li><router-link to="SubmitMaintenanceRequest">Maintenance requests</router-link></li>
          <li><router-link to="ManageDocuments">Manage Documents</router-link></li>
        </ul>
    </div>
  </div>
</template>

<script>
import Components from '@/components/UIComponents'

document.title = 'Tenant portal'

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
          title: 'Maintenance request comment',
          contents: 'Your maintenance request has received a new comment: <br /><i>I fixed it.</i>'
        }
      ],
      landlordPhone: '1-222-333-4444',
      landlordEmail: 'barbara.snyder@case.edu'
    }
  },
  components: {
    Components
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
