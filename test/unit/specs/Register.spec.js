import Vue from 'vue'
import Register from '@/components/RegisterPage'


describe('RegisterPage.vue', () => {
  it('should render correct contents and have correct components', () => {
    const Constructor = Vue.extend(Register)
    const vm = new Constructor().$mount()
    expect(vm.formElements[0].type)
      .toEqual('text')
    expect(vm.formElements[0].name)
      .toEqual('username')
    expect(vm.formElements[3].type)
      .toEqual('email')
    expect(vm.formElements[3].name)
      .toEqual('email')
    expect(vm.formElements[5].type)
      .toEqual('text')
    expect(vm.formElements[5].name)
      .toEqual('name')
    expect(vm.handleSubmit)
      .toBeDefined()
    expect(vm.$el.querySelector('#registerForm select').name)
      .toEqual('role')
    expect(vm.$el.querySelector('input[type="submit"]').value)
      .toEqual('Register')
  })
})
