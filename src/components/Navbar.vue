<template>
  <b-navbar toggleable="md" fixed="top" type="dark" variant="info">

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand href="#">UserStoryMapping</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item href="/mapList">我的Map</b-nav-item>
        <b-nav-item href="/inviteList/unprocessed">消息列表</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <!--<b-nav-form>-->
        <!--<b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>-->
        <!--<b-button size="sm" class="my-2 my-sm-0" type="submit">查找</b-button>-->
        <!--</b-nav-form>-->
        <b-nav-item v-if="isMap" v-b-modal.invite_people>邀请成员</b-nav-item>
        <b-nav-item v-if="isMap" v-b-modal.edit_log>编辑记录</b-nav-item>
        <b-nav-item-dropdown right>
          <!-- Using button-content slot -->
          <template slot="button-content">
            <em>{{username}}</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

</template>

<script>
import { setCookie, getCookie, delCookie } from '../assets/Cookie'

export default {
  name: 'Navbar',
  props: {
    isMap: {   // 可选字段，有默认值
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      username: ''
    }
  },
  methods: {
    logout () {
      //delete the cookie
      delCookie('username')
      delCookie('userId')
      this.$router.push('/')
    }
  },
  mounted () {
    /*页面挂载获取保存的cookie值，渲染到页面上*/
    let uname = getCookie('username')
    this.username = uname
    /*如果cookie不存在，则跳转到登录页*/
    if (uname == '') {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>

</style>
