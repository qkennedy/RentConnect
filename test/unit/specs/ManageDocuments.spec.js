import Vue from 'vue'
import ManageDocumentsPage from '@/components/ManageDocumentsPage'


describe('ManageDocumentsPage.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ManageDocumentsPage)
    const vm = new Constructor().$mount()
    expect(vm.formElements[0].type)
      .toEqual('text')
    expect(vm.formElements[0].name)
      .toEqual('title')
    expect(vm.$el.querySelector('h2').textContent)
      .toEqual('Manage Documents')
    expect(vm.$el.querySelector('h3').textContent)
      .toEqual('Upload New Document')
  })
})
