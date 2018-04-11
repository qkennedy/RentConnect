import Vue from 'vue'
import IndexPage from '@/components/IndexPage'


describe('IndexPage.vue', () => {
  it('should render correct contents and have correct components', () => {
    const Constructor = Vue.extend(IndexPage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h2').textContent)
      .toEqual('Welcome to RentConnect!')
  })
})
