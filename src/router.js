import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import MapList from './views/MapList'
import ConcreteMap from './views/ConcreteMap'

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
      path: '/mapList',
      name: 'mapList',
      component: MapList
    },
    {
      path: '/concreteMap',
      name: 'concreteMap',
      component: ConcreteMap
    }
  ]
})
