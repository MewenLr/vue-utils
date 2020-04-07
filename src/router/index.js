import Vue from 'vue'
// import App from '@/App.vue'
import PHome from '@/components/pages/p-home.vue'
import PAbout from '@/components/pages/p-about.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: PHome },
  { path: '/about', component: PAbout },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
