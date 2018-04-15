// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'

Vue.config.productionTip = false

Vue.prototype.$eventHub = new Vue()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

new Vue({
  el: '#sidebar',
  components: { Sidebar },
  template: '<Sidebar/>'
})

new Vue({
  el: '#header',
  components: { Header },
  template: '<Header/>'
})
