import Vue from 'vue'
import ViewMaintenanceRequestPage from '@/components/ViewMaintenanceRequestPage'


describe('ViewMaintenanceRequestPage.vue', () => {
  it('should render correct contents and have correct components', () => {
    const Constructor = Vue.extend(ViewMaintenanceRequestPage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h2').textContent)
      .toEqual('View Maintenance Request')
    expect(vm.$el.querySelector('select').name)
      .toEqual('worker')
    expect(vm.$el.querySelector('.standardTable th').textContent.trim())
      .toEqual('Location')
    expect(vm.formElements[0].type)
      .toEqual('textarea')
    expect(vm.formElements[0].name)
      .toEqual('comment')
    expect(vm.handleSubmit)
      .toBeDefined()
    const vm2 = new Constructor({landlord: true}).$mount()
    const vm3 = new Constructor({maintenanceWorker: true}).$mount()
  })
})
