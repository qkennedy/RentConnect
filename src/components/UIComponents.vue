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
  props: ['type', 'name', 'caption', 'value'],
  template: '<tr><td class="leftColumn">{{ caption }}</td><td class="rightColumn" v-if="type!==\'yesno\'"><input v-bind:type="type" v-bind:name="name" v-bind:placeholder="caption" v-bind:value="value" /></td><td class="rightColumn" v-if="type===\'yesno\'"><input type="radio" v-bind:name="name" value="1" />Yes <input type="radio" v-bind:name="name" value="1" />No</td></tr>'
})

Vue.component('leftright-static-display', {
  // TODO: force the value
  props: ['type', 'name', 'caption', 'value'],
  template: '<tr><td class="leftColumn">{{ caption }}</td><td class="rightColumn"><input v-bind:type="type" v-bind:name="name" v-bind:placeholder="caption" v-bind:value="123" readonly="readonly" /></td></tr>'
})
</script>
