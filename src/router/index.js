import Vue from 'vue'
import Router from 'vue-router'
import Diagnosis from '../components/diagnosis'
import Account from '../components/account'
import Client from '../components/client'
import Index from '../pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: 'diagnosis',
          name: 'diagnosis',
          component: Diagnosis
        },
        {
          path: 'account',
          name: 'account',
          component: Account
        },
        {
          path: 'client',
          name: 'client',
          component: Client
        }
      ]
    },

  ]
})
