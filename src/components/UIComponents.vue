<script>
import Vue from 'vue'
export default {
  data () {

  },
  collapse (formElements, additionalStuff) {
    var out = {}
    var name
    var value
    var i
    for (i = 0; i < formElements.length; i++) {
      name = formElements[i].name
      value = document.getElementsByName(name)[0].value
      out[name] = value
    }
    for (i = 0; i < additionalStuff.length; i++) {
      name = additionalStuff[i]
      value = document.getElementsByName(name)[0].value
      out[name] = value
    }
    return out
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
  props: ['type', 'name', 'caption', 'value', 'optional', 'divclass', 'labelclass', 'inputclass', 'min', 'max'],
  // template: '<tr><td class="leftColumn">{{ caption }}</td><td class="rightColumn" v-if="type!==\'yesno\' && type!==\'textarea\'"><input v-bind:type="type" v-bind:name="name" v-bind:placeholder="caption" v-bind:value="value" v-bind:required="!optional" /></td><td class="rightColumn" v-if="type===\'textarea\'"><textarea v-bind:name="name" rows="6" cols="30" v-bind:required="!optional"></textarea></td><td class="rightColumn" v-if="type===\'yesno\'"><input type="radio" v-bind:name="name" value="1" v-bind:checked="value === 1" v-bind:required="!optional" />Yes <input type="radio" v-bind:name="name" value="0" v-bind:checked="value === 0" v-bind:required="!optional" />No</td></tr>'
  template: `
  <div v-bind:class="divclass">
    <label v-bind:class="labelclass" v-bind:for="name">{{caption}}</label>
    <textarea v-if="type == 'textarea'" v-bind:class="inputclass" v-bind:id="name" v-bind:name="name">{{ value }}</textarea>
    <input v-if="type !== 'textarea'" v-bind:type="type" v-bind:class="inputclass" v-bind:id="name" v-bind:name="name" v-bind:value="value" v-bind:min="min" v-bind:max="max">
  </div>
  `
})

Vue.component('leftright-static-display', {
  // TODO: force the value to display
  props: ['type', 'name', 'caption', 'value'],
  template: '<tr><td class="leftColumn">{{ caption }}</td><td class="rightColumn"><input v-bind:type="type" v-bind:name="name" v-bind:placeholder="caption" v-bind:value="value" readonly="readonly" /></td></tr>'
})
</script>
