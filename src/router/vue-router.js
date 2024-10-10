// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import FinanceTracker from '../Views/FinanceTracker.vue'
import SmartBanking from '../Views/SmartBanking.vue'
import SubscriptionManag from '../Views/SubscriptionManag.vue'
import LoginPage from '../Views/LoginPage.vue'
import CreateAccount from '../Views/CreateAccount.vue'
import ForgotPasswd from '../Views/ForgotPasswd.vue'
import Tasks from '../Views/Tasks.vue'

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
  },
  {
    path: '/Tasks',
    name: 'Tasks',
    component: Tasks
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
