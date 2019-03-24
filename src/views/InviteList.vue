<template>
  <!--<div>-->
  <!--<router-view/>-->
  <!--<ul>-->
  <!--<li><router-link :to="{name:'unprocessed'}">未读消息</router-link></li>-->
  <!--<li><router-link :to="{name:'processed'}">已读消息</router-link></li>-->
  <!--</ul>-->
  <!--</div>-->
  <div>
    <Navbar></Navbar>
    <div class="main-wrapper">
      <div id="invite_list">
        <div id="invite_list_nav">
          <router-link :to="{name:'unprocessed'}">未读消息</router-link>
          |
          <router-link :to="{name:'processed'}">已读消息</router-link>
        </div>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'InviteList',
  components: { Navbar },
}
</script>

<style lang="scss">
  #invite_list {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-size: large;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #invite_list_nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .main-wrapper {
    margin-top: 64px;
  }
</style>
