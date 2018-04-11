import Vue from 'vue'
import ProcessApplicationPage from '@/components/ProcessApplicationPage'


describe('ProcessApplicationPage.vue', () => {
  it('should render correct contents and have necessary components', () => {
    const Constructor = Vue.extend(ProcessApplicationPage)
    const vm = new Constructor().$mount()
    expect(vm.pageElements[0].type)
      .toEqual('text')
    expect(vm.pageElements[0].name)
      .toEqual('name')
    expect(vm.pageElements[7].type)
      .toEqual('text')
    expect(vm.pageElements[7].name)
      .toEqual('city')
    expect(vm.pageElements[14].type)
      .toEqual('yesno')
    expect(vm.pageElements[14].name)
      .toEqual('felony')
    expect(vm.handleSubmit)
      .toBeDefined()
    expect(vm.$el.querySelector('h2').textContent)
      .toEqual('Process application')
  })
})
