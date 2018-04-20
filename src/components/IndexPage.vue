<template>
  <div class="hello">
    <h2>Welcome to RentConnect!</h2>
    <p>
      RentConnect is a tool that allows landlords and tenants to faciliate communication and business interactions. It allows for automatic collection of rent, storage of documents, and processing of maintenance requests.
    </p>
    <ul>
      <router-link to="/">Get Started</router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    document.title = 'Welcome to RentConnect'
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
