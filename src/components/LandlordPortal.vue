<template>
  <div class="hello" id="landlordPortal">
    <h2>Landlord Portal</h2>

    <div class="left">
        <h3>Notifications</h3>
        <notification-entry v-for="n in notifications" v-bind:title="n.title" v-bind:contents="n.contents" v-bind:key="n.id"></notification-entry>
    </div>
    <div class="right">
        <h3>Options</h3>
        <ul class="optionlist">
          <!-- TODO: fill these with appropriate URLs and fill out address and whatever as appropriate -->
          <li class="first"><a href="#/BulkNotification">Notify tenants</a></li>
          <li><a href="#/">My properties</a><property-li-info address="1234 Sesame Street" rentamt="$960.00" rentdate="March 31" late="true"></property-li-info><a href="#/">View all</a></li>
          <li><a href="#/">View finances</a></li>
          <li><a href="#/">Maintenance requests</a><br />55 unread</li>
          <li><router-link to="ManageDocuments">Documents</router-link></li>
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
      ]
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
