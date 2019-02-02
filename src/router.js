import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import MapList from './views/MapList'
import ConcreteMap from './views/ConcreteMap'
import Register from './views/Register'

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
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/mapList',
      name: 'mapList',
      component: MapList
    },
    {
      path: '/concreteMap/:id',
      name: 'concreteMap',
      component: ConcreteMap
    }
  ]
})
