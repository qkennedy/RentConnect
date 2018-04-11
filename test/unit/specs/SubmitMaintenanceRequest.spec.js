import Vue from 'vue'
import SubmitMaintenanceRequestPage from '@/components/SubmitMaintenanceRequestPage'


describe('SubmitMaintenanceRequestPage.vue', () => {
  it('should render correct contents and have necessary components', () => {
    const Constructor = Vue.extend(SubmitMaintenanceRequestPage)
    const vm = new Constructor().$mount()
    expect(vm.formElements[0].type)
      .toEqual('text')
    expect(vm.formElements[0].name)
      .toEqual('location')
    expect(vm.formElements[2].type)
      .toEqual('file')
    expect(vm.formElements[2].name)
      .toEqual('image')
    expect(vm.handleSubmit)
      .toBeDefined()
    expect(vm.$el.querySelector('h2').textContent)
      .toEqual('Submit Maintenance Request')
  })
})
