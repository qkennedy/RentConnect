<template>
  <div class="portal" id="landlordPortal">
    <h2>Landlord Portal</h2>
    <div class="col-sm-8 col-md-8 col-lg-8 notifications">
      <h3>Notifications</h3>
      <notification-entry v-for="n in notifications" v-bind:notif="n" v-bind:key="n.id"></notification-entry>
      <p v-if="notifications.length === 0">
        You have no notifications at this time.
      </p>
    </div>
    <div class="col-sm-4 col-md-4 col-lg-4 options">
        <h3>Options</h3>
        <ul class="list-group">
          <li class="list-group-item"><router-link to="BulkNotification">Notify tenants</router-link></li>
          <li class="list-group-item"><router-link to="MyProperties">My properties</router-link></li>
          <li class="list-group-item"><router-link to="AllMaintenanceRequests">Maintenance requests</router-link></li>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NotificationComponents from '@/components/NotificationComponents'

export default {
  name: 'LandlordPortal',
  data () {
    return {
      notifications: [
      ]
    }
  },
  components: {
    NotificationComponents
  },
  mounted () {
    document.title = 'Landlord Portal'
    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1 || this.$session.get('userRole') !== 'landlord') {
      this.$router.push('/')
    }
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
