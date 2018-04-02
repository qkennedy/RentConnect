<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.left {
    float:left;
    text-align:left;
    padding-left: 5px;
}

.left .notification p {
    margin-left:10px;
}

.right {
    float:right;
    background-color:#FF3;
    padding-right:0px;
    margin-right:0px;
    padding-left:0px;
    height:100%;
    min-width:200px;
}

.right li {
  margin-left:0px;
  padding-right:0px;
  margin-right:0px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

.fullPageForm table {
}

</style>
