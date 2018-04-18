<template>
  <div id="loginForm">
    <h2>View Maintenance Request</h2>
    <h3>Request details</h3>
    <table border="0" class="standardTable">
      <tr>
        <th>
          Title
        </th>
        <td>
          {{ reqTitle }}
        </td>
      </tr>
      <tr>
        <th>
          Message
        </th>
        <td>
          {{ reqContent }}
        </td>
      </tr>
      <tr>
        <th>
          Attached image
        </th>
        <td v-if="attachedImage">
          <img v-bind:src="attachedImage" alt="image" />
        </td>
        <td v-else>
          <i>No image</i>
        </td>
      </tr>
    </table>
    <h3>Comments</h3>
    <maintenance-comment v-for="comment in comments" v-bind:image="comment.image" v-bind:person="comment.username" v-bind:date="comment.created_date" v-bind:assignedTo="comment.assignedTo" v-bind:comment="comment.comment_text" v-bind:role="comment.role" v-bind:key="comment.id"></maintenance-comment>
    <h3>Leave a comment</h3>
    <form class="fullPageForm" id="loginForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.id" v-bind:optional="element.optional" />
        <tr v-if="landlord">
          <td class="leftColumn">
            Assign to worker
          </td>
          <td class="rightColumn">
            <select name="worker">
              <option v-for="worker in workers" v-bind:value="worker.value" v-bind:key="worker.value">{{ worker.text }}</option>
            </select>
          </td>
        </tr>
        <tr v-if="canClose">
          <td class="leftColumn">
            Change request status
          </td>
          <td class="rightColumn">
            <select name="status">
              <option value="">
                (don't change)
              </option>
              <option value="open">
                Open
              </option>
              <option value="pending">
                Pending
              </option>
              <option value="closed">
                Closed
              </option>
              <option value="confirmed">
                Confirmed
              </option>
            </select>
          </td>
        </tr>
      </table>
      <p><input type="submit" value="Submit" /></p>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import Components from '@/components/UIComponents'

export default {
  name: 'LoginPage',
  data () {
    return {
      formElements: [
        {
          id: 0,
          type: 'textarea',
          name: 'comment',
          caption: 'Comment'
        },
        {
          id: 1,
          type: 'file',
          name: 'image',
          caption: 'Attach image',
          optional: true
        }
      ],
      comments: [],
      landlord: true,
      maintenanceWorker: false,
      reqTitle: '',
      reqContent: '',
      attachedImage: false,
      myId: 0,
      canClose: this.landlord || this.maintenanceWorker,
      // TODO: get this from the backend
      workers: [
        { text: 'Alex Johnson', value: 'ajohnson' }
      ]
    }
  },
  methods: {
    handleSubmit () {
      var extraComponents = []
      if (this.landlord) {
        extraComponents.add('worker')
      }
      if (this.canClose) {
        extraComponents.add('status')
      }
      console.log(JSON.stringify(extraComponents))
      var formFields = Components.collapse(this.formElements, extraComponents)
      formFields.creatorId = this.myId
      axios.post('/rest/request/' + this.$route.params.id + '/addComment',
        formFields
      )
        .then(response => {
          this.updateComments()
        })
        .catch(e => {
          console.log(e)
        })
    },
    updateComments () {
      axios.get('/rest/request/' + this.$route.params.id + '/comments')
        .then(response => {
          this.comments = response.data
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
    document.title = 'View Maintenance Request'
    axios.get('/rest/whoAmI')
      .then(response => {
        this.tenant = response.data.role === 'tenant'
        this.landlord = response.data.role === 'landlord'
        this.maintenanceWorker = response.data.role === 'maint'
        this.myId = response.data.id
      })
      .catch(e => {
        console.log(e)
      })
    axios.get('/rest/request/' + this.$route.params.id)
      .then(response => {
        this.reqTitle = response.data.title
        this.reqContent = response.data.description
        this.attachedImage = response.data.attachedImage
      })
      .catch(e => {
        console.log(e)
      })
    this.updateComments()
  }
}

Vue.component('maintenance-comment', {
  props: ['image', 'person', 'role', 'date', 'assignedTo', 'comment'],
  template: '<div style="text-align:left"><h4>{{ date }}</h4><table border="0" class="maintenanceTable"><tr><th>Person</th><td>{{ person }} ({{ role }})</td></tr><tr v-if="assignedTo"><th>Assigned to</th><td>{{ assignedTo }}</td></tr><tr><th>Comment</th><td>{{ comment }}</td></tr><tr v-if="image"><th>Attached image</th><td><img v-bind:src="image" alt="image" /></td></tr></table></div>'
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
