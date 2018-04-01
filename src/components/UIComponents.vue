<script>
import Vue from 'vue'
export default {
  data () {

  }
}
Vue.component('notification-entry', {
  props: ['title', 'contents'],
  template: '<div class="notification"><h4>{{ title }}</h4> <p v-html="contents"></p></p></div>'
})

Vue.component('property-li-info', {
  props: ['address', 'rentdate', 'rentamt', 'late'],
  template: '<p>Address: {{ address }}<br />Rent: {{ rentamt }}<br />Due: {{ rentdate }}</p>'
})
</script>
