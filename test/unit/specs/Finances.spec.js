import Vue from 'vue'
import FinancesPage from '@/components/FinancesPage'


describe('FinancesPage.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(FinancesPage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h2').textContent)
      .toEqual('Finances')
  })
})
