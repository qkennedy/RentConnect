import Vue from 'vue'
import EditListingPage from '@/components/EditListingPage'


describe('UserProfile.vue', () => {
  it('should render correct contents and have correct components', () => {
    const Constructor = Vue.extend(EditListingPage)
    const vm = new Constructor().$mount()
    expect(vm.formElements[0].type)
      .toEqual('text')
    expect(vm.formElements[0].name)
      .toEqual('address')
    expect(vm.formElements[2].type)
      .toEqual('number')
    expect(vm.formElements[2].name)
      .toEqual('rentdue')
    expect(vm.handleSubmit)
      .toBeDefined()
  })
})
