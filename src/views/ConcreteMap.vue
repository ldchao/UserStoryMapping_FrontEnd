<template>
  <b-container fluid>
    <Navbar></Navbar>
    <div class="main-wrapper">
      <div class="map_list">
        <ul class="map_list_ul">
          <li v-for="activityItem in activityList" class="map_list_li concreteMap_list_li">
            <acticity-card :id="activityItem.id" :title="activityItem.title"
                           :story-point="activityItem.storyPoint"></acticity-card>
          </li>
          <li class="map_list_li concreteMap_list_li">
            <b-button href="#" variant="outline-info" class="css_add">添加activity
            </b-button>
            <div class="css_add" style="visibility: hidden"></div>
            <hr>
          </li>
        </ul>
      </div>
    </div>

  </b-container>
</template>

<script>
import Navbar from '../components/Navbar'
import ActicityCard from '../components/ActivityCard'

export default {
  name: 'ConcreteMap',
  components: { ActicityCard, Navbar },
  data () {
    return {
      activityList: [
        { id: 1, title: 'Hello World', storyPoint: 19 },
        { id: 2, title: 'Hello World', storyPoint: 19 },
        { id: 3, title: 'Hello World', storyPoint: 19 }
      ]
    }
  }
}
</script>

<style scoped>
  .concreteMap_list_li {
    border-left: 1px solid #D3D3D3;
    padding-left: 10px;
    padding-right: 10px;
  }

  @import "../assets/css/map.css";
</style>
