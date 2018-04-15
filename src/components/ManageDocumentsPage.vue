<template>
  <div class="hello" id="manageDocumentsPage">
    <h2>Manage Documents</h2>
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
      ]
    }
  },
  methods: {
    handleSubmit () {
      // TODO: update propId as appropriate
      var propId = 1
      console.log(JSON.stringify(Components.collapse(this.formElements, [])))
      axios.post('/rest/property/' + propId + '/createdocument/',
        Components.collapse(this.formElements, [])
      )
        .then(response => {
          // TODO: update the page with the new document
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
    document.title = 'Manage Documents'
    axios.get('/rest/whoAmI')
      .then(response => {
        if (response.data.role !== 'landlord' && response.data.role !== 'tenant') {
          // not a landlord or tenant, shouldn't be looking at documents
          this.$router.push('/')
        }
        // TODO: do something with the response to get the property
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
