import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    // {
    //   path: '/',
    //   name: 'diagnosis',
    //   component: Diagnosis
    // },
    // {
    //   path: '/',
    //   name: 'account',
    //   component: Account
    // },
    // {
    //   path: '/',
    //   name: 'client',
    //   component: Client
    // }
  ]
})
