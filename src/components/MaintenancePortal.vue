<template>
  <div class="hello" id="maintenancePortal">
    <div class="left">
      <h2>Maintenance Portal</h2>
      <h3>Notifications</h3>
      <notification-entry v-for="n in notifications" v-bind:title="n.title" v-bind:contents="n.contents" v-bind:key="n.id"></notification-entry>
      <p style="text-align: center">
        <router-link to="AllMaintenanceRequests">See more...</router-link>
      </p>
    </div>
    <div class="right">
        <h3>Options</h3>
        <ul class="optionlist">
          <li class="first"><router-link to="AllMaintenanceRequests">My Requests</router-link><br />{{ unread }} unread</li>
        </ul>
    </div>
  </div>
</template>

<script>
import Components from '@/components/UIComponents'

export default {
  name: 'TenantPortal',
  data () {
    return {
      notifications: [
        // TODO: replace this with a way to get these from the backend
        {
          id: 0,
          title: 'Maintenance request from Bob',
          contents: 'My window broke!'
        },
        {
          id: 1,
          title: 'Maintenance request closed',
          contents: 'Andrea submitted an application to view a property.'
        }
      ],
      unread: 35
    }
  },
  components: {
    Components
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
