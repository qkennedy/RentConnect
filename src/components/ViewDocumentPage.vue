<template>
  <div class="hello" id="viewDocumentPage">
    <!-- TODO: adapt CSS to bootstrap -->
    <h2>View Document</h2>
    <div style="text-align: left; padding-left: 5px">
      <h3>{{ docTitle }}</h3>
      <p>
        Last updated: {{ lastUpdated }}<br />
        <!-- TODO: make this a link to the document PDF -->
        <a href="#">View Document</a>
      </p>
      <h4>Upload New Version</h4>
      <form @submit.prevent="handleSubmit">
        <input type="file" ref="file" /><br />
        <input type="submit" value="Upload" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Components from '@/components/UIComponents'

export default {
  name: 'ViewDocumentPage',
  data () {
    return {
      docTitle: '',
      lastUpdated: '',
      fileLink: ''
    }
  },
  methods: {
    handleSubmit () {
      // TODO: update document
      axios.post('/rest/',
        {
          file: this.$refs.file // TODO: extract the file
        }
      )
        .then(response => {
          // TODO: update the page with the new file
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
    document.title = 'View Document'
    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1 || (this.$session.get('userRole') !== 'landlord' && this.$session.get('userRole') !== 'tenant')) {
      this.$router.push('/')
    }
    axios.get('/rest/document/' + this.$route.params.id)
      .then(response => {
        this.docTitle = response.data.title
        this.lastUpdated = new Date(response.data.created_date).toLocaleString()
        this.fileLink = response.data.fileLink
      })
      .catch(e => {
        if (typeof e.status !== 'undefined' && e.status === 404) {
          this.$router.push('/404')
        } else {
          console.log(e)
        }
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
