<template>
  <div class="hello" id="landlordPortal">
    <div class="left">
      <h2>Landlord Portal</h2>
      <h3>Notifications</h3>
      <notification-entry v-for="n in notifications" v-bind:title="n.title" v-bind:contents="n.contents" v-bind:key="n.id"></notification-entry>
    </div>
    <div class="right">
        <h3>Options</h3>
        <ul class="optionlist">
          <li class="first"><router-link to="BulkNotification">Notify tenants</router-link></li>
          <li><router-link to="MyProperties">My properties</router-link></li>
          <li><router-link to="Finances">View finances</router-link></li>
          <li><router-link to="AllMaintenanceRequests">Maintenance requests</router-link><br />{{ unreadMaint }} unread</li>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Components from '@/components/UIComponents'

export default {
  name: 'LandlordPortal',
  data () {
    return {
      notifications: [
        // TODO: replace this with a way to get these from the backend
        {
          id: 0,
          title: 'New maintenance request',
          contents: 'Alex submitted a maintenance request'
        },
        {
          id: 1,
          title: 'New application',
          contents: 'Andrea submitted an application to view a property.'
        }
      ],
      unreadMaint: 11
    }
  },
  components: {
    Components
  },
  mounted () {
    document.title = 'Landlord Portal'
    axios.get('/rest/whoAmI')
      .then(response => {
        console.log(JSON.stringify(response.data))
        if (response.data.id > 0) {
          if (response.data.role !== 'landlord') {
            // we're not a landlord, get out of here
            this.$router.push('/')
          }
          // TODO: get information about the landlord and put it in the form
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
