// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import FinanceTracker from '../components/FinanceTracker.vue'
import SmartBanking from '../components/SmartBanking.vue'
import SubscriptionManag from '../components/SubscriptionManag.vue'

const routes = [
  {
    path: '/',
    name: 'FinanceTracker',
    component: FinanceTracker
  },
  {
    path: '/SmartBanking',
    name: 'SmartBanking',
    component: SmartBanking
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
