<template>
  <div id="notificationPage">
    <h2>Send Bulk Notification</h2>
    <form class=".form-horizontal auth-form" id="notificationForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name"
        v-bind:key="element.id" divclass="form-group" labelclass="control-label auth-label" inputclass="form-control" />
      <div class="form-group">
        <label class="control-label auth-label">Tenants</label>
        <property-checkbox-row v-for="prop in properties" v-bind:key="prop.id" v-bind:address="prop.address" v-bind:id="prop.id"></property-checkbox-row>
      </div>
      <p><input class="btn btn-primary" type="submit" value="Send" /></p>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import Components from '@/components/UIComponents'
import axios from 'axios'

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
      properties: [
      ],
      myId: 0
    }
  },
  components: {
    Components
  },
  methods: {
    handleSubmit () {
      var i
      for (i = 0; i < this.properties.length; i++) {
        var formFields = Components.collapse(this.formElements, [])
        var propIds = []
        if (document.getElementsByName('properties[' + this.properties[i].id + ']')[0].checked) {
          propIds.push(this.properties[i].id)
        }
        formFields.propIds = propIds
        formFields.landlordId = this.myId
        axios.post('/rest/notifications/send', formFields)
          .then(response => {
            this.$router.push('/LandlordPortal')
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  },
  mounted () {
    document.title = 'Send Bulk Notification'

    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1 || this.$session.get('userRole') !== 'landlord') {
      this.$router.push('/')
    }
    this.myId = this.$session.get('userId')
    axios.get('/rest/property/landlord/' + this.$session.get('userId'))
      .then(response => {
        console.log(JSON.stringify(response.data))
        this.properties = response.data
      })
      .catch(e => {
        console.log(e)
      })
  }
}

Vue.component('property-checkbox-row', {
  props: ['id', 'address'],
  template: `<div><input type="checkbox" checked="checked" v-bind:name="'properties[' + id + ']'" v-bind:id="'prop' + id"/> <label v-bind:for="'prop' + id">{{address}}</label></div>`
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
.auth-form {
    width: 340px;
    margin: 0 auto;
}
.form-group {
  text-align: left;
}
</style>
