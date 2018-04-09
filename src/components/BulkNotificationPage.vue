<template>
  <div id="notificationPage">
    <h2>Send Bulk Notification</h2>
    <form class="fullPageForm" id="notificationForm" method="post" enctype="multipart/form-data">
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.id" />
        <tenant-checkbox-row v-for="tenant in tenants" v-bind:key="tenant.id" v-bind:name="tenant.name"></tenant-checkbox-row>
      </table>
      <p><input type="submit" value="Send" /></p>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import Components from '@/components/UIComponents'

document.title = 'Send Bulk Notification'

export default {
  name: 'BulkNotificationPage',
  data () {
    return {
      formElements: [
        {
          id: 0,
          type: 'text',
          name: 'subject',
          caption: 'Subject'
        },
        {
          id: 1,
          type: 'textarea',
          name: 'body',
          caption: 'Body'
        }
      ],
      tenants: [
        {
          id: 0,
          name: 'John F. Kennedy'
        },
        {
          id: 1,
          name: 'Abraham Lincoln'
        },
        {
          id: 2,
          name: 'Franklin D. Roosevelt'
        }
      ]
    }
  },
  components: {
    Components
  }
}

Vue.component('tenant-checkbox-row', {
  props: ['name'],
  template: '<tr><td class="leftColumn">{{ name }}</td><td class="rightColumn"><input type="checkbox" checked="checked" /></td></tr>'
})
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
