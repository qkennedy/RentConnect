import Vue from 'vue'
import BulkNotificationPage from '@/components/BulkNotificationPage'


describe('BulkNotificationPage.vue', () => {
  it('should render correct contents and have necessary components', () => {
    const Constructor = Vue.extend(BulkNotificationPage)
    const vm = new Constructor().$mount()
    expect(vm.formElements[0].type)
      .toEqual('text')
    expect(vm.formElements[0].name)
      .toEqual('subject')
    expect(vm.formElements[1].type)
      .toEqual('textarea')
    expect(vm.formElements[1].name)
      .toEqual('body')
    expect(vm.handleSubmit)
      .toBeDefined()
    expect(vm.$el.querySelector('h2').textContent)
      .toEqual('Send Bulk Notification')
  })
})
