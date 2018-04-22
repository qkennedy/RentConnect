<script>
import Vue from 'vue'
export default {
  data () {

  },
}


Vue.component('bulk-notification', {
  props: ['subject', 'message'],
  template:
    `<div class="notification-header">
      <h4>Message From Landlord:</h4>
    </div>
    <div class="notification bulk-notification">
      <h4>{{subject}}</h4>
      <p>{{message}}</p>
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
  props: ['subject', 'requestId', 'creatorUsername'],
  template:
  `<div class="notification-header">
    <h4>New Maint. Request created by user: {{username}} </h4>
  </div>
  <div>
  </div>`
})
</script>
