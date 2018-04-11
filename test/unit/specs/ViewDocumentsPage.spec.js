import Vue from 'vue'
import ViewDocumentPage from '@/components/ViewDocumentPage'


describe('ViewDocumentPage.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ViewDocumentPage)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h2').textContent)
      .toEqual('View Document')
    expect(vm.$el.querySelector('h4').textContent)
      .toEqual('Upload New Version')
    expect(vm.handleSubmit)
      .toBeDefined()
  })
})
