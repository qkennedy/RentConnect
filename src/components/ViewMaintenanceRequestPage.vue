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
          Status
        </th>
        <td v-if="status === 'open'">
          Open
        </td>
        <td v-if="status === 'pending'">
          Pending
        </td>
        <td v-if="status === 'closed'">
          Closed
        </td>
        <td v-if="status === 'confirmed'">
          Confirmed
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
    <h3 v-if="landlord || status !== 'closed'">Leave a comment</h3>
    <form class="fullPageForm" v-if="landlord || status !== 'closed'" id="loginForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.id" v-bind:optional="element.optional" />
        <tr v-if="landlord">
          <td class="leftColumn">
            Assign to worker<br v-if="landlord" /><router-link v-if="landlord" to="/ManageRoster">Manage Workers</router-link>
          </td>
          <td class="rightColumn">
            <select name="worker">
              <option v-for="worker in workers" v-bind:value="worker.id" v-bind:key="worker.id">{{ worker.username }}</option>
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
                (do not change)
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
          name: 'text',
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
      status: '',
      canClose: false,
      // TODO: get this from the backend
      workers: [
        {
          id: 0,
          username: '(do not assign)'
        },
        {
          id: 1,
          username: 'ajohnson'
        }
      ]
    }
  },
  methods: {
    handleSubmit () {
      var extraFields = []
      if (this.canClose) {
        extraFields.push('status')
      }
      if (this.landlord) {
        extraFields.push('worker')
      }
      var formFields = Components.collapse(this.formElements, extraFields)
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

      // TODO: if status or worker selected, do something with it
      if (this.canClose && formFields.status !== '') {
        console.log('Updating status')
        axios.post('/rest/request/' + this.$route.params.id + '/updateStatus',
          formFields
        )
          .then(response => {
            this.updateStatus()
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    updateComments () {
      axios.get('/rest/request/' + this.$route.params.id + '/comments')
        .then(response => {
          this.comments = response.data
        })
        .catch(e => {
          console.log(e)
        })
    },
    updateStatus () {
      axios.get('/rest/request/' + this.$route.params.id)
        .then(response => {
          this.reqTitle = response.data.title
          this.reqContent = response.data.description
          this.attachedImage = response.data.attachedImage
          this.status = response.data.status
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
    this.$session.start()
    if (typeof this.$session.get('userId') === 'undefined' || this.$session.get('userId') < 1) {
      // not logged in or not a tenant, get out of here
      this.$router.push('/')
    }
    this.tenant = this.$session.get('userRole') === 'tenant'
    this.landlord = this.$session.get('userRole') === 'landlord'
    this.maintenanceWorker = this.$session.get('userRole') === 'maintenanceWorker'
    this.canClose = this.landlord || this.maintenanceWorker
    this.myId = this.$session.get('userId')
    this.updateStatus()
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
