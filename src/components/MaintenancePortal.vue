<template>
  <div class="hello" id="landlordPortal">
    <h2>Maintenance Portal</h2>

    <div class="left">
        <h3>Notifications</h3>
        <notification-entry v-for="n in notifications" v-bind:title="n.title" v-bind:contents="n.contents" v-bind:key="n.id"></notification-entry>
        <p style="text-align: center">
          <a href="#">See more...</a>
        </p>
    </div>
    <div class="right">
        <h3>Options</h3>
        <ul class="optionlist">
          <!-- TODO: fill these with appropriate URLs and fill out address and whatever as appropriate -->
          <li class="first"><a href="#/">Active Requests</a></li>
          <li><a href="#/">Request History</a></li>
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
      ]
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
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

</style>
