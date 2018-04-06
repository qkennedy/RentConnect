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
          <!-- TODO: fill these with appropriate URLs and fill out address and whatever as appropriate -->
          <li class="first"><a href="#/BulkNotification">Notify tenants</a></li>
          <li><router-link to="MyProperties">My properties</router-link><property-li-info address="1234 Sesame Street" rentamt="$960.00" rentdate="March 31" late="true"></property-li-info><router-link to="MyProperties">View All</router-link></li>
          <li><router-link to="Finances">View finances</router-link></li>
          <li><router-link to="AllMaintenanceRequests">Maintenance requests</router-link><br />{{ unreadMaint }} unread</li>
        </ul>
    </div>
  </div>
</template>

<script>
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
