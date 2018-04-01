<template>
  <div id="sidebar">
    <p>You are not logged in.</p>
    <ul class="optionlist" id="sidebaroptions">
      <li class="first"><a href="#/Login">Log In</a></li>
      <li><a href="#/Register">Register</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style>
#sidebar {
  height:100%;
  float:right;
  background-color:#39F;
  left:0px;
  top:0px;
  margin: 0px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  position:absolute;
  clear:both;
  width:200px;
}

#sidebar p {
  padding-left:5px;
}

#sidebaroptions {
  margin:0;
  padding:0;
}

.optionlist li.first {
  border-bottom: none;
}

.optionlist li {
  list-style-type: none;
  padding-left:0px;
  margin-left:0px;
  text-align:center;
  border: 1px solid #000;
  display:block;
}

#container {
  float:left;
  position:absolute;
  clear:both;
  margin-right: 0px;
  right:0px;
  left:200px;
}

body {
  padding: 0px;
}
</style>
