<template>
  <div id="loginForm">
    <h2>View Maintenance Request</h2>
    <h3>Request details</h3>
    <table border="0" class="standardTable">
      <tr>
        <th>
          Location
        </th>
        <td>
          {{ reqLocation }}
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
    <maintenance-comment v-for="comment in comments" v-bind:image="comment.image" v-bind:person="comment.person" v-bind:date="comment.date" v-bind:assignedTo="comment.assignedTo" v-bind:comment="comment.comment" v-bind:role="comment.role" v-bind:key="comment.id"></maintenance-comment>
    <h3>Leave a comment</h3>
    <form class="fullPageForm" id="loginForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.id" />
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
        <tr v-if="landlord || maintenanceWorker">
          <td class="leftColumn">
            Change request status
          </td>
          <td class="rightColumn">
            <select name="status">
              <option value="">
                (keep open)
              </option>
              <option value="fixed">
                Fixed
              </option>
              <option value="unfixable">
                Unfixable
              </option>
              <option value="invalid">
                Invalid
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

document.title = 'View Maintenance Request'

export default {
  name: 'LoginPage',
  data () {
    return {
      formElements: [
        {
          id: 0,
          type: 'text',
          name: 'comment',
          caption: 'Comment'
        },
        {
          id: 1,
          type: 'file',
          name: 'image',
          caption: 'Attach image'
        }
      ],
      // TODO: populate these fields
      landlord: true,
      maintenanceWorker: false,
      canClose: this.landlord || this.maintenanceWorker,
      workers: [
        { text: 'Alex Johnson', value: 'ajohnson' }
      ]
    }
  },
  methods: {
    handleSubmit () {
      axios.post('/rest/',
        Components.collapse(this.formElements, ['worker', 'status'])
      )
        .then(response => {
          // TODO: parse response
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
    axios.get('/rest/getMaintInfo/' + this.$route.params.id)
      .then(response => {
        console.log(JSON.stringify(response))
        this.reqLocation = response.data.reqLocation
        this.reqContent = response.data.reqContent
        this.attachedImage = response.data.attachedImage
        this.comments = response.data.comments
      })
      .catch(e => {
        console.log(e)
      })
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
