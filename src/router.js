import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login'
import MapList from './views/MapList'
import ConcreteMap from './views/ConcreteMap'
import Register from './views/Register'
import InviteList from './views/InviteList'

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
    },
    {
      path: '/inviteList',
      name: 'inviteList',
      component: InviteList,
      children: [
        {
          path: 'processed',
          name: 'processed',
          component: () => import(/* webpackChunkName: "list" */ './views/InviteProcessedList.vue')
        },
        {
          path: 'unprocessed',
          name: 'unprocessed',
          component: () => import(/* webpackChunkName: "user" */ './views/InviteUnprocessedList.vue')
        }
      ]
    }
  ]
})
