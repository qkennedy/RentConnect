<template>
  <div id="loginForm">
    <h2>Submit Maintenance Request</h2>
    <form class="fullPageForm" id="loginForm" method="post" enctype="multipart/form-data">
      <table border="0px" id="loginTable">
        <form-input v-for="element in formElements" v-bind:type="element.type" v-bind:caption="element.caption" v-bind:name="element.name" v-bind:key="element.id" />
      </table>
      <p><input type="submit" value="Submit" /></p>
    </form>
  </div>
</template>

<script>
import Components from '@/components/UIComponents'

document.title = 'Submit Maintenance Request'

export default {
  name: 'LoginPage',
  data () {
    return {
      formElements: [
        {
          id: 0,
          type: 'text',
          name: 'location',
          caption: 'Location'
        },
        {
          id: 1,
          type: 'textarea',
          name: 'description',
          caption: 'Description'
        },
        {
          id: 2,
          type: 'file',
          name: 'image',
          caption: 'Image to attach'
        }
      ]
    }
  },
  components: {
    Components
  }
}
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
