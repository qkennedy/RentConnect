<template>
  <div class="hello" id="landlordPortal">
    <div class="left">
      <h2>Landlord Portal</h2>
      <h3>Notifications</h3>
      <notification-entry v-for="n in notifications" v-bind:title="n.subject" v-bind:contents="n.message" v-bind:key="n.id"></notification-entry>
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
      ],
      unreadMaint: 11 // TODO: get this from the backend
    }
  },
  components: {
    Components
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
