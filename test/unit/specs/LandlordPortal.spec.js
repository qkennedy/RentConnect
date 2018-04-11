import Vue from 'vue'
import LandlordPortal from '@/components/LandlordPortal'


describe('LandlordPortal.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(LandlordPortal)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.left h2').textContent)
      .toEqual('Landlord Portal')
    expect(vm.$el.querySelector('.right h3').textContent)
      .toEqual('Options')
  })
})
