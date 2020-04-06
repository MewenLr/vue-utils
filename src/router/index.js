import Vue from 'vue'
// import App from '@/App.vue'
import Home from '@/components/home.vue'
import About from '@/components/about.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
