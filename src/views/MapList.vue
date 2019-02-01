<template>
  <div>
    <Navbar></Navbar>
    <div class="main-wrapper">
      <b-row>
        <b-col cols="2"/>
        <b-col cols="8">
          <div style="text-align: center;margin-top: 20px">
            <h1 style="display: inline-block">我的Map列表</h1>
            <b-btn class="add_button" variant="outline-success" v-b-modal.add_map>添加</b-btn>
            <b-modal centered id="add_map" title="新建Map" style="text-align : left">
              <b-form>
                <b-form-group label="标题:"
                label-for="title">
                  <b-form-input type="text"
                  v-model="add_title"
                  required
                  placeholder="Enter title">
                  </b-form-input>
                </b-form-group>
                <b-form-group label="描述:"
                label-for="desc">
                  <b-form-textarea placeholder="Enter some description"
                  :rows="4"
                  v-model="add_des"
                  :max-rows="6">
                  </b-form-textarea>
                </b-form-group>
              </b-form>
            </b-modal>
          </div>
          <div v-for="mapItem in mapList">
            <map-item :map-item="mapItem"></map-item>
          </div>
        </b-col>
        <b-col cols="2"/>
      </b-row>
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
      }, {
        id: 2,
        mapTitle: 'lhlong',
        mapDesc: ' 一些简单的描述，巴拉巴拉巴拉巴拉'
      }, {
        id: 2,
        mapTitle: 'lhlong',
        mapDesc: ' 一些简单的描述，巴拉巴拉巴拉巴拉'
      }, {
        id: 2,
        mapTitle: 'lhlong',
        mapDesc: ' 一些简单的描述，巴拉巴拉巴拉巴拉'
      }, {
        id: 2,
        mapTitle: 'lhlong',
        mapDesc: ' 一些简单的描述，巴拉巴拉巴拉巴拉'
      }, {
        id: 2,
        mapTitle: 'lhlong',
        mapDesc: ' 一些简单的描述，巴拉巴拉巴拉巴拉'
      }, {
        id: 2,
        mapTitle: 'lhlong',
        mapDesc: ' 一些简单的描述，巴拉巴拉巴拉巴拉'
      }, {
        id: 2,
        mapTitle: 'lhlong',
        mapDesc: ' 一些简单的描述，巴拉巴拉巴拉巴拉'
      }, {
        id: 2,
        mapTitle: 'lhlong',
        mapDesc: ' 一些简单的描述，巴拉巴拉巴拉巴拉'
      }, {
        id: 2,
        mapTitle: 'lhlong',
        mapDesc: ' 一些简单的描述，巴拉巴拉巴拉巴拉'
      }],
      add_title: '',
      add_des: ''
    }
  },
  // mounted () {
  //   axios
  //     .get('')
  //     .then(response => (this.mapList = response))
  // }
}
</script>

<style scoped lang="scss">
  .add_button {
    float: right;
    display: inline-block;
    margin-top: 15px;
  }
  .main-wrapper {
    margin-top: 64px;
  }
</style>
