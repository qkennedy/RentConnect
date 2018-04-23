<script>
import Vue from 'vue'
export default {
  data () {

  }
}

Vue.component('notification-entry', {
  props: ['notif'],
  template:
    `
    <div>
    <bulk-notification v-if="notif.type === 'bulk'" v-bind:subject="notif.subject" v-bind:message="notif.message" />
    <maint-req-created-notification v-if="notif.type === 'newmaint'" v-bind:requestId="notif.maint_req_id"
      v-bind:creatorUsername="notif.username" v-bind:title="notif.mtitle" />
    </div>
    `
})

Vue.component('bulk-notification', {
  props: ['subject', 'message'],
  template:
    `<div class="panel panel-default">
      <div class="panel-heading">
      Message from landlord: <b>{{ subject }}</b>
      </div>
      <div>
        {{ message }}
      </div>
    </div>`
})

Vue.component('rent-due-notification', {
  props: ['rentAmount', 'days'],
  template:
  `<div class="notification-header">
    <h4> Rent Payment of {{rentAmount}} due in {{days}} Days. </h4>
  </div>`
})

Vue.component('maint-req-created-notification', {
  props: ['subject', 'requestId', 'creatorUsername', 'title'],
  template:
  `<div class="panel panel-default">
    <div class="panel-heading">
      New Maintenance Request created by user: {{creatorUsername}}
    </div>
    <div class="panel-body">
      <p>
        {{ title }}
      </p>
      <router-link v-bind:to="'/ViewMaintenanceRequest/' + requestId" class="btn btn-primary">View Request</router-link>
    </div>
  </div>`
})
</script>
