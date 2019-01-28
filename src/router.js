import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import About from './views/About'
import MapList from './views/MapList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/mapList',
      name: 'mapList',
      component: MapList
    }
  ]
})
