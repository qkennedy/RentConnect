import Vue from 'vue'
import UserProfile from '@/components/UserProfile'


describe('UserProfile.vue', () => {
  it('should render correct contents and have correct components', () => {
    const Constructor = Vue.extend(UserProfile)
    const vm = new Constructor().$mount()
    expect(vm.formElements[0].type)
      .toEqual('text')
    expect(vm.formElements[0].name)
      .toEqual('email')
    expect(vm.formElements[3].type)
      .toEqual('password')
    expect(vm.formElements[3].name)
      .toEqual('password2')
    expect(vm.formElements[5].type)
      .toEqual('yesno')
    expect(vm.formElements[5].name)
      .toEqual('publicphone')
    expect(vm.handleSubmit)
      .toBeDefined()
  })
})
