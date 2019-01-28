<template>
  <div>
    <Navbar></Navbar>
    <map-item :map-name="name" :map-info="info"></map-item>
    <!--<b-row>-->
      <!--<b-col cols="4">-->
        <!--<map-item mapName={{mapItems.name}} map-info={{mapItems.info}}></map-item>-->
      <!--</b-col>-->
      <!--<b-col cols="4">-->
        <!--<map-item mapName={{mapItems.name}} map-info={{mapItems.info}}></map-item>-->
      <!--</b-col>-->
      <!--<b-col cols="4">-->
        <!--<map-item mapName={{mapItems.name}} map-info={{mapItems.info}}></map-item>-->
      <!--</b-col>-->
    <!--</b-row>-->
  </div>
</template>

<script>

// @ is an alias to /src
import Navbar from '../components/Navbar'
import MapItem from '../components/MapItem'

export default {
  name: 'MapList',
  components: { MapItem, Navbar },
  data () {
    return {
      name: 'Hello World',
      info: ' 一些简单的描述，巴拉巴拉巴拉巴拉'
    }
  }
}
</script>

<style scoped>

</style>
