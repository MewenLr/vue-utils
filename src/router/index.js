import Vue from 'vue'
import App from '@/App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/foo', component: App },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
