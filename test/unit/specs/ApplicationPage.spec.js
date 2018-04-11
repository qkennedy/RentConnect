import Vue from 'vue'
import ApplicationPage from '@/components/ApplicationPage'


describe('ApplicationPage.vue', () => {
  it('should render correct contents and have necessary components', () => {
    const Constructor = Vue.extend(ApplicationPage)
    const vm = new Constructor().$mount()
    expect(vm.formElements[0].type)
      .toEqual('text')
    expect(vm.formElements[0].name)
      .toEqual('name')
    expect(vm.formElements[7].type)
      .toEqual('text')
    expect(vm.formElements[7].name)
      .toEqual('city')
    expect(vm.formElements[14].type)
      .toEqual('yesno')
    expect(vm.formElements[14].name)
      .toEqual('felony')
    expect(vm.handleSubmit)
      .toBeDefined()
    expect(vm.$el.querySelector('h2').textContent)
      .toEqual('Apply to rent property')
  })
})
