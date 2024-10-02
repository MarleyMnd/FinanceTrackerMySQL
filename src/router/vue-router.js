// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import FinanceTracker from '../components/FinanceTracker.vue'
import SmartBanking from '../components/SmartBanking.vue'
import SubscriptionManag from '../components/SubscriptionManag.vue'
import LoginPage from '@/components/LoginPage.vue'
import CreateAccount from '@/components/CreateAccount.vue'
import ForgotPasswd from '@/components/ForgotPasswd.vue'

const routes = [
  {
    path: '/Finance',
    name: 'FinanceTracker',
    component: FinanceTracker
  },
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/SmartBanking',
    name: 'SmartBanking',
    component: SmartBanking
  },
  {
    path: '/CreateAccount',
    name: 'CreateAccount',
    component: CreateAccount
  },
  {
    path: '/ForgotPasswd',
    name: 'ForgotPasswd',
    component: ForgotPasswd
  },
  {
    path: '/SubscriptionManag',
    name: 'SubscriptionManag',
    component: SubscriptionManag
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
