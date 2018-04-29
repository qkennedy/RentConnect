<template>
  <div id="loginForm">
    <h2>View Maintenance Request</h2>
    <div class="col-sm-4 col-md-4 col-lg-4">
      <div class="panel panel-default">
        <h3>Details</h3>
        <div class="panel-body">
          <dl>
            <dt>
              Address
            </dt>
            <dd>
              {{ address }}
            </dd>
          </dl>
          <dl>
            <dt>
              Title
            </dt>
            <dd>
              {{ reqTitle }}
            </dd>
          </dl>
          <dl>
            <dt>
              Message
            </dt>
            <dd>
              {{ reqContent }}
            </dd>
          </dl>
          <dl>
            <dt>
              Status
            </dt>
            <dd v-if="status === 'open'">
              Open
            </dd>
            <dd v-if="status === 'pending'">
              Pending
            </dd>
            <dd v-if="status === 'closed'">
              Closed
            </dd>
            <dd v-if="status === 'confirmed'">
              Confirmed
            </dd>
          </dl>
          <dl>
            <dt>
              Assigned Worker
            </dt>
            <dd v-if="assignedUsername == ''">
              <i>Not assigned</i>
            </dd>
            <dd v-else>
              {{ assignedUsername }}
            </dd>
          </dl>
        </div>
      </div>
    </div>
    <div class="col-sm-8 col-md-8 col-lg-8">
      <h3>Comments</h3>
      <div class="panel-group">
        <maintenance-comment v-for="comment in comments" v-bind:image="comment.image" v-bind:person="comment.username" v-bind:date="comment.created_date" v-bind:assignedTo="comment.assignedTo" v-bind:comment="comment.comment_text" v-bind:role="comment.role" v-bind:key="comment.id"></maintenance-comment>
        <p v-if="comments.length === 0">
          There are no comments at this time.
        </p>
      </div>
      <h3 v-if="landlord || status !== 'closed'">Leave a comment</h3>
      <form class="form-horizontal auth-form" v-if="landlord || status !== 'closed'" id="loginForm" method="post" enctype="multipart/form-data" @submit.prevent="handleSubmit">
          <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption"
          v-bind:name="element.name" v-bind:key="element.id" v-bind:optional="element.optional" divclass="form-group" labelclass="control-label auth-label" inputclass="form-control" />
          <div class="form-group" v-if="landlord">
            <label class="control-label auth-label" for="worker">
              Assign to worker (<router-link to="/ManageRoster">Manage Workers</router-link>)
            </label>
            <select name="worker" id="worker" class="form-control">
              <option v-for="worker in workers" v-bind:value="worker.id" v-bind:key="worker.id">{{ worker.username }}</option>
            </select>
          </div>
          <div class="form-group" v-if="canClose">
            <label class="control-label auth-label" for="status">Change Status</label>
            <select name="status" id="status" class="form-control">
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
          </div>
        <p><input class="btn btn-primary" type="submit" value="Submit" /></p>
      </form>
    </div>
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
      assignedUsername: '',
      address: '',
      workers: [
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
      formFields.title = this.reqTitle
      axios.post('/rest/request/' + this.$route.params.id + '/addComment',
        formFields
      )
        .then(response => {
          this.updateComments()
        })
        .catch(e => {
          console.log(e)
        })

      if (this.canClose && formFields.status !== '') {
        axios.post('/rest/request/' + this.$route.params.id + '/updateStatus',
          formFields
        )
          .then(response => {
            this.updateStatus()
            this.updateComments()
          })
          .catch(e => {
            console.log(e)
          })
      }

      if (this.landlord && formFields.worker !== '0') {
        axios.post('/rest/request/' + this.$route.params.id + '/assign',
          formFields
        )
          .then(response => {
            this.updateStatus()
            this.updateComments()
          })
          .catch(e => {
            console.log(e)
          })
      }
    },
    updateComments () {
      axios.get('/rest/request/' + this.$route.params.id + '/comments')
        .then(response => {
          var comments = response.data
          var i
          for (i = 0; i < comments.length; i++) {
            comments[i].created_date = (new Date(comments[i].created_date)).toDateString()
          }
          this.comments = comments
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
          this.address = response.data.address
          if (response.data.worker_id !== null) {
            this.assignedUsername = response.data.worker_username
          }
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
    if (this.landlord) {
      axios.get('/rest/user/getRoster/' + this.myId)
        .then(response => {
          var workers = [{
            id: 0,
            username: '(do not change)'
          }]
          workers = workers.concat(response.data)
          this.workers = workers
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
}

Vue.component('maintenance-comment', {
  props: ['image', 'person', 'role', 'date', 'assignedTo', 'comment'],
  template: `<div class="panel panel-default">
    <div class="panel-heading">
    {{ date }}
    </div>
    <div class="panel-body">
      <dl>
        <dt>
          Person
        </dt>
        <dd>
          {{person}} (<span v-if="role === 'maintenanceWorker'">maintenance worker</span><span v-else>{{role}}</span>)
        </dd>
      </dl>
      <dl>
        <dt>
          Comment
        </dt>
        <dd>
          {{ comment }}
        </dd>
      </dl>
    </div>
  </div>`
})
</script>

<style>
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
.auth-form {
    width: 340px;
    margin: 0 auto;
}
.form-group {
  text-align: left;
}
</style>
