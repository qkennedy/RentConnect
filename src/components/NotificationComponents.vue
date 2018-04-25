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
    <maint-comment-notification v-if="notif.type === 'maintcomment'" v-bind:requestId="notif.maint_req_id"
      v-bind:creatorUsername="notif.username" v-bind:title="notif.mtitle" />
    <maint-status-notification v-if="notif.type === 'maintcomment'" v-bind:requestId="notif.maint_req_id"
      v-bind:creatorUsername="notif.username" v-bind:title="notif.mtitle" v-bind:status="notif.mstatus" />
    <maint-assign-notification v-if="notif.type === 'maintassign'" v-bind:requestId="notif.maint_req_id"
      v-bind:creatorUsername="notif.username" v-bind:title="notif.mtitle" />
    <prop-assign-notification v-if="notif.type === 'propassign'" v-bind:address="notif.paddress" />
    <prop-apply-notification v-if="notif.type === 'application'" v-bind:appId="notif.application_id" v-bind:address="notif.paddress" />
    <prop-reject-notification v-if="notif.type === 'applicationreject'" v-bind:address="notif.paddress" />
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
      New maintenance request created by user: {{creatorUsername}}
    </div>
    <div class="panel-body">
      <p>
        {{ title }}
      </p>
      <router-link v-bind:to="'/ViewMaintenanceRequest/' + requestId" class="btn btn-primary">View Request</router-link>
    </div>
  </div>`
})

Vue.component('maint-comment-notification', {
  props: ['subject', 'requestId', 'creatorUsername', 'title'],
  template:
  `<div class="panel panel-default">
    <div class="panel-heading">
      New maintenance comment
    </div>
    <div class="panel-body">
      <p>
        Maintenance request <router-link v-bind:to="'/ViewMaintenanceRequest/' + requestId">{{ title }}</router-link> has received a new comment by {{ creatorUsername }}.
      </p>
      <router-link v-bind:to="'/ViewMaintenanceRequest/' + requestId" class="btn btn-primary">View Request</router-link>
    </div>
  </div>`
})

Vue.component('maint-status-notification', {
  props: ['subject', 'requestId', 'creatorUsername', 'title', 'status'],
  template:
  `<div class="panel panel-default">
    <div class="panel-heading">
      Maintenance status update
    </div>
    <div class="panel-body">
      <p>
        The status of the maintenance request <router-link v-bind:to="'/ViewMaintenanceRequest/' + requestId">{{ title }}</router-link> was changed to
          <b v-if="status === 1">open</b>
          <b v-if="status === 2">pending</b>
          <b v-if="status === 3">closed</b>
          <b v-if="status === 4">confirmed</b>
         by {{ creatorUsername }}.
      </p>
      <router-link v-bind:to="'/ViewMaintenanceRequest/' + requestId" class="btn btn-primary">View Request</router-link>
    </div>
  </div>`
})

Vue.component('maint-assign-notification', {
  props: ['subject', 'requestId', 'creatorUsername', 'title'],
  template:
  `<div class="panel panel-default">
    <div class="panel-heading">
      Maintenance request assigned
    </div>
    <div class="panel-body">
      <p>
        The maintenance request <router-link v-bind:to="'/ViewMaintenanceRequest/' + requestId">{{ title }}</router-link> has been assigned to you.
      </p>
      <router-link v-bind:to="'/ViewMaintenanceRequest/' + requestId" class="btn btn-primary">View Request</router-link>
    </div>
  </div>`
})

Vue.component('prop-assign-notification', {
  props: ['address'],
  template:
  `<div class="panel panel-default">
    <div class="panel-heading">
      Assigned Property
    </div>
    <div class="panel-body">
      <p>
        You have been assigned to the property at <b>{{ address }}</b>.
      </p>
    </div>
  </div>`
})

Vue.component('prop-apply-notification', {
  props: ['address', 'appId'],
  template:
  `<div class="panel panel-default">
    <div class="panel-heading">
      New Application
    </div>
    <div class="panel-body">
      <p>
        Your property at <b>{{ address }}</b> has received a new application.
      </p>
      <router-link v-bind:to="'/ProcessApplication/' + appId" class="btn btn-primary">View Application</router-link>
    </div>
  </div>`
})

Vue.component('prop-reject-notification', {
  props: ['address'],
  template:
  `<div class="panel panel-default">
    <div class="panel-heading">
      Application Rejected
    </div>
    <div class="panel-body">
      <p>
        Your application to rent <b>{{ address }}</b> has been rejected.
      </p>
    </div>
  </div>`
})
</script>
