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
    <form class="fullPageForm">
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
import Vue from 'vue'
import Components from '@/components/UIComponents'

document.title = 'Manage Documents'

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
        // TODO: replace this with a way to get these from the backend
        {
          id: 0,
          title: 'Lease Agreement',
          link: 'ViewDocument/1',
          lastUpdated: 'January 1, 1970'
        },
        {
          id: 1,
          title: 'Stove Manual',
          link: 'ViewDocument/2',
          lastUpdated: 'January 1, 1970'
        }
      ],
      docTitle: 'Sample Document Title',
      lastUpdated: 'January 1, 1970'
    }
  },
  components: {
    Components
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
