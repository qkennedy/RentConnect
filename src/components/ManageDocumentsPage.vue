<template>
  <div class="hello" id="manageDocumentsPage">
    <h2>Manage Documents</h2>
    <h3>Property Information</h3>
    <table border="0">
      <tr>
        <th>
          Address
        </th>
        <td>
          {{ address }}
        </td>
      </tr>
    </table>
    <h3>Documents</h3>
    <table border="0" class="standardTable">
      <tr>
        <th>
          Document Title
        </th>
        <th>
          Last Updated
        </th>
      </tr>
      <document-table-row v-for="document in documents" v-bind:key="document.id" v-bind:title="document.title" v-bind:link="document.link" v-bind:lastUpdated="document.lastUpdated"></document-table-row>
    </table>
    <h3>Upload New Document</h3>
    <form class="fullPageForm" @submit.prevent="handleSubmit">
      <table border="0px">
        <form-input v-for="element in formElements" v-bind:key="element.id" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:type="element.type"></form-input>
      </table>
      <p>
        <input type="submit" value="Upload" />
      </p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Components from '@/components/UIComponents'

export default {
  name: 'ManageDocumentsPage',
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
          type: 'file',
          name: 'doc',
          caption: 'File'
        }
      ],
      documents: [
      ],
      address: ''
    }
  },
  methods: {
    handleSubmit () {
      var propId = this.$route.params.id
      console.log(JSON.stringify(Components.collapse(this.formElements, [])))
      axios.post('/rest/property/' + propId + '/createdocument/',
        Components.collapse(this.formElements, [])
      )
        .then(response => {
          this.updateDocs()
        })
        .catch(e => {
          console.log(e)
        })
    },
    updateDocs () {
      // TODO: get the documents
      /*
      var propId = 1
      axios.get('/rest/documents/' + propId)
        .then(response => {
          console.log(JSON.stringify(response.data))
          this.documents = response.data.documents
        })
        .catch(e => {
          console.log(e)
        })
        */
    }
  },
  components: {
    Components
  },
  mounted () {
    document.title = 'Manage Documents'
    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1 || (this.$session.get('userRole') !== 'landlord' && this.$session.get('userRole') !== 'tenant')) {
      this.$router.push('/')
    }
    axios.get('/rest/property/' + this.$route.params.id)
      .then(response => {
        this.address = response.data.address
        this.updateDocs()
      })
      .catch(e => {
        console.log(e)
      })
  }
}

Vue.component('document-table-row', {
  props: ['title', 'link', 'lastUpdated'],
  template: '<tr><td class="leftColumn"><router-link v-bind:to="link">{{ title }}</a></td><td class="rightColumn">{{ lastUpdated }}</td></tr>'
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
a {
  color: #42b983;
}
</style>
