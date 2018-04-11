import Vue from 'vue'
import Sidebar from '@/components/Sidebar'


describe('Sidebar.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Sidebar)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('#sidebar p').textContent)
      .toEqual('You are not logged in.')
    expect(vm.loggedIn)
      .toBeDefined()
    expect(vm.$el.querySelector('#sidebar li a').textContent)
      .toEqual('Log In')
  })
})
