<template>
  <div id="loginForm">
    <h2>Submit Maintenance Request</h2>
    <form class="fullPageForm" id="loginForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.id" v-bind:optional="element.optional" />
      </table>
      <p><input type="submit" value="Submit" /></p>
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
      formFields.propertyId = this.propertyId
      formFields.creatorId = this.creatorId
      axios.post('/rest/request/createrequest/',
        formFields
      )
        .then(response => {
          // TODO: redirect to page to show this maintenance Request
          var respId = 1
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
    axios.get('/rest/whoAmI')
      .then(response => {
        if (response.data.id === -1) {
          // we aren't logged in
          this.$router.push('/')
        }
        this.myId = response.data.id
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
</style>
