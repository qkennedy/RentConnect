import Vue from 'vue'
import MyPropertiesPage from '@/components/MyPropertiesPage'


describe('MyPropertiesPage.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(MyPropertiesPage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h2').textContent)
      .toEqual('My Properties')
  })
})
