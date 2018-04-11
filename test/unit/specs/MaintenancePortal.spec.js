import Vue from 'vue'
import MaintenancePortal from '@/components/MaintenancePortal'


describe('MaintenancePortal.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(MaintenancePortal)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.left h2').textContent)
      .toEqual('Maintenance Portal')
    expect(vm.$el.querySelector('.left h3').textContent)
      .toEqual('Notifications')
    expect(vm.$el.querySelector('.right h3').textContent)
      .toEqual('Options')
  })
})
