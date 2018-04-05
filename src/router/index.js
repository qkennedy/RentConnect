import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/IndexPage'
import LoginPage from '@/components/LoginPage'
import RegisterPage from '@/components/RegisterPage'
import TenantPortal from '@/components/TenantPortal'
import LandlordPortal from '@/components/LandlordPortal'
import UserProfilePage from '@/components/UserProfile'
import MaintenancePortal from '@/components/MaintenancePortal'
import ApplicationPage from '@/components/ApplicationPage'
import ProcessApplicationPage from '@/components/ProcessApplicationPage'
import FinancesPage from '@/components/FinancesPage'
import SubmitMaintenanceRequestPage from '@/components/SubmitMaintenanceRequestPage'
import ViewMaintenanceRequestPage from '@/components/ViewMaintenanceRequestPage'
import BulkNotificationPage from '@/components/BulkNotificationPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/Login/',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/Register/',
      name: 'RegisterPage',
      component: RegisterPage
    },
    {
      path: '/TenantPortal/',
      name: 'TenantPortal',
      component: TenantPortal
    },
    {
      path: '/LandlordPortal/',
      name: 'LandlordPortal',
      component: LandlordPortal
    },
    {
      path: '/UserProfile/',
      name: 'UserProfilePage',
      component: UserProfilePage
    },
    {
      path: '/MaintenancePortal/',
      name: 'MaintenancePortal',
      component: MaintenancePortal
    },
    {
      path: '/Apply',
      name: 'ApplicationPage',
      component: ApplicationPage
    },
    {
      path: '/ProcessApplication',
      name: 'ProcessApplicationPage',
      component: ProcessApplicationPage
    },
    {
      path: '/Finances',
      name: 'FinancesPage',
      component: FinancesPage
    },
    {
      path: '/SubmitMaintenanceRequest',
      name: 'SubmitMaintenanceRequestPage',
      component: SubmitMaintenanceRequestPage
    },
    {
      path: '/ViewMaintenanceRequest',
      name: 'ViewMaintenanceRequestPage',
      component: ViewMaintenanceRequestPage
    },
    {
      path: '/BulkNotification',
      name: 'BulkNotificationPage',
      component: BulkNotificationPage
    }
  ]
})
