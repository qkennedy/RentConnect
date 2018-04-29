<template>
  <div class="hello" id="maintenancePortal">
    <h2>Maintenance Portal</h2>
    <div class="col-sm-8 col-md-8 col-lg-8 notifications">
      <h3>Notifications</h3>
      <notification-entry v-for="n in notifications" v-bind:notif="n" v-bind:key="n.id"></notification-entry>
      <p v-if="notifications.length === 0">
        You have no notifications at this time.
      </p>
      <p style="text-align: center">
        <router-link to="AllMaintenanceRequests">See more...</router-link>
      </p>
    </div>
    <div class="col-sm-4 col-md-4 col-lg-4 options">
        <h3>Options</h3>
        <ul class="list-group">
          <li class="list-group-item"><router-link to="AllMaintenanceRequests">My Requests</router-link></li>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NotificationComponents from '@/components/NotificationComponents'

export default {
  name: 'TenantPortal',
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
    document.title = 'Maintenance Portal'
    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1 || this.$session.get('userRole') !== 'maintenanceWorker') {
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

document.title = 'Maintenance Portal'
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
