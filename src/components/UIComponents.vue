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

Vue.component('form-input', {
  props: ['type', 'name', 'caption'],
  template: '<tr><td style="width:40%"></td><td>{{ caption }}</td><td><input v-bind:type="type" v-bind:name="name" v-bind:placeholder="caption" /><td style="width:40%"></td></td>'
})
</script>
