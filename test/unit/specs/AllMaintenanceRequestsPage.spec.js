import Vue from 'vue'
import AllMaintenanceRequestsPage from '@/components/AllMaintenanceRequestsPage'


describe('AllMaintenanceRequestsPage.vue', () => {
  it('should render correct contents and have correct components', () => {
    const Constructor = Vue.extend(AllMaintenanceRequestsPage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h2').textContent)
      .toEqual('Maintenance Requests')
  })
})
