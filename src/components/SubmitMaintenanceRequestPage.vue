<template>
  <div id="loginForm">
    <h2>Submit Maintenance Request</h2>
    <form class=".form-horizontal auth-form" id="loginForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name"
        v-bind:key="element.id" v-bind:optional="element.optional" divclass="form-group" labelclass="control-label auth-label" inputclass="form-control" />
      <p><input class="btn btn-primary" type="submit" value="Submit" /></p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Components from '@/components/UIComponents'

export default {
  name: 'LoginPage',
  data () {
    return {
      formElements: [
        {
          id: 0,
          type: 'text',
          name: 'title',
          caption: 'Title'
        },
        {
          id: 1,
          type: 'textarea',
          name: 'description',
          caption: 'Description'
        },
        {
          id: 2,
          type: 'file',
          name: 'image',
          caption: 'Image to attach',
          optional: true
        }
      ],
      propertyId: 1,
      myId: 0
    }
  },
  methods: {
    handleSubmit () {
      var formFields = Components.collapse(this.formElements, [])
      formFields.creatorId = this.myId
      axios.post('/rest/property/' + this.propertyId + '/request/create',
        formFields
      )
        .then(response => {
          console.log(JSON.stringify(response.data))
          var respId = response.data.id
          this.$router.push('/ViewMaintenanceRequest/' + respId)
        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  components: {
    Components
  },
  mounted () {
    document.title = 'Submit Maintenance Request'
    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1 || this.$session.get('userRole') !== 'tenant') {
      this.$router.push('/')
    }
    this.myId = this.$session.get('userId')
    axios.get('/rest/user/' + this.myId + '/' + this.$session.get('authToken'))
      .then(response => {
        if (response.data.property_id === null) {
          // we haven't been assigned a property
          this.$router.push('/')
        }
        this.propertyId = response.data.property_id
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
