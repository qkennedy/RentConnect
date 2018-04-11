import Vue from 'vue'
import Login from '@/components/LoginPage'


describe('LoginPage.vue', () => {
  it('should render correct contents and have correct components', () => {
    const Constructor = Vue.extend(Login)
    const vm = new Constructor().$mount()
    expect(vm.formElements[0].type)
      .toEqual('text')
    expect(vm.formElements[0].name)
      .toEqual('username')
    expect(vm.handleSubmit)
      .toBeDefined()
  })
})
