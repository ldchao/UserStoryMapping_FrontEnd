<template>
  <div>
    <Navbar></Navbar>
    <div style="text-align: center;margin-top: 20px">
      <h1>我的Map列表</h1>
    </div>
    <b-row>
      <b-col cols="2"/>
      <b-col cols="8">
        <div v-for="mapItem in mapList">
          <map-item :map-item="mapItem"></map-item>
        </div>
      </b-col>
      <b-col cols="2"/>
    </b-row>

    <div>
      {{ info }}
    </div>
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
      mapList: [{
        id: 1,
        mapTitle: 'ldchao',
        mapDesc: ' 一些简单的描述，巴拉巴拉巴拉巴拉'
      }, {
        id: 2,
        mapTitle: 'lhlong',
        mapDesc: ' 一些简单的描述，巴拉巴拉巴拉巴拉'
      }],
      info: null
    }
  },
  // created () {
  //   console.log('hhhhhhhhhhhhhhhhhhhh')
  //
  //   //发送get请求
  //   this.$http.get('/d').then(function (res) {
  //     console.log(res.body)
  //   }, function () {
  //     console.log('请求失败处理')
  //   })}
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.info = response))
  }
}
</script>

<style scoped>

</style>
