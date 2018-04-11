import Vue from 'vue'
import TenantPortal from '@/components/TenantPortal'


describe('TenantPortal.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(TenantPortal)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.left h2').textContent)
      .toEqual('Tenant Portal')
    expect(vm.$el.querySelector('.right h3').textContent)
      .toEqual('Options')
  })
})
