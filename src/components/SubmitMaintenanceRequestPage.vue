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

document.title = 'Submit Maintenance Request'

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
      // TODO: submit the maintenance request
      axios.post('/rest/request/createrequest',
        Components.collapse(this.formElements, [])
      )
        .then(response => {
          // TODO: redirect to page to show this maintenance Request
          this.$router.push('/ViewMaintenanceRequest/' + response.request.id)
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
    axios.get('/rest/whoAmI')
      .then(response => {
        this.myId = response.data.id
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
